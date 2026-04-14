import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  sessionId: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ sessionId }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/session/${sessionId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleCopy}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-full font-bold text-sm transition-all
          ${copied 
            ? 'bg-green-100 text-green-700 ring-1 ring-green-600/20' 
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95'}
        `}
      >
        {copied ? (
          <>
            <Check size={16} />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 size={16} />
            <span>Share Session</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-3 py-1 rounded-md font-bold uppercase tracking-widest whitespace-nowrap z-50 pointer-events-none shadow-xl"
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
