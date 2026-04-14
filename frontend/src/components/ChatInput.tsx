import React, { useState, type KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      <div className={`
        flex items-end space-x-2 bg-gray-50 border ring-offset-2 transition-all p-2 rounded-2xl
        ${disabled ? 'opacity-50 grayscale' : 'hover:border-blue-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100'}
      `}>
         <button 
           className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors rounded-xl hover:bg-white"
           title="Attach file"
         >
           <Paperclip size={18} />
         </button>
         
         <textarea
           rows={1}
           value={input}
           onChange={(e) => setInput(e.target.value)}
           onKeyDown={handleKeyDown}
           placeholder="Ask anything about the document..."
           className="flex-1 max-h-32 bg-transparent text-sm font-medium py-2.5 px-1 outline-none resize-none placeholder:text-gray-400 overflow-y-auto"
           disabled={disabled}
         />

         <button
           onClick={handleSend}
           disabled={!input.trim() || disabled}
           className={`
             p-2.5 rounded-xl transition-all flex items-center justify-center
             ${!input.trim() || disabled 
               ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
               : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95'}
           `}
         >
           <Send size={18} className={input.trim() && !disabled ? 'translate-x-0.5 -translate-y-0.5 rotate-[-15deg]' : ''} />
         </button>
      </div>
      
      {/* Shortcut Badge */}
      <div className="absolute right-16 bottom-4 pointer-events-none hidden sm:block">
        {!input.trim() && !disabled && (
          <div className="flex items-center space-x-1.5 opacity-50 px-2">
            <kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-[10px] font-bold text-gray-500">Enter</kbd>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
