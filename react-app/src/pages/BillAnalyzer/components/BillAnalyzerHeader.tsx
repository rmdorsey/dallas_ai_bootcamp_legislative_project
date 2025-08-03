// pages/BillAnalyzer/components/BillAnalyzerHeader.tsx
import React from 'react';
import type { BillAnalyzerHeaderProps } from '../../../types';

export const BillAnalyzerHeader: React.FC<BillAnalyzerHeaderProps> = ({
  bill,
  onBack,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md cursor-pointer transition-all duration-200 flex items-center gap-2 text-gray-500 text-sm font-medium hover:bg-gray-100 hover:text-gray-800"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Search
        </button>
        <div className="text-xl font-bold text-gray-800">
          legisl<span className="text-teal-700">AI</span>tive
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-lg font-semibold text-gray-800">
          {bill.name}
        </div>
        <div className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded">
          {bill.legislature}
        </div>
      </div>

      {/* Action buttons hidden - keeping empty div for layout consistency */}
      <div className="flex gap-3">
        {/* Download, Share, and Full Analysis buttons removed */}
      </div>
    </div>
  );
};