import React from 'react';
import { FileText, Users, ChevronLeft } from 'lucide-react';
import UserBadge from './UserBadge';
import ShareButton from './ShareButton';

interface SessionHeaderProps {
  fileName: string;
  sessionId: string;
  onBack: () => void;
  onlineCount: number;
}

const SessionHeader: React.FC<SessionHeaderProps> = ({ fileName, sessionId, onBack, onlineCount }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-50 premium-shadow">
      <div className="flex items-center space-x-4 overflow-hidden">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
            <FileText size={20} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-black text-gray-900 truncate text-sm tracking-tight leading-none mb-1">
              {fileName}
            </span>
            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <Users size={12} className="text-blue-500" />
               <span>{onlineCount} Users Studying</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* Avatars Overlapping */}
        <div className="hidden sm:flex items-center -space-x-3 px-4 border-r border-gray-100 mr-2">
           <UserBadge name="Me" color="#3b82f6" />
           <UserBadge name="Sarah" color="#ec4899" />
           <UserBadge name="Alex" color="#10b981" />
           <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 z-10">
             +1
           </div>
        </div>
        
        <ShareButton sessionId={sessionId} />
      </div>
    </header>
  );
};

export default SessionHeader;
