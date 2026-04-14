import React, { useState } from 'react';
import { FileText, MessageSquare, Sparkles } from 'lucide-react';
import SummaryPanel from './SummaryPanel';
import ChatPanel from './ChatPanel';

type Tab = 'summary' | 'chat';

const AIWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex flex-col h-full">
        {/* Tabs */}
        <div className="flex items-center space-x-1 p-2 bg-gray-50 border-b border-gray-200 shrink-0">
          <button
            onClick={() => setActiveTab('summary')}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all
              ${activeTab === 'summary' 
                ? 'bg-white shadow-sm text-blue-600 ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
            `}
          >
            <FileText size={16} />
            <span>Summary</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`
              flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all
              ${activeTab === 'chat' 
                ? 'bg-white shadow-sm text-blue-600 ring-1 ring-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
            `}
          >
            <MessageSquare size={16} />
            <span>AI Chat</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <div className={`h-full transition-all duration-300 ${activeTab === 'summary' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <SummaryPanel />
          </div>
          <div className={`absolute inset-0 h-full transition-all duration-300 ${activeTab === 'chat' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <ChatPanel />
          </div>
        </div>

        {/* AI Action Button (Floating) */}
        <div className="absolute right-6 bottom-32 pointer-events-none">
          <button className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all group">
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIWorkspace;
