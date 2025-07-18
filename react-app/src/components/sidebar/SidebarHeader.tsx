// components/sidebar/SidebarHeader.tsx
import React from 'react';

export const SidebarHeader: React.FC = () => {
  return (
    <div className="p-5 border-b border-gray-200">
      <div className="text-2xl font-bold text-gray-800 mb-1">
        legisl<span className="text-teal-700">AI</span>tive
      </div>
      <div className="text-sm text-gray-500 font-medium">
        Legislation Made Legible
      </div>
    </div>
  );
};