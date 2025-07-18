// components/chat/ChatInterface.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import { Message } from './Message';

export const ChatInterface: React.FC = () => {
  const { user, logout } = useAuth();
  const { activeConversation, handleSendMessage, handleAddressSubmit, handleBillAction } = useChat();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessageWithProcessing = async (message: string) => {
    setIsProcessing(true);
    handleSendMessage(message);
    // Reset processing state after a short delay (simulating API call)
    setTimeout(() => setIsProcessing(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      {/* Chat Header */}
      <div className="p-5 border-b border-gray-200 bg-white flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-semibold text-gray-800 mb-1">
              {activeConversation?.title || 'New Conversation'}
            </div>
            <div className="text-sm text-gray-500">
              {activeConversation?.title ? 'Civic advocacy and legislative research' : 'Start a new analysis'}
            </div>
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
      <div className="flex-1 overflow-y-auto p-5 bg-gray-50 chat-messages-container min-h-0">
        <div className="space-y-5 min-h-full">
          {activeConversation?.messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              onAddressSubmit={handleAddressSubmit}
              onBillAction={handleBillAction}
            />
          ))}

          {/* Empty state with functional examples */}
          {(!activeConversation?.messages || activeConversation.messages.length === 0) && (
            <div className="text-center py-12">
              <div className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome to LegislAItive
              </div>
              <div className="text-gray-500 mb-6">
                Start a conversation to analyze legislation and find your representatives
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => handleSendMessageWithProcessing("I'd like to find my representative. Can you help me locate my local representatives?")}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Find My Representative
                  </div>
                  <div className="text-xs text-gray-500">
                    Get contact information for your local representatives
                  </div>
                </button>

                <button
                  onClick={() => handleSendMessageWithProcessing("Can you help me analyze a specific bill? I'm interested in understanding recent legislation.")}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Analyze a Bill
                  </div>
                  <div className="text-xs text-gray-500">
                    Get a summary and analysis of any piece of legislation
                  </div>
                </button>

                <button
                  onClick={() => handleSendMessageWithProcessing("I want to search for bills related to climate change and environmental policy.")}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="font-semibold text-sm text-gray-800 mb-1">
                    Search Similar Bills
                  </div>
                  <div className="text-xs text-gray-500">
                    Find related legislation on specific topics
                  </div>
                </button>

                <button
                  onClick={() => handleSendMessageWithProcessing("Can you give me tips on how to effectively contact my representatives about issues I care about?")}
                  className="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-700 hover:shadow-md transition-all cursor-pointer text-left"
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
                if (message && !isProcessing) {
                  handleSendMessageWithProcessing(message);
                  target.value = '';
                }
              }
            }}
            disabled={isProcessing}
            rows={1}
          />
          <button
            className={`px-4 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 flex-shrink-0 ${
              !isProcessing
                ? 'bg-teal-700 text-white hover:bg-teal-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            onClick={(e) => {
              const textarea = e.currentTarget.parentElement?.querySelector('textarea') as HTMLTextAreaElement;
              const message = textarea?.value.trim();
              if (message && !isProcessing) {
                handleSendMessageWithProcessing(message);
                textarea.value = '';
              }
            }}
            disabled={isProcessing}
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