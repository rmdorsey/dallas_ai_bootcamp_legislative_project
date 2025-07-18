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
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  onConversationSelect,
  onNewAnalysis
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <SidebarHeader />
      <NewAnalysisButton onClick={onNewAnalysis} />
      <ConversationList
        conversations={conversations}
        onConversationSelect={onConversationSelect}
      />
    </div>
  );
};