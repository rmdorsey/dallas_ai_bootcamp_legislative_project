// components/chat/ChatHeader.tsx
import React from 'react';

interface ChatHeaderProps {
  title: string;
  subtitle?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="p-5 border-b border-gray-200 bg-white">
      <div className="text-lg font-semibold text-gray-800 mb-1">
        {title}
      </div>
      {subtitle && (
        <div className="text-sm text-gray-500">
          {subtitle}
        </div>
      )}
    </div>
  );
};