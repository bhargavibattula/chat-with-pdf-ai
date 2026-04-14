import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Bot, User, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface PrivateAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

const PrivateAIChat: React.FC<PrivateAIChatProps> = ({ isOpen, onClose, sessionId }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm your private AI study tutor. Ask me anything about this PDF, and I'll answer only for you." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/chat/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      
      const aiResponse = data.answer || "I'm having trouble connecting to the AI. Please try again.";
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = { id: Date.now().toString(), role: 'assistant', content: "Failed to connect to the tutor. Check if your backend is running." };
      setMessages(prev => [...prev, errorMsg]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.95 }}
          className="fixed bottom-32 right-6 w-[380px] h-[550px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 ring-1 ring-black/5"
        >
          {/* Header */}
          <div className="p-5 bg-blue-600 text-white flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight">Private AI Tutor</h3>
                <div className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-blue-100 uppercase tracking-widest">Personal Session</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Minimize2 size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-gray-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                   <div className={`mb-1 flex items-center space-x-1 px-1`}>
                      {msg.role === 'assistant' ? <Bot size={12} className="text-blue-500" /> : <User size={12} className="text-gray-400" />}
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{msg.role === 'assistant' ? 'AI Tutor' : 'You'}</span>
                   </div>
                   <div className={`
                      px-4 py-3 rounded-2xl text-sm font-medium
                      ${msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'}
                   `}>
                      {msg.content}
                   </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs font-bold animate-pulse px-2">
                <Loader2 size={14} className="animate-spin" />
                <span>AI is analyzing PDF...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything privately..."
                className="w-full pl-5 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all font-bold"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivateAIChat;
