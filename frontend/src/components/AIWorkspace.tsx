import React, { useState } from 'react';
import { FileText, MessageSquare, Brain, Layers, Sparkles } from 'lucide-react';
import SummaryPanel from './SummaryPanel';
import CollaborativeChat from './CollaborativeChat';
import FlashcardsPanel from './FlashcardsPanel';
import MindMapPanel from './MindMapPanel';
import PrivateAIChat from './PrivateAIChat';

type Tab = 'summary' | 'chat' | 'flashcards' | 'mindmap';

interface AIWorkspaceProps {
  sessionId: string;
}

const AIWorkspace: React.FC<AIWorkspaceProps> = ({ sessionId }) => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');
  const [isPrivateChatOpen, setIsPrivateChatOpen] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50 border-b border-gray-200 shrink-0">
          <TabButton 
            active={activeTab === 'summary'} 
            onClick={() => setActiveTab('summary')}
            icon={<FileText size={16} />}
            label="Summary"
          />
          <TabButton 
            active={activeTab === 'chat'} 
            onClick={() => setActiveTab('chat')}
            icon={<MessageSquare size={16} />}
            label="Live Chat"
          />
          <TabButton 
            active={activeTab === 'flashcards'} 
            onClick={() => setActiveTab('flashcards')}
            icon={<Layers size={16} />}
            label="Quiz"
          />
          <TabButton 
            active={activeTab === 'mindmap'} 
            onClick={() => setActiveTab('mindmap')}
            icon={<Brain size={16} />}
            label="Map"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <TabContent active={activeTab === 'summary'}>
            <SummaryPanel sessionId={sessionId} />
          </TabContent>
          <TabContent active={activeTab === 'chat'}>
            <CollaborativeChat sessionId={sessionId} />
          </TabContent>
          <TabContent active={activeTab === 'flashcards'}>
            <FlashcardsPanel sessionId={sessionId} />
          </TabContent>
          <TabContent active={activeTab === 'mindmap'}>
            <MindMapPanel sessionId={sessionId} />
          </TabContent>
        </div>

        {/* AI Action Button (Floating) - Opens Private AI Chat */}
        <div className="absolute right-6 bottom-32 pointer-events-none z-20">
          <button 
            onClick={() => setIsPrivateChatOpen(true)}
            className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all group flex items-center space-x-2"
          >
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-xs font-bold uppercase tracking-widest pl-0 group-hover:pl-2">Private AI</span>
          </button>
        </div>

        <PrivateAIChat 
          isOpen={isPrivateChatOpen} 
          onClose={() => setIsPrivateChatOpen(false)} 
          sessionId={sessionId} 
        />
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center space-y-1 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all
      ${active 
        ? 'bg-white shadow-sm text-blue-600 ring-1 ring-black/5' 
        : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const TabContent: React.FC<{ active: boolean, children: React.ReactNode }> = ({ active, children }) => (
  <div className={`absolute inset-0 h-full transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
    {children}
  </div>
);

export default AIWorkspace;
