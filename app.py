import os
import tempfile
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

session_data = {
    "vectorstore": None,
    "current_file": None
}

def get_embeddings():
    # Free, high-quality embeddings that run locally on CPU
    return HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

def get_llm():
    # Using a modern, supported Groq model
    return ChatGroq(
        groq_api_key=GROQ_API_KEY, 
        model_name="llama-3.3-70b-versatile"
    )

@app.route('/upload', methods=['POST'])
def upload_pdf():
    global session_data
    
    if not GROQ_API_KEY:
        return jsonify({"error": "GROQ_API_KEY not found in .env"}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            file.save(temp_pdf.name)
            temp_path = temp_pdf.name

        try:
            loader = PyPDFLoader(temp_path)
            docs = loader.load()

            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
            splits = text_splitter.split_documents(docs)

            embeddings = get_embeddings()
            vectorstore = Chroma.from_documents(
                documents=splits, 
                embedding=embeddings,
                persist_directory=None # In-memory
            )

            session_data["vectorstore"] = vectorstore
            session_data["current_file"] = file.filename

            os.remove(temp_path)

            return jsonify({
                "message": "File processed successfully with Groq",
                "filename": file.filename,
                "chunks": len(splits)
            }), 200

        except Exception as e:
            if os.path.exists(temp_path):
                os.remove(temp_path)
            return jsonify({"error": str(e)}), 500
    
    return jsonify({"error": "Invalid file type"}), 400

from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

@app.route('/chat', methods=['POST'])
def chat():
    global session_data
    
    if not session_data["vectorstore"]:
        return jsonify({"error": "Please upload a PDF first"}), 400

    data = request.json
    user_question = data.get("question")
    
    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    try:
        llm = get_llm()
        retriever = session_data["vectorstore"].as_retriever(search_kwargs={"k": 5})

        system_prompt = (
            "You are a professional assistant. Use the provided context "
            "from the PDF to answer the user's question. "
            "If the answer isn't available in the context, clearly state that. "
            "Be concise and accurate.\n\n"
            "{context}"
        )

        prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt),
            ("human", "{input}"),
        ])

        # Modern LCEL RAG Chain
        rag_chain = (
            {"context": retriever | format_docs, "input": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )

        response = rag_chain.invoke(user_question)

        return jsonify({
            "answer": response,
            "sources": "Retrieved from document"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/summary', methods=['GET'])
def get_summary():
    global session_data
    if not session_data["vectorstore"]:
        return jsonify({"error": "No document loaded"}), 400

    try:
        llm = get_llm()
        docs = session_data["vectorstore"].get()["documents"][:8]
        context = "\n".join(docs)
        prompt = f"Provide a concise summary of the following document content, highlighting the main purpose and key findings:\n\n{context}"
        response = llm.invoke(prompt)
        return jsonify({"summary": response.content}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/flashcards', methods=['GET'])
def get_flashcards():
    global session_data
    if not session_data["vectorstore"]:
        return jsonify({"error": "No document loaded"}), 400

    try:
        llm = get_llm()
        docs = session_data["vectorstore"].get()["documents"][:10]
        context = "\n".join(docs)
        
        prompt = (
            "Based on the following document content, generate 6 high-quality flashcards "
            "for studying. Return ONLY a JSON list of objects with 'question' and 'answer' keys.\n\n"
            f"Content: {context}"
        )
        
        response = llm.invoke(prompt)
        # Extract JSON if LLM adds markdown wrappers
        content = response.content.replace('```json', '').replace('```', '').strip()
        import json
        cards = json.loads(content)
        return jsonify({"flashcards": cards}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/mindmap', methods=['GET'])
def get_mindmap():
    global session_data
    if not session_data["vectorstore"]:
        return jsonify({"error": "No document loaded"}), 400

    try:
        llm = get_llm()
        docs = session_data["vectorstore"].get()["documents"][:10]
        context = "\n".join(docs)
        
        prompt = (
            "Create a structured mind map of the key concepts in this document. "
            "Return ONLY a JSON object where the root is 'name' and children are a list of objects "
            "with 'name' and optional 'children'. Go 3 levels deep if possible.\n\n"
            f"Content: {context}"
        )
        
        response = llm.invoke(prompt)
        content = response.content.replace('```json', '').replace('```', '').strip()
        import json
        mindmap_data = json.loads(content)
        return jsonify({"mindmap": mindmap_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
