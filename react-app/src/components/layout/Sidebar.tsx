// components/layout/Sidebar.tsx
import React from 'react';
import type { Conversation } from '../../types';
import { SidebarHeader } from '../sidebar/SidebarHeader';
import { NewAnalysisButton } from '../sidebar/NewAnalysisButton';
import { ConversationList } from '../sidebar/ConversationList';

interface SidebarProps {
  conversations: Conversation[];
  onConversationSelect: (conversationId: string) => void;
  onNewAnalysis: () => void;
  onConversationDelete?: (conversationId: string) => void;
  onConversationEdit?: (conversationId: string, newTitle: string) => void;
  onHomeNavigate?: () => void; // New prop for home navigation
  onLogout?: () => void; // New prop for logout functionality
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  onConversationSelect,
  onNewAnalysis,
  onConversationDelete,
  onConversationEdit,
  onHomeNavigate,
  onLogout
}) => {
  const handleLogoClick = () => {
    // Call both home navigation and logout when logo is clicked
    if (onHomeNavigate) {
      onHomeNavigate();
    }
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Combined Header with Logo and Slogan - clickable to return home and logout */}
      <div className="p-5 border-b border-gray-200">
        <button
          onClick={handleLogoClick}
          className="text-2xl font-bold hover:text-teal-400 transition-colors cursor-pointer w-full text-left mb-1"
        >
          legisl<span className="text-teal-400">AI</span>tive
        </button>
        <p className="text-sm text-gray-600">Legislation Made Legible</p>
      </div>
      <NewAnalysisButton onClick={onNewAnalysis} />
      <ConversationList
        conversations={conversations}
        onConversationSelect={onConversationSelect}
        onConversationDelete={onConversationDelete}
        onConversationEdit={onConversationEdit}
      />
    </div>
  );
};