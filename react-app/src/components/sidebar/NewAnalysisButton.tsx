// components/sidebar/NewAnalysisButton.tsx
import React from 'react';

interface NewAnalysisButtonProps {
  onClick?: () => void;
}

export const NewAnalysisButton: React.FC<NewAnalysisButtonProps> = ({ onClick }) => {
  return (
    <button
      className="mx-5 my-5 px-4 py-3 bg-teal-700 text-white rounded-lg font-semibold hover:bg-teal-800 transition-colors flex items-center gap-2"
      onClick={onClick}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12h14"/>
      </svg>
      New Analysis
    </button>
  );
};