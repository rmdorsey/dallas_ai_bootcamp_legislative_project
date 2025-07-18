// components/common/LoadingScreen.tsx
import React from 'react';

export const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-800 mb-2">
        legisl<span className="text-teal-700">AI</span>tive
      </div>
      <div className="text-sm text-gray-500">Loading...</div>
    </div>
  </div>
);