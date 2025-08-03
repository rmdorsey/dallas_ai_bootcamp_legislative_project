// components/sidebar/ConversationList.tsx
import React, { useState } from 'react';
import type { ConversationListProps } from '../../types';

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onConversationSelect,
  onConversationDelete
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, conversationId: string) => {
    e.stopPropagation(); // Prevent triggering conversation selection

    if (deletingId) return; // Prevent multiple simultaneous deletes

    setDeletingId(conversationId);

    // Add a small delay to show the loading state
    setTimeout(() => {
      onConversationDelete?.(conversationId);
      setDeletingId(null);
    }, 300);
  };

  return (
    <div className="flex-1 overflow-y-auto px-5">
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`group relative p-4 rounded-lg cursor-pointer transition-colors border ${
              conversation.isActive
                ? 'bg-green-50 border-teal-700'
                : 'hover:bg-gray-50 border-transparent'
            }`}
            onClick={() => onConversationSelect(conversation.id)}
          >
            <div className="pr-8"> {/* Add padding for delete button */}
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

            {/* Delete Button - Only show if there are multiple conversations */}
            {conversations.length > 1 && (
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleDelete(e, conversation.id)}
                  disabled={deletingId === conversation.id}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 ${
                    deletingId === conversation.id
                      ? 'bg-red-100 text-red-500 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                  }`}
                  title="Delete conversation"
                >
                  {deletingId === conversation.id ? (
                    <div className="w-3 h-3 border border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Empty state when no conversations */}
        {conversations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-sm font-medium mb-1">No conversations yet</div>
            <div className="text-xs">Start a new analysis to begin</div>
          </div>
        )}
      </div>
    </div>
  );
};