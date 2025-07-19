// components/layout/MainContent.tsx - Fixed version
import React from 'react';
import type { Conversation } from '../../types';
import { ChatHeader } from '../chat/ChatHeader';
import { ChatMessages } from '../chat/ChatMessages';
import { ChatInput } from '../chat/ChatInput';

interface MainContentProps {
  activeConversation: Conversation | null;
  onSendMessage: (message: string) => void;
  onAddressSubmit?: (address: string) => void;
  onBillAction?: (billId: string, action: 'view' | 'analyze') => void;
  isLoading?: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  activeConversation,
  onSendMessage,
  onAddressSubmit,
  onBillAction,
  isLoading = false
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white">
      <ChatHeader
        title={activeConversation?.title || 'New Conversation'}
        subtitle={activeConversation?.title ? 'Civic advocacy and legislative research' : 'Start a new analysis'}
      />

      <ChatMessages
        messages={activeConversation?.messages || []}
        onAddressSubmit={onAddressSubmit}
        onBillAction={onBillAction}
        onSendMessage={onSendMessage} // Pass the onSendMessage prop
      />

      <ChatInput
        onSendMessage={onSendMessage}
        disabled={isLoading}
      />
    </div>
  );
};