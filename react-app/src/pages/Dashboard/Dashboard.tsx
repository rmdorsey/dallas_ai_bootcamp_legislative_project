// pages/Dashboard/Dashboard.tsx
import React from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { ChatInterface } from '../../components/chat/ChatInterface';
import { useChat } from '../../contexts/ChatContext';

export const Dashboard: React.FC = () => {
  const { conversations, handleConversationSelect, handleNewAnalysis } = useChat();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="flex h-screen">
        <Sidebar
          conversations={conversations}
          onConversationSelect={handleConversationSelect}
          onNewAnalysis={handleNewAnalysis}
        />
        <ChatInterface />
      </div>
    </div>
  );
};