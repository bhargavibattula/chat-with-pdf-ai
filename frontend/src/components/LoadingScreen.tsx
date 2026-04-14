import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';

const steps = [
  { id: 1, text: 'Uploading document...' },
  { id: 2, text: 'Extracting text and metadata...' },
  { id: 3, text: 'Generating AI embeddings...' },
  { id: 4, text: 'Preparing your workspace...' },
];

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="p-3 bg-blue-50 rounded-full"
          >
            <Loader2 className="w-10 h-10 text-blue-600" />
          </motion.div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Processing your document</h2>
            <p className="text-gray-500">This will only take a moment</p>
          </div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.3,
                x: 0,
                color: index === currentStep ? '#2563eb' : '#6b7280'
              }}
              className="flex items-center space-x-3 text-sm font-medium"
            >
              <div className="relative flex items-center justify-center">
                {index < currentStep ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <div className={`w-5 h-5 rounded-full border-2 ${index === currentStep ? 'border-blue-600 border-t-transparent animate-spin' : 'border-gray-200'}`} />
                )}
              </div>
              <span>{step.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            className="h-full bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
