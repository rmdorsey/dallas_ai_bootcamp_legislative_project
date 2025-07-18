// components/chat/BillsTable.tsx
import React from 'react';
import type { BillsTableProps } from '../../types';

export const BillsTable: React.FC<BillsTableProps> = ({ bills, onBillAction }) => {
  const getSimilarityBadgeClass = (similarity: number) => {
    if (similarity >= 90) {
      return 'bg-green-100 text-green-800';
    } else if (similarity >= 80) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left text-sm font-semibold">Similar (%)</th>
            <th className="p-3 text-left text-sm font-semibold">Name</th>
            <th className="p-3 text-left text-sm font-semibold">Summary</th>
            <th className="p-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr
              key={bill.id}
              className="hover:bg-gray-100 transition-colors"
            >
              <td className={`p-3 ${index !== bills.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${getSimilarityBadgeClass(bill.similarity)}`}>
                  {bill.similarity}%
                </span>
              </td>
              <td className={`p-3 ${index !== bills.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <strong className="text-sm">{bill.name}</strong>
              </td>
              <td className={`p-3 text-sm ${index !== bills.length - 1 ? 'border-b border-gray-200' : ''}`}>
                {bill.summary}
              </td>
              <td className={`p-3 ${index !== bills.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <button
                  className="px-3 py-1 mr-2 border border-teal-700 text-teal-700 rounded text-xs font-medium hover:bg-teal-700 hover:text-white transition-colors"
                  onClick={() => onBillAction(bill.id, 'view')}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 border border-gray-800 text-gray-800 rounded text-xs font-medium hover:bg-gray-800 hover:text-white transition-colors"
                  onClick={() => onBillAction(bill.id, 'analyze')}
                >
                  Analyze
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};