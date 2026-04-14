import os
import uuid
import time
import json
import logging
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

app = Flask(__name__)
# Enable CORS for both HTTP and SocketIO
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def get_embeddings():
    return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def get_llm():
    return ChatGroq(
        groq_api_key=GROQ_API_KEY, 
        model_name="llama-3.3-70b-versatile"
    )

# Memory-based session storage
sessions = {}

# Socket.io Events
@socketio.on('join')
def on_join(data):
    username = data.get('username', 'Unknown')
    room = data.get('room')
    if room:
        join_room(room)
        logger.info(f"User {username} joined room {room}")
        emit('status', {'msg': f'{username} joined the session'}, room=room)

@socketio.on('leave')
def on_leave(data):
    username = data.get('username', 'Unknown')
    room = data.get('room')
    if room:
        leave_room(room)
        emit('status', {'msg': f'{username} left the session'}, room=room)

@socketio.on('send_message')
def handle_message(data):
    room = data.get('room')
    if room:
        emit('receive_message', data, room=room)

@socketio.on('typing')
def handle_typing(data):
    room = data.get('room')
    if room:
        emit('display_typing', data, room=room, include_self=False)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        try:
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)

            session_id = str(uuid.uuid4())[:8].upper()
            logger.info(f"Processing PDF for session {session_id}")

            loader = PyPDFLoader(filepath)
            documents = loader.load()
            
            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
            splits = text_splitter.split_documents(documents)
            
            vectorstore = Chroma.from_documents(
                documents=splits, 
                embedding=get_embeddings(),
                collection_name=f"col_{session_id}"
            )
            
            sessions[session_id] = {
                "vectorstore": vectorstore,
                "filename": filename,
                "created_at": time.time()
            }

            return jsonify({
                "message": "Success",
                "sessionId": session_id,
                "filename": filename
            }), 200

        except Exception as e:
            logger.error(f"Upload error: {e}")
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "Invalid format"}), 400

@app.route('/session/<session_id>', methods=['GET'])
def get_session(session_id):
    if session_id in sessions:
        return jsonify({
            "sessionId": session_id,
            "filename": sessions[session_id]["filename"]
        }), 200
    return jsonify({"error": "Session not found"}), 404

@app.route('/chat/<session_id>', methods=['POST'])
def chat(session_id):
    data = request.json
    user_message = data.get('message', '')
    
    if session_id not in sessions:
        logger.error(f"Chat failed: Session {session_id} not found")
        return jsonify({"answer": "Session expired. Please re-upload your PDF."}), 404

    try:
        llm = get_llm()
        vectorstore = sessions[session_id]["vectorstore"]
        
        # Get context
        search_results = vectorstore.as_retriever(search_kwargs={"k": 5}).invoke(user_message)
        context = "\n\n".join(doc.page_content for doc in search_results)
        
        logger.info(f"Context length for {session_id}: {len(context)} characters")

        prompt = f"""
        You are a helpful AI PDF Tutor. Use the provided PDF context to answer the user's question.
        If the user is saying hello or greeting you, respond politely.
        If the question is not related to the PDF context but is a general query, provide a brief helpful answer.
        
        PDF Context:
        {context if context else 'No specific context found.'}
        
        User Question: {user_message}
        
        Answer (do not mention 'Context' or 'PDF' unless relevant):
        """
        
        response = llm.invoke(prompt)
        answer = response.content.strip() if response.content else "I'm sorry, I couldn't generate a response."
        
        logger.info(f"AI Response for {session_id}: {answer[:50]}...")
        return jsonify({"answer": answer}), 200
    except Exception as e:
        logger.error(f"Chat logic error: {e}")
        return jsonify({"answer": f"System Error: {str(e)}"}), 200

@app.route('/summary/<session_id>', methods=['GET'])
def get_summary(session_id):
    if session_id not in sessions:
        return jsonify({"error": "Not found"}), 404
    try:
        llm = get_llm()
        vectorstore = sessions[session_id]["vectorstore"]
        docs = vectorstore.get()["documents"]
        context = "\n".join(docs[:8])
        prompt = f"Summarize this PDF content:\n\n{context}"
        response = llm.invoke(prompt)
        return jsonify({"summary": response.content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def clean_json_response(text):
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0].strip()
    elif "```" in text:
        content = text.split("```")
        if len(content) >= 2:
            text = content[1].strip()
    return text.strip()

@app.route('/flashcards/<session_id>', methods=['GET'])
def get_flashcards(session_id):
    if session_id not in sessions:
        return jsonify({"error": "Not found"}), 404
    try:
        llm = get_llm()
        vectorstore = sessions[session_id]["vectorstore"]
        docs = vectorstore.get()["documents"]
        context = "\n".join(docs[:10])
        prompt = f"Return only a JSON list of 5 {{'question', 'answer'}} objects from this. No extra text:\n\n{context}"
        response = llm.invoke(prompt)
        content = clean_json_response(response.content)
        return jsonify({"flashcards": json.loads(content)}), 200
    except Exception as e:
        logger.error(f"Flashcard error for {session_id}: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/mindmap/<session_id>', methods=['GET'])
def get_mindmap(session_id):
    if session_id not in sessions:
        return jsonify({"error": "Not found"}), 404
    try:
        llm = get_llm()
        vectorstore = sessions[session_id]["vectorstore"]
        docs = vectorstore.get()["documents"]
        context = "\n".join(docs[:10])
        prompt = f"Return only a JSON object for a mind map (root 'name', children list) from this:\n\n{context}"
        response = llm.invoke(prompt)
        content = clean_json_response(response.content)
        return jsonify({"mindmap": json.loads(content)}), 200
    except Exception as e:
        logger.error(f"Mindmap error for {session_id}: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/quiz/<session_id>', methods=['GET'])
def get_quiz(session_id):
    if session_id not in sessions:
        return jsonify({"error": "Not found"}), 404
    try:
        llm = get_llm()
        vectorstore = sessions[session_id]["vectorstore"]
        docs = vectorstore.get()["documents"]
        context = "\n".join(docs[:12])
        prompt = f"Return only a JSON quiz (mcqs list, short_questions list) from this text:\n\n{context}"
        response = llm.invoke(prompt)
        content = clean_json_response(response.content)
        return jsonify(json.loads(content)), 200
    except Exception as e:
        logger.error(f"Quiz error for {session_id}: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Use threading mode for better compatibility on Windows dev environments
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)
