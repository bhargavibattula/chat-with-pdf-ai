import React from 'react';
import { 
  Plus, 
  MessageSquare, 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  LogOut,
  ChevronLeft
} from 'lucide-react';

interface SidebarProps {
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewChat }) => {
  const previousChats = [
    "Q4 Financial Report.pdf",
    "Product Specs v2.pdf",
    "User Interview Results.pdf"
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 flex flex-col h-full border-r border-gray-800">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <div className="w-5 h-5 flex items-center justify-center font-bold text-white text-xs">AI</div>
          </div>
          <span className="font-bold text-white tracking-tight">ChatPDF</span>
        </div>
        <button className="p-1 hover:bg-gray-800 rounded transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:text-white" />
        </button>
      </div>

      <div className="px-3 pb-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-xl transition-all premium-shadow"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New Chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-6">
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3 mb-2">Tools</h3>
          <nav className="space-y-1">
            <SidebarItem icon={<LayoutDashboard size={18} />} text="Dashboard" />
            <SidebarItem icon={<FileText size={18} />} text="Summarizer" active />
            <SidebarItem icon={<MessageSquare size={18} />} text="AI Chat" />
          </nav>
        </div>

        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Recent</h3>
            <History size={14} className="text-gray-500" />
          </div>
          <nav className="space-y-1">
            {previousChats.map((chat, i) => (
              <button 
                key={i}
                className="w-full flex items-center space-x-3 text-sm px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-left"
              >
                <FileText size={14} className="text-gray-600 shrink-0" />
                <span className="truncate">{chat}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-800 space-y-1">
        <SidebarItem icon={<Settings size={18} />} text="Settings" />
        <SidebarItem icon={<LogOut size={18} />} text="Log out" />
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, text, active = false }: { icon: React.ReactNode, text: string, active?: boolean }) => (
  <button className={`
    w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium
    ${active 
      ? 'bg-blue-600/10 text-blue-400' 
      : 'hover:bg-gray-800 text-gray-400 hover:text-white'}
  `}>
    <span className={active ? 'text-blue-500' : ''}>{icon}</span>
    <span>{text}</span>
  </button>
);

export default Sidebar;
