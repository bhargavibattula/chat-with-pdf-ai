import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Loader2, Info } from 'lucide-react';

interface Flashcard {
  question: string;
  answer: string;
}

interface FlashcardsPanelProps {
  sessionId: string;
}

const FlashcardsPanel: React.FC<FlashcardsPanelProps> = ({ sessionId }) => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/flashcards/${sessionId}`);
        if (response.ok) {
          const data = await response.json();
          setCards(data.flashcards);
        }
      } catch (err) {
        console.error("Failed to fetch flashcards", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, [sessionId]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 text-gray-500">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="font-bold text-lg animate-pulse">Crafting study cards...</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
          <Info size={32} />
        </div>
        <p className="text-gray-600 font-medium">Unable to generate flashcards. Try uploading another document.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50/50 p-6 overflow-hidden">
      <div className="mb-8 space-y-1">
        <h2 className="text-xl font-black text-gray-900 tracking-tight">AI Active Recall</h2>
        <p className="text-sm text-gray-500 font-medium">Master your document with interactive quiz cards.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center perspective-1000">
        <motion.div
           className="relative w-full aspect-[4/5] max-w-[320px] cursor-pointer preserve-3d"
           initial={false}
           animate={{ rotateY: isFlipped ? 180 : 0 }}
           transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
           onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-white rounded-3xl premium-shadow border-2 border-white backface-hidden flex flex-col p-8 items-center justify-center text-center">
             <div className="absolute top-6 left-6 text-[10px] font-black text-blue-600 uppercase tracking-widest">Question</div>
             <p className="text-lg font-bold text-gray-800 leading-relaxed">
               {cards[currentIndex].question}
             </p>
             <div className="absolute bottom-10 text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-bounce">Tap to reveal</div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-blue-600 rounded-3xl shadow-2xl backface-hidden flex flex-col p-8 items-center justify-center text-center rotate-y-180">
             <div className="absolute top-6 left-6 text-[10px] font-black text-blue-100 uppercase tracking-widest">Answer</div>
             <p className="text-lg font-bold text-white leading-relaxed">
               {cards[currentIndex].answer}
             </p>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="mt-12 flex items-center space-x-8">
           <button 
             onClick={handlePrev}
             className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 active:scale-95 transition-all text-gray-700"
           >
             <ChevronLeft size={24} />
           </button>
           
           <div className="text-center min-w-[80px]">
             <span className="text-sm font-black text-gray-900">{currentIndex + 1}</span>
             <span className="text-xs font-bold text-gray-400 mx-1">/</span>
             <span className="text-xs font-bold text-gray-400 uppercase">{cards.length}</span>
           </div>

           <button 
             onClick={handleNext}
             className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 active:scale-95 transition-all text-gray-700"
           >
             <ChevronRight size={24} />
           </button>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200/60 text-center">
        <button 
          onClick={() => { setCurrentIndex(0); setIsFlipped(false); }}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
        >
          <RotateCcw size={14} />
          <span>Reset Session</span>
        </button>
      </div>
    </div>
  );
};

export default FlashcardsPanel;
