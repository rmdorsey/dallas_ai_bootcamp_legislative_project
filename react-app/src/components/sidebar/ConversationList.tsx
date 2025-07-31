// components/sidebar/ConversationList.tsx
import React, { useState } from 'react';
import type { ConversationListProps } from '../../types';

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onConversationSelect,
  onConversationDelete,
  onConversationEdit
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

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

  const handleEditStart = (e: React.MouseEvent, conversationId: string, currentTitle: string) => {
    e.stopPropagation(); // Prevent triggering conversation selection
    setEditingId(conversationId);
    setEditingTitle(currentTitle);
  };

  const handleEditSave = (conversationId: string) => {
    if (editingTitle.trim() && onConversationEdit) {
      onConversationEdit(conversationId, editingTitle.trim());
    }
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, conversationId: string) => {
    if (e.key === 'Enter') {
      handleEditSave(conversationId);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
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
            onClick={() => editingId !== conversation.id && onConversationSelect(conversation.id)}
          >
            <div className="pr-16"> {/* Add more padding for both buttons */}
              {editingId === conversation.id ? (
                <div className="mb-1">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, conversation.id)}
                    onBlur={() => handleEditSave(conversation.id)}
                    className="w-full text-sm font-semibold bg-white border border-teal-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-100"
                    autoFocus
                    maxLength={50}
                  />
                </div>
              ) : (
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  {conversation.title}
                </div>
              )}

              <div className="text-xs text-gray-500 line-clamp-2">
                {conversation.preview}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {conversation.date}
              </div>
            </div>

            {/* Action Buttons - Only show when not editing */}
            {editingId !== conversation.id && (
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Edit Button */}
                <button
                  onClick={(e) => handleEditStart(e, conversation.id, conversation.title)}
                  className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-500 transition-all duration-200"
                  title="Edit conversation name"
                >
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>

                {/* Delete Button - Only show if there are multiple conversations */}
                {conversations.length > 1 && (
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
                )}
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