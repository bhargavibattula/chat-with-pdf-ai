import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LoadingScreen from './components/LoadingScreen';
import Sidebar from './components/Sidebar';
import PDFViewer from './components/PDFViewer';
import AIWorkspace from './components/AIWorkspace';
import QuizModal from './components/QuizModal';
import SessionHeader from './components/SessionHeader';

export type AppState = 'landing' | 'processing' | 'main';

const Dashboard: React.FC = () => {
  const { sessionId: urlSessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<AppState>(urlSessionId ? 'processing' : 'landing');
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>(urlSessionId || '');

  // Load session if sessionId exists in URL
  useEffect(() => {
    if (urlSessionId && !fileName) {
      const loadSession = async () => {
        try {
          const response = await fetch(`http://localhost:5000/session/${urlSessionId}`);
          if (response.ok) {
            const data = await response.json();
            setFileName(data.filename);
            setSessionId(data.sessionId);
            setState('main');
          } else {
            alert("Session not found");
            navigate('/');
          }
        } catch (err) {
          console.error(err);
          setState('landing');
        }
      };
      loadSession();
    }
  }, [urlSessionId, fileName, navigate]);

  const handleUpload = async (file: File) => {
    setFileName(file.name);
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
        const data = await response.json();
        setSessionId(data.sessionId);
        navigate(`/session/${data.sessionId}`);
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
    setSessionId('');
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    navigate('/');
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
            className="flex flex-col h-screen overflow-hidden"
          >
            <SessionHeader 
              fileName={fileName || 'Document.pdf'} 
              sessionId={sessionId} 
              onBack={handleBack}
              onlineCount={3}
            />

            <div className="flex-1 flex overflow-hidden">
              <Sidebar onNewChat={handleBack} onLaunchQuiz={() => setIsQuizOpen(true)} />
              
              <main className="flex-1 flex overflow-hidden">
                <div className="flex-1 overflow-hidden border-r border-gray-200 bg-white">
                  <PDFViewer 
                    fileName={fileName || 'Document.pdf'} 
                    pdfUrl={pdfUrl} 
                    onBack={handleBack} 
                  />
                </div>
                
                <div className="w-[450px] lg:w-[500px] flex flex-col bg-gray-50 overflow-hidden">
                  <AIWorkspace sessionId={sessionId} />
                </div>
              </main>
            </div>
            
            <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} sessionId={sessionId} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/session/:sessionId" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
