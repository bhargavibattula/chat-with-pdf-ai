# 🚀 PDF-AI Study Hub: The Ultimate Collaborative Learning Suite

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain.com/)

**Why settle for generic AI when you can have a collaborative study war-room?** 

PDF-AI is a high-performance, real-time application designed to transform static documents into interactive, shared learning experiences. Built for students, researchers, and professional teams who need to conquer complex material together.

---

## 📸 Preview

<div align="center">
  <img src="assets/WhatsApp%20Image%202026-04-14%20at%206.17.06%20PM.jpeg" width="100%" alt="Main Dashboard Preview">
  <br>
  <em>Experience the ultimate collaborative learning suite with real-time sync and AI-powered insights.</em>
</div>

<br>

| | |
|---|---|
| <img src="assets/WhatsApp%20Image%202026-04-14%20at%206.17.56%20PM.jpeg" width="100%"> | <img src="assets/WhatsApp%20Image%202026-04-14%20at%206.20.38%20PM.jpeg" width="100%"> |
| <img src="assets/WhatsApp%20Image%202026-04-14%20at%206.14.57%20PM.jpeg" width="100%"> | <img src="assets/WhatsApp%20Image%202026-04-14%20at%206.14.41%20PM.jpeg" width="100%"> |

---

## ⚡ Why this is Unique (The Secret Sauce)
Most AI platforms are **lonely**. You talk to a bot, get an answer, and leave. **PDF-AI Study Hub** turns studying into a **multi-player sport**. 

- **🔗 Permanent Shared URLs**: Every session has a unique hash. If you refresh, the session stays. If you share it, your friends see exactly what you see.
- **🛡️ Secure Privacy Layer**: We built a "Dual-Chat" engine. You have a public group chat for brainstorming and a **Private AI Tutor bubble** for when you don't want to ask "stupid questions" in front of the group.
- **⚡ Zero-Friction Entry**: No e-mails, no data tracking, no subscriptions. Just you and your knowledge.

---

## 🛰️ Detailed Feature List

### 1. 👥 Multi-User Collaborative War-Room
- **Real-Time Sync**: Powered by WebSockets (Socket.io), messages appear as you type.
- **Role Isolation**: Every user gets a unique color-coded identity and avatar automatically.
- **Joint Navigation**: Discuss specific PDF sections together in a shared virtual space.

### 2. 🧙 Private AI Tutor (The floating brain)
- **Context-Aware Assistance**: It doesn't just "talk"—it *understands* your document using a Vector-Based RAG engine.
- **Privacy First**: Your private queries remain private. Assistants handle greetings, technical deep-dives, and general study tips instantly.

### 3. 📝 The "Study-to-Success" AI Toolset
- **🥇 Automated Quiz Engine**:
  - Generates MCQ and Short Questions on the fly.
  - Helps you self-assess without having to draft questions yourself.
- **🧩 3D Flashcards**:
  - Uses the "Active Recall" study principle.
  - AI identifies the most important terms and turns them into interactive flip-cards.
- **🗺️ Hierarchical Mind Maps**:
  - Visualizes the entire PDF as a tree structure.
  - Helps you understand how concepts connect, perfect for visual learners.
- **📜 Instant Summary**:
  - Distills hours of reading into minutes of comprehension.
  - Automatically identifies key takeaways and core themes.

### ⚙️ Deep-Tech Infrastructure
- **Model**: Groq-powered **Llama 3.3 70B** — faster than GPT-4o.
- **Memory**: Persistent in-memory session mapping for high-speed retrieval.
- **Retrieval**: ChromaDB vector store isolates session data to prevent cross-contamination.

---

## 🚀 One-Click Setup (Quick-Start)

### Prerequisites
- Python 3.9+
- Node.js 18+
- [Groq API Key](https://console.groq.com/)

### 1. Backend Setup
```bash
# Clone the repo
git clone https://github.com/bhargavibattula/chat-with-pdf-ai.git
cd chat-with-pdf-ai

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install flask flask-cors flask-socketio langchain langchain-community langchain-groq langchain-huggingface langchain-chroma pypdf python-dotenv

# Setup Environment Variables
# Create a .env file and add:
# GROQ_API_KEY=your_key_here

# Start the server
python app.py
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🤝 Collaborative Mode
1. Upload your PDF.
2. Click the **"Share Session"** or copy the URL `.../session/XXXXXXXX`.
3. Send the link to your teammates.
4. Chat, quiz, and map together!

---

## ❤️ Credits
**Made with ❤️ by [Bhargavi Battula](https://github.com/bhargavibattula)**

*Transforming information into intelligence.*

---

## 📂 Project Screenshots

Below are all the screenshots showcasing the features and interface of the PDF-AI Study Hub.

| | | |
|---|---|---|
| ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.14.13%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.14.41%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.14.57%20PM.jpeg) |
| ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.15.17%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.15.41%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.17.06%20PM.jpeg) |
| ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.17.56%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.18.20%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.18.40%20PM.jpeg) |
| ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.20.38%20PM.jpeg) | ![Screenshot](assets/WhatsApp%20Image%202026-04-14%20at%206.22.48%20PM.jpeg) | |
