import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
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
          <LandingPage onUpload={handleUpload} />
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
