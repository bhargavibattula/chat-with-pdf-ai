import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FileUpload from './components/FileUpload';
import LoadingScreen from './components/LoadingScreen';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import AIWorkspace from './components/AIWorkspace';

export type AppState = 'landing' | 'processing' | 'main';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('landing');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleUpload = (file: File) => {
    setFileName(file.name);
    setState('processing');
    
    // Simulate processing delay
    setTimeout(() => {
      setState('main');
    }, 3000);
  };

  const handleBack = () => {
    setState('landing');
    setFileName(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <AnimatePresence mode="wait">
        {state === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-6"
          >
            <div className="max-w-2xl w-full text-center space-y-8">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                >
                  Chat with your PDF
                </motion.h1>
                <p className="text-xl text-gray-600 max-w-lg mx-auto">
                  Upload your document and get instant answers, summaries, and insights using production-grade AI.
                </p>
              </div>
              
              <FileUpload onUpload={handleUpload} />
              
              <div className="flex items-center justify-center space-x-8 pt-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-green-500"></span>
                  <span className="text-sm font-medium">Fast Processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                  <span className="text-sm font-medium">Privacy Focused</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {state === 'processing' && (
          <LoadingScreen key="loading" />
        )}

        {state === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-screen overflow-hidden"
          >
            <Sidebar onNewChat={handleBack} />
            
            <main className="flex-1 flex overflow-hidden">
              {/* Split Screen Layout */}
              <div className="flex-1 overflow-hidden border-r border-gray-200 bg-white">
                <PDFViewer fileName={fileName || 'Document.pdf'} onBack={handleBack} />
              </div>
              
              <div className="w-[450px] lg:w-[500px] flex flex-col bg-gray-50 overflow-hidden">
                <AIWorkspace />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
