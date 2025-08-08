// pages/Dashboard/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/layout/Sidebar';
import { ChatInterface } from '../../components/chat/ChatInterface';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the same logout from AuthContext
  const {
    conversations,
    handleConversationSelect,
    handleNewAnalysis,
    handleConversationDelete
  } = useChat();

  const handleHomeNavigate = () => {
    // Navigate to home page
    navigate('/');
  };

  const handleLogout = () => {
    // Use the same logout function that the Logout button in ChatInterface uses
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="flex h-screen">
        <Sidebar
          conversations={conversations}
          onConversationSelect={handleConversationSelect}
          onNewAnalysis={handleNewAnalysis}
          onConversationDelete={handleConversationDelete}
          onHomeNavigate={handleHomeNavigate}
          onLogout={handleLogout}
        />
        <ChatInterface />
      </div>
    </div>
  );
};