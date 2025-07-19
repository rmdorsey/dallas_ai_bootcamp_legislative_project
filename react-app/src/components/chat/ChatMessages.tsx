// components/chat/ChatMessages.tsx - Fixed version
import React, { useEffect, useRef } from 'react';
import type { Message as MessageType } from '../../types';
import { Message } from './Message';

interface ChatMessagesProps {
  messages: MessageType[];
  onAddressSubmit?: (address: string) => void;
  onBillAction?: (billId: string, action: 'view' | 'analyze') => void;
  onSendMessage?: (message: string) => void; // Add this prop
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  onAddressSubmit,
  onBillAction,
  onSendMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Example message handlers
  const handleExampleClick = (exampleType: string) => {
    if (!onSendMessage) return;

    const exampleMessages = {
      representative: "I'd like to find my representative. Can you help me locate my local representatives?",
      analyze: "Can you help me analyze a specific bill? I'm interested in understanding recent legislation.",
      search: "I want to search for bills related to climate change and environmental policy.",
      advocacy: "Can you give me tips on how to effectively contact my representatives about issues I care about?"
    };

    const message = exampleMessages[exampleType as keyof typeof exampleMessages];
    if (message) {
      onSendMessage(message);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
      <div className="space-y-5">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onAddressSubmit={onAddressSubmit}
            onBillAction={onBillAction}
          />
        ))}

        {/* Empty state when no messages */}
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome to LegislAItive
            </div>
            <div className="text-gray-500 mb-6">
              Start a conversation to analyze legislation and find your representatives
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => handleExampleClick('representative')}
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
                onClick={() => handleExampleClick('analyze')}
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
                onClick={() => handleExampleClick('search')}
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
                onClick={() => handleExampleClick('advocacy')}
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

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};