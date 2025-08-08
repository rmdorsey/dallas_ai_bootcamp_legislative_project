// components/chat/ChatInterface.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { Message } from './Message';

export const ChatInterface: React.FC = () => {
  const { user, logout } = useAuth();
  const {
    activeConversation,
    handleSendMessage,
    handleAddressSubmit,
    handleBillAction,
    isLoading,
    handleConversationEdit
  } = useChat();

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Bill search states
  const [showBillSearch, setShowBillSearch] = useState(false);
  const [billQuery, setBillQuery] = useState('');
  const [isLoadingBill, setIsLoadingBill] = useState(false);
  const navigate = useNavigate();

  // Add ref for the scrollable container
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or when loading starts/stops
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
    };

    // Small delay to ensure DOM has updated
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [activeConversation?.messages, isLoading]);

  const handleBillSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!billQuery.trim()) return;

    setIsLoadingBill(true);

    try {
      // Navigate to BillAnalyzer with the bill query
      navigate(`/bill-analyzer?bill=${encodeURIComponent(billQuery.trim())}`);

      // Reset and close
      setBillQuery('');
      setShowBillSearch(false);
    } catch (error) {
      console.error('Error navigating to bill analyzer:', error);
    } finally {
      setIsLoadingBill(false);
    }
  };

  const handleBillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBillSearch(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      {/* Chat Header */}
      <div className="p-5 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-semibold text-gray-800">
                {activeConversation?.title || 'New Conversation'}
              </div>
              <button
                onClick={() => {
                  setNewTitle(activeConversation?.title || 'New Conversation');
                  setIsEditingTitle(true);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                </svg>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {activeConversation?.title ? 'Civic advocacy and legislative research' : 'Start a new analysis'}
            </div>
          </div>

          {/* Bill Search Button - Center */}
          <div className="flex-1 flex justify-center px-8">
            {!showBillSearch ? (
              <button
                onClick={() => setShowBillSearch(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm font-medium rounded-lg hover:from-teal-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-300 shadow-sm"
              >
                {/* Search Icon */}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Analyze Bill</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg p-2 shadow-sm">
                <form onSubmit={handleBillSearch} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={billQuery}
                    onChange={(e) => setBillQuery(e.target.value)}
                    onKeyPress={handleBillKeyPress}
                    placeholder="Enter bill number or topic..."
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                    disabled={isLoadingBill}
                    autoFocus
                  />

                  <button
                    type="submit"
                    disabled={!billQuery.trim() || isLoadingBill}
                    className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-sm rounded hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isLoadingBill ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </form>

                <button
                  onClick={() => {
                    setShowBillSearch(false);
                    setBillQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name}
              {user?.type === 'demo' && <span className="text-teal-700 font-medium"> (Demo)</span>}
            </span>
            <button
              onClick={logout}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-5 bg-gray-50 chat-messages-container min-h-0"
      >
        <div className="space-y-5 min-h-full">
          {activeConversation?.messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onAddressSubmit={handleAddressSubmit}
              onBillAction={handleBillAction}
            />
          ))}

          {/* Loading indicator - now uses isLoading from ChatContext */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gray-800 text-white rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                AI
              </div>
              <div className="max-w-[70%] bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span>Loading...</span>
                </div>
              </div>
            </div>
          )}

          {/* Empty state with functional examples */}
          {(!activeConversation?.messages || activeConversation.messages.length === 0) && !isLoading && (
            <div className="text-center py-12">
              <div className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to LegislAItive
              </div>
              <div className="text-gray-500 mb-6">
                Start a conversation to analyze legislation and find your representatives
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => handleSendMessage("I'd like to find my representative. Can you help me locate my local representatives?")}
                  disabled={isLoading}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Find My Representative
                  </div>
                  <div className="text-xs text-gray-500">
                    Get contact information for your local representatives
                  </div>
                </button>

                <button
                  onClick={() => handleSendMessage("Can you help me analyze a specific bill? I'm interested in understanding recent legislation.")}
                  disabled={isLoading}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Analyze a Bill
                  </div>
                  <div className="text-xs text-gray-500">
                    Get a summary and analysis of any piece of legislation
                  </div>
                </button>

                <button
                  onClick={() => handleSendMessage("I want to search for bills related to climate change and environmental policy.")}
                  disabled={isLoading}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Search Similar Bills
                  </div>
                  <div className="text-xs text-gray-500">
                    Find related legislation on specific topics
                  </div>
                </button>

                <button
                  onClick={() => handleSendMessage("Can you give me tips on how to effectively contact my representatives about issues I care about?")}
                  disabled={isLoading}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Get Advocacy Tips
                  </div>
                  <div className="text-xs text-gray-500">
                    Learn how to effectively contact your representatives
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Invisible div to scroll to */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-5 border-t border-gray-200 bg-white flex-shrink-0">
        <div className="flex gap-3 items-end max-w-full">
          <textarea
            className="flex-1 min-h-11 max-h-32 p-3 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100 transition-colors min-w-0"
            placeholder="Ask about any legislation, policy, or bill..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                const message = target.value.trim();
                if (message && !isLoading) {
                  handleSendMessage(message);
                  target.value = '';
                }
              }
            }}
            disabled={isLoading}
            rows={1}
          />
          <button
            className="px-4 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 flex-shrink-0 bg-teal-700 text-white hover:bg-teal-800"
            onClick={(e) => {
              const textarea = e.currentTarget.parentElement?.querySelector('textarea') as HTMLTextAreaElement;
              const message = textarea?.value.trim();
              if (message && !isLoading) {
                handleSendMessage(message);
                textarea.value = '';
              }
            }}
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>

      {/* Edit Title Modal */}
      {isEditingTitle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Conversation Title</h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-teal-700"
              placeholder="Enter new title..."
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsEditingTitle(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newTitle.trim() && activeConversation) {
                    handleConversationEdit(activeConversation.id, newTitle.trim());
                  }
                  setIsEditingTitle(false);
                }}
                className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};