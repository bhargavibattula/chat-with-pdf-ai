import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';
import type { Message } from './ChatPanel';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start space-x-3 ${!isAssistant ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
        ${isAssistant ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'}
      `}>
        {isAssistant ? <Sparkles size={16} /> : <User size={16} />}
      </div>
      
      <div className={`
        max-w-[85%] px-4 py-3 rounded-2xl shadow-sm relative group transition-all
        ${isAssistant 
          ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' 
          : 'bg-blue-600 text-white rounded-tr-none'}
      `}>
        <p className="text-sm font-medium leading-relaxed">
          {message.content}
        </p>
        <span className={`
          absolute -bottom-5 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity
          ${isAssistant ? 'left-0 text-gray-400' : 'right-0 text-gray-400'}
        `}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
