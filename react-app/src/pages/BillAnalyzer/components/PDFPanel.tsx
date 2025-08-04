// pages/BillAnalyzer/components/PDFPanel.tsx
import React from 'react';
import type { BillAnalyzerData } from '../../../types';
import { PDFViewer } from './PDFViewer';

interface PDFPanelProps {
  bill: BillAnalyzerData;
  totalPages?: number;
}

export const PDFPanel: React.FC<PDFPanelProps> = ({
  bill,
  totalPages = 12
}) => {
  // Default values for PDF display
  const currentPage = 1;
  const zoomLevel = 100;

  return (
    <div className="w-1/2 bg-white flex flex-col">
      <PDFViewer
        bill={bill}
        currentPage={currentPage}
        totalPages={totalPages}
        zoomLevel={zoomLevel}
      />
    </div>
  );
};