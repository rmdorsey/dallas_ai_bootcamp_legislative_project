// pages/BillAnalyzer/components/PDFViewer.tsx
import React from 'react';
import type { PDFViewerProps } from '../../../types';

export const PDFViewer: React.FC<PDFViewerProps> = ({
  bill,
  currentPage,
  totalPages,
  zoomLevel
}) => {
  // PDF file path - you can make this dynamic based on bill.id or bill.name
  const pdfUrl = '/HB00094I.pdf';

  // Construct PDF URL with page parameter for browsers that support it
  const pdfUrlWithPage = `${pdfUrl}#page=${currentPage}&zoom=${zoomLevel}`;

  return (
    <div className="flex-1 bg-gray-50 flex flex-col relative overflow-hidden">
      {/* PDF Container */}
      <div className="flex-1 relative">
        <iframe
          src={pdfUrlWithPage}
          className="w-full h-full border-none"
          title={`${bill.name} - Legislative Document`}
          style={{
            minHeight: '100%',
            background: 'white'
          }}
          onLoad={() => {
            console.log('📄 PDF loaded successfully:', pdfUrl);
          }}
          onError={(error) => {
            console.error('❌ Failed to load PDF:', error);
          }}
        />
      </div>

      {/* PDF Info Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>📄 {bill.name}</span>
          <span>•</span>
          <span>{bill.session}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Page {currentPage} of {totalPages}</span>
          <span>•</span>
          <span>{zoomLevel}% zoom</span>
        </div>
      </div>


    </div>
  );
};