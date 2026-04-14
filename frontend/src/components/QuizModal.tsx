import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Loader2, Trophy, HelpCircle } from 'lucide-react';

interface MCQ {
  question: string;
  options: string[];
  answer: string;
}

interface ShortQuestion {
  question: string;
  answer: string;
}

interface QuizData {
  mcqs: MCQ[];
  short_questions: ShortQuestion[];
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, sessionId }) => {
  const [data, setData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<'mcq' | 'result'>('mcq');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const fetchQuiz = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/quiz/${sessionId}`);
          if (response.ok) {
            const quizData = await response.json();
            setData(quizData);
          }
        } catch (err) {
          console.error("Quiz fetch failed", err);
        } finally {
          setLoading(false);
        }
      };
      fetchQuiz();
    }
  }, [isOpen, sessionId]);

  const handleOptionSelect = (index: number, option: string) => {
    setAnswers(prev => ({ ...prev, [index]: option }));
  };

  const calculateResults = () => {
    if (!data) return;
    let newScore = 0;
    data.mcqs.forEach((q, i) => {
      if (answers[i] === q.answer) newScore++;
    });
    setScore(newScore);
    setCurrentStep('result');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-blue-600 text-white">
            <div className="flex items-center space-x-2">
              <HelpCircle size={24} />
              <h2 className="text-xl font-black uppercase tracking-tight">AI Knowledge Challenge</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin text-blue-600" size={48} />
                <p className="font-bold text-gray-500">Scanning document for questions...</p>
              </div>
            ) : currentStep === 'mcq' ? (
              <div className="space-y-12">
                {data?.mcqs.map((q, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0">{i + 1}</span>
                      <p className="text-lg font-bold text-gray-800 pt-0.5">{q.question}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                      {q.options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => handleOptionSelect(i, opt)}
                          className={`
                            p-4 rounded-2xl text-left text-sm font-semibold transition-all border-2
                            ${answers[i] === opt 
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm' 
                              : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'}
                          `}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="space-y-8 pt-8 border-t border-gray-100">
                   <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">Review Your Knowledge</h3>
                   {data?.short_questions.map((sq, i) => (
                     <div key={i} className="bg-gray-50 p-6 rounded-2xl space-y-3">
                        <p className="font-bold text-gray-800">{sq.question}</p>
                        <details className="group">
                          <summary className="text-xs font-black text-blue-600 cursor-pointer uppercase tracking-widest list-none">View AI Answer</summary>
                          <p className="mt-3 text-sm text-gray-600 border-l-2 border-blue-200 pl-4 py-1 leading-relaxed">{sq.answer}</p>
                        </details>
                     </div>
                   ))}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                 <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">
                    <Trophy size={48} />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-3xl font-black text-gray-900">Quiz Complete!</h3>
                    <p className="text-gray-500 font-medium text-lg">You scored <span className="text-blue-600 font-black">{score}</span> out of <span className="font-bold">{data?.mcqs.length}</span></p>
                 </div>
                 <button 
                   onClick={() => { setCurrentStep('mcq'); setAnswers({}); }}
                   className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all"
                 >
                   Try Again
                 </button>
              </div>
            )}
          </div>

          {currentStep === 'mcq' && !loading && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
               <button 
                 onClick={calculateResults}
                 disabled={Object.keys(answers).length < (data?.mcqs.length || 0)}
                 className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
               >
                 Submit Quiz
               </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizModal;
