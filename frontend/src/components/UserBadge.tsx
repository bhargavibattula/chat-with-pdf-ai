import React from 'react';

interface UserBadgeProps {
  name: string;
  color: string;
  isOnline?: boolean;
}

const UserBadge: React.FC<UserBadgeProps> = ({ name, color, isOnline = true }) => {
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div className="relative group cursor-default">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black text-white border-2 border-white shadow-sm transition-transform group-hover:scale-110`}
        style={{ backgroundColor: color }}
        title={name}
      >
        {initials || 'U'}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
      )}
      
      {/* Tooltip */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none font-bold uppercase tracking-widest">
        {name}
      </div>
    </div>
  );
};

export default UserBadge;
