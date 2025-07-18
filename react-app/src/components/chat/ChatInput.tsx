// components/chat/ChatInput.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { ChatInputProps } from '../../types';

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="p-5 border-t border-gray-200 bg-white">
      <div className="flex gap-3 items-end">
        <textarea
          ref={textareaRef}
          className="flex-1 min-h-11 max-h-32 p-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-colors"
          placeholder="Ask about any legislation, policy, or bill..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
        />
        <button
          className={`px-4 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
            message.trim() && !disabled
              ? 'bg-teal-700 text-white hover:bg-teal-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!message.trim() || disabled}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12l3-3 3 3"/>
            <path d="m8 12h13"/>
          </svg>
          Send
        </button>
      </div>
    </div>
  );
};