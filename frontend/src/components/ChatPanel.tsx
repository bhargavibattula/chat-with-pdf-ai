import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Sparkles, Trash2 } from 'lucide-react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I've analyzed your document. Ask me anything about it, or I can help you summarize specific sections.",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const responses = [
        "Based on the document, this section discusses the importance of type-safety in modern web architecture.",
        "The document highlights four key takeaways: scalability, developer experience, performance, and security.",
        "That's an interesting question. On page 2, the author explains how server-side rendering reduces Time to Interactive (TTI) significanly.",
        "I'm sorry, I couldn't find a direct mention of that in the PDF, but I can infer it based on the general context of web performance."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold text-gray-700">AI Assistant</span>
        </div>
        <button 
          onClick={clearChat}
          className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all text-gray-400"
          title="Clear chat"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar bg-gray-50/30"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-start space-x-3">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
               <Sparkles className="w-4 h-4 text-blue-600" />
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1">
               <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
               <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
               <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 pt-2 shrink-0 bg-white">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        <p className="mt-3 text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest">
          AI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
