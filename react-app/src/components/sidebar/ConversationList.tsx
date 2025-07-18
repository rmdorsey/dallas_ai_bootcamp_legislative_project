// components/sidebar/ConversationList.tsx
import React from 'react';
import type { ConversationListProps } from '../../types';

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onConversationSelect
}) => {
  return (
    <div className="flex-1 overflow-y-auto px-5">
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 rounded-lg cursor-pointer transition-colors border ${
              conversation.isActive
                ? 'bg-green-50 border-teal-700'
                : 'hover:bg-gray-50 border-transparent'
            }`}
            onClick={() => onConversationSelect(conversation.id)}
          >
            <div className="font-semibold text-sm text-gray-800 mb-1">
              {conversation.title}
            </div>
            <div className="text-xs text-gray-500 line-clamp-2">
              {conversation.preview}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {conversation.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};