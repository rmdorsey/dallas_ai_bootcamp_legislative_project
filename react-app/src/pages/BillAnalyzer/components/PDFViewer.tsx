// pages/BillAnalyzer/components/PDFViewer.tsx
import React from 'react';
import type { PDFViewerProps } from '../../../types';

export const PDFViewer: React.FC<PDFViewerProps> = ({
  bill,
  currentPage,
  totalPages,
  zoomLevel
}) => {
  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div
      className="flex-1 bg-gray-50 flex items-center justify-center relative overflow-auto"
      style={{
        transform: `scale(${zoomLevel / 100})`,
        transformOrigin: 'top center'
      }}
    >
      <div className="bg-white shadow-lg rounded w-[90%] max-w-2xl h-[85%] p-10 overflow-y-auto text-sm leading-relaxed">
        {/* Bill Header */}
        <div className="text-center mb-8 border-b-2 border-gray-200 pb-5">
          <div className="text-2xl font-bold text-gray-800 mb-2">
            {bill.name}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {bill.session}
          </div>
          <div className="text-base font-semibold text-gray-800 leading-snug">
            {bill.fullTitle}
          </div>
        </div>

        {/* Bill Sections */}
        {bill.content.map((section) => (
          <div key={section.id} className="mb-6">
            <div className="text-base font-semibold text-gray-800 mb-3 py-2 border-b border-gray-200">
              {section.title}
            </div>
            <div className="text-gray-700 leading-relaxed">
              {section.content && (
                <div className="mb-4">
                  {formatContent(section.content)}
                </div>
              )}

              {section.subsections && (
                <div>
                  {section.subsections.map((subsection, index) => (
                    <div key={index} className="my-4 pl-5">
                      <span className="font-semibold text-gray-800">
                        {subsection.label}
                      </span>
                      <div className="mt-2">
                        {formatContent(subsection.content)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Page indicator for visual feedback */}
        <div className="text-center mt-8 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
};