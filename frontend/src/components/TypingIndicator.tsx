import React from 'react';
import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  userName: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userName }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center space-x-2 px-4 py-2 text-gray-400 italic text-xs font-medium"
    >
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          />
        ))}
      </div>
      <span className="animate-pulse">{userName} is thinking...</span>
    </motion.div>
  );
};

export default TypingIndicator;
