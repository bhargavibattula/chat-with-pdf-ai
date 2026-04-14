import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import AIWorkspace from './components/AIWorkspace';
import QuizModal from './components/QuizModal';

export type AppState = 'landing' | 'processing' | 'main';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('landing');
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleUpload = async (file: File) => {
    setFileName(file.name);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPdfUrl(url);

    setState('processing');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setState('main');
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
        setState('landing');
      }
    } catch (err) {
      console.error(err);
      alert("Could not connect to the backend server.");
      setState('landing');
    }
  };

  const handleBack = () => {
    setState('landing');
    setFileName(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
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
            <Sidebar onNewChat={handleBack} onLaunchQuiz={() => setIsQuizOpen(true)} />
            
            <main className="flex-1 flex overflow-hidden">
              {/* Split Screen Layout */}
              <div className="flex-1 overflow-hidden border-r border-gray-200 bg-white">
                <PDFViewer 
                  fileName={fileName || 'Document.pdf'} 
                  pdfUrl={pdfUrl} 
                  onBack={handleBack} 
                />
              </div>
              
              <div className="w-[450px] lg:w-[500px] flex flex-col bg-gray-50 overflow-hidden">
                <AIWorkspace />
              </div>
            </main>
            
            <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
