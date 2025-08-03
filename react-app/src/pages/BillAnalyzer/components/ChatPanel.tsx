// pages/BillAnalyzer/components/ChatPanel.tsx
import React, { useState, useRef, useEffect } from 'react';
import type { ChatPanelProps, SuggestionButton } from '../../../types';
import { SuggestionButtons } from './SuggestionButtons';

export const ChatPanel: React.FC<ChatPanelProps> = ({
  billName,
  messages,
  onSendMessage,
  suggestions,
  onSuggestionClick,
  isLoading = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [inputValue]);

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionButton) => {
    setInputValue(suggestion.text);
    onSuggestionClick(suggestion);
  };

  const formatMessageContent = (content: string) => {
    // Auto-detect if content has markdown formatting (**text**)
    const hasMarkdownFormatting = /\*\*[^*]+\*\*/g.test(content);

    if (hasMarkdownFormatting) {
      // Format markdown-style text with **bold** support
      const parts = content.split(/(\*\*[^*]+\*\*)/g);

      return (
        <>
          {parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              // This is bold text
              const boldText = part.slice(2, -2);
              return <strong key={index} className="font-bold text-gray-900">{boldText}</strong>;
            } else {
              // Regular text - preserve line breaks
              return part.split('\n').map((line, lineIndex, array) => (
                <React.Fragment key={`${index}-${lineIndex}`}>
                  {line}
                  {lineIndex < array.length - 1 && <br />}
                </React.Fragment>
              ));
            }
          })}
        </>
      );
    } else {
      // Regular formatting for non-markdown messages
      return content.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < content.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    }
  };

  return (
    <div className="w-1/2 flex flex-col bg-white border-r border-gray-200">
      {/* Chat Header */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="text-lg font-semibold text-gray-800 mb-1">
          Bill Analyzer
        </div>
        <div className="text-sm text-gray-500">
          AI-powered legislative analysis for {billName}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
        <div className="space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  AI
                </div>
              )}

              <div
                className={`max-w-[75%] p-4 rounded-xl shadow-sm border ${
                  message.type === 'user'
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="text-sm leading-relaxed">
                  {formatMessageContent(message.content)}
                </div>

                {/* Show suggestion buttons only on the first assistant message */}
                {message.type === 'assistant' &&
                 message.id === messages.find(m => m.type === 'assistant')?.id && (
                  <SuggestionButtons
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                  />
                )}
              </div>

              {message.type === 'user' && (
                <div className="w-9 h-9 bg-teal-700 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Show loading indicator when AI is responding */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                AI
              </div>
              <div className="max-w-[75%] bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span>Analyzing...</span>
                </div>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-gray-200 bg-white">
        <div className="flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            className="flex-1 min-h-11 max-h-32 p-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-colors"
            placeholder="Ask about any aspect of this bill..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isLoading}
            className={`px-4 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
              inputValue.trim() && !isLoading
                ? 'bg-teal-700 text-white hover:bg-teal-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12l3-3 3 3"/>
              <path d="m8 12h13"/>
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};