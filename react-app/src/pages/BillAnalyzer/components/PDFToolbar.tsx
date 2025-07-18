// pages/BillAnalyzer/components/PDFToolbar.tsx
import React from 'react';
import type { PDFToolbarProps } from '../../../types';

export const PDFToolbar: React.FC<PDFToolbarProps> = ({
  currentPage,
  totalPages,
  zoomLevel,
  onPageChange,
  onZoomChange
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      onZoomChange(zoomLevel + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      onZoomChange(zoomLevel - 25);
    }
  };

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded cursor-pointer text-xs transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span className="text-xs text-gray-500 mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded cursor-pointer text-xs transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= 50}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded cursor-pointer text-xs transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="text-xs text-gray-500 mx-3">
          {zoomLevel}%
        </span>
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 200}
          className="px-3 py-1.5 bg-white border border-gray-200 rounded cursor-pointer text-xs transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
};