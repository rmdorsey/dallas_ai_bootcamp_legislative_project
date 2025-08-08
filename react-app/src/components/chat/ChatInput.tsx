// components/chat/ChatInput.tsx - Updated with advanced bill search
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BillSearchButton } from './BillSearchButton'; // Import the new component

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your message..."
}) => {
  const [message, setMessage] = useState('');
  const [showBillSearch, setShowBillSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle bill selection from the advanced search
  const handleBillSelected = (bill: any, content: string) => {
    console.log('Selected bill:', bill);
    console.log('Bill content:', content);

    // You can either:
    // 1. Navigate to bill analyzer with the selected bill
    navigate(`/bill-analyzer?bill=${encodeURIComponent(bill.originalName)}`);

    // 2. Or send the bill info as a message to the chat
    // onSendMessage(`Analyzing bill: ${bill.title} (${bill.originalName})`);

    // Close the bill search
    setShowBillSearch(false);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* Advanced Bill Search Interface */}
      {showBillSearch && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="font-semibold text-sm text-blue-800">Advanced Bill Search</h3>
            </div>
            <button
              onClick={() => setShowBillSearch(false)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Use the new BillSearchButton component */}
          <BillSearchButton
            onBillSelected={handleBillSelected}
            billFilenames={[]} // Add your known bill filenames here if you have them
          />
        </div>
      )}

      {/* Main Chat Input */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none max-h-32 min-h-[48px]"
            style={{ minHeight: '48px' }}
          />
        </div>

        {/* Advanced Bill Search Button */}
        <button
          type="button"
          onClick={() => setShowBillSearch(!showBillSearch)}
          className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
            showBillSearch
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-lg'
              : 'bg-white text-blue-600 border-blue-300 hover:bg-blue-50 hover:border-blue-500 shadow-sm'
          }`}
          title="Search for bills to analyze (Advanced)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="flex items-center justify-center w-12 h-12 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
};