import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, Sparkles } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  user: string;
  message: string;
  timestamp: number;
  type: 'user' | 'ai' | 'system';
  color?: string;
}

interface CollaborativeChatProps {
  sessionId: string;
}

const socket: Socket = io('http://localhost:5000');

const CollaborativeChat: React.FC<CollaborativeChatProps> = ({ sessionId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const [username] = useState(() => `User ${Math.floor(Math.random() * 900) + 100}`);
  const [userColor] = useState(() => `#${Math.floor(Math.random()*16777215).toString(16)}`);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.emit('join', { username, room: sessionId });

    socket.on('receive_message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    socket.on('display_typing', (data: { username: string, isTyping: boolean }) => {
      setTypingUser(data.username);
      setIsTyping(data.isTyping);
    });

    socket.on('status', (data: { msg: string }) => {
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        user: 'System',
        message: data.msg,
        timestamp: Date.now(),
        type: 'system'
      }]);
    });

    return () => {
      socket.emit('leave', { username, room: sessionId });
      socket.off('receive_message');
      socket.off('display_typing');
      socket.off('status');
    };
  }, [sessionId, username]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    socket.emit('typing', { room: sessionId, username, isTyping: e.target.value.length > 0 });
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      user: username,
      message: inputText,
      timestamp: Date.now(),
      type: 'user',
      color: userColor
    };

    socket.emit('send_message', { ...userMsg, room: sessionId });
    socket.emit('typing', { room: sessionId, username, isTyping: false });
    setInputText('');
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="bg-green-50/50 px-4 py-1.5 flex items-center justify-between border-b border-green-100">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Collaborative Mode</span>
        </div>
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
            User: <span className="ml-1 text-gray-700">{username}</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="p-4 bg-gray-50 rounded-full text-gray-400">
                    <Clock size={32} />
                </div>
                <p className="text-sm font-medium text-gray-500 italic">No messages yet. Start the conversation!</p>
            </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.user === username ? 'items-end' : 'items-start'}`}>
            {msg.type === 'system' ? (
              <div className="w-full flex justify-center my-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {msg.message}
                </span>
              </div>
            ) : (
              <div className={`flex flex-col max-w-[85%] ${msg.user === username ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 px-2 flex items-center">
                  {msg.user === 'AI Tutor' ? <Sparkles size={10} className="mr-1 text-blue-500" /> : null}
                  {msg.user === username ? 'You' : msg.user}
                </span>
                <div 
                  style={{ backgroundColor: msg.user === username ? '#3b82f6' : (msg.user === 'AI Tutor' ? '#f3f4f6' : msg.color) }}
                  className={`
                    px-4 py-3 rounded-2xl text-sm font-medium shadow-sm transition-all
                    ${msg.user === username ? 'bg-blue-600 text-white rounded-tr-none' : (msg.user === 'AI Tutor' ? 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200' : 'text-white rounded-tl-none')}
                  `}
                >
                  {msg.message}
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator userName={typingUser} />}
      </div>

      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <form onSubmit={handleSend} className="relative group">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Share thoughts with others..."
            className="w-full pl-6 pr-14 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-gray-700"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollaborativeChat;
