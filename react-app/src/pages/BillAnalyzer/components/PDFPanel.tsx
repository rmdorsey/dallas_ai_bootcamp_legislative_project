// pages/BillAnalyzer/components/PDFPanel.tsx
import React, { useState } from 'react';
import type { BillAnalyzerData } from '../../../types';
import { PDFToolbar } from './PDFToolbar';
import { PDFViewer } from './PDFViewer';

interface PDFPanelProps {
  bill: BillAnalyzerData;
  totalPages?: number;
}

export const PDFPanel: React.FC<PDFPanelProps> = ({
  bill,
  totalPages = 12
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleZoomChange = (newZoom: number) => {
    setZoomLevel(newZoom);
  };

  return (
    <div className="w-1/2 bg-white flex flex-col">
      <PDFToolbar
        currentPage={currentPage}
        totalPages={totalPages}
        zoomLevel={zoomLevel}
        onPageChange={handlePageChange}
        onZoomChange={handleZoomChange}
      />

      <PDFViewer
        bill={bill}
        currentPage={currentPage}
        totalPages={totalPages}
        zoomLevel={zoomLevel}
      />
    </div>
  );
};