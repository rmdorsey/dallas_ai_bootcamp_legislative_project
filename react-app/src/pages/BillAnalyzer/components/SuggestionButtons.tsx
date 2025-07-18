// pages/BillAnalyzer/components/SuggestionButtons.tsx
import React from 'react';
import type { SuggestionButton } from '../../../types';

interface SuggestionButtonsProps {
  suggestions: SuggestionButton[];
  onSuggestionClick: (suggestion: SuggestionButton) => void;
}

export const SuggestionButtons: React.FC<SuggestionButtonsProps> = ({
  suggestions,
  onSuggestionClick
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSuggestionClick(suggestion)}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md cursor-pointer text-xs font-medium transition-all duration-200 text-gray-500 hover:bg-teal-700 hover:text-white hover:border-teal-700"
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};