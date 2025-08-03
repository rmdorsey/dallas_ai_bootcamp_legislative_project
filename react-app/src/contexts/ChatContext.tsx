// contexts/ChatContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Conversation, Message } from '../types';

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: string;
  activeConversation: Conversation | null;
  isLoading: boolean;
  error: string | null;
  handleConversationSelect: (conversationId: string) => void;
  handleNewAnalysis: () => void;
  handleSendMessage: (messageContent: string) => void;
  handleAddressSubmit: (address: string) => void;
  handleBillAction: (billId: string, action: 'view' | 'analyze') => void;
  handleConversationDelete: (conversationId: string) => void;
  handleConversationEdit: (conversationId: string, newTitle: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get active conversation
  const activeConversation = conversations.find(conv => conv.id === activeConversationId) || null;

  // Initialize with a default conversation on mount
  useEffect(() => {
    // Start with mock data for now, but you can modify this to load from API
    // if you implement conversation persistence in your FastAPI backend
    if (conversations.length === 0) {
      const defaultConversation: Conversation = {
        id: 'default-thread-id',
        title: 'New Conversation',
        preview: 'Start a new analysis...',
        date: new Date().toLocaleString(),
        isActive: true,
        messages: []
      };

      setConversations([defaultConversation]);
      setActiveConversationId('default-thread-id');
    }
  }, []);

  // Handle conversation selection
  const handleConversationSelect = useCallback((conversationId: string) => {
    setConversations(prev =>
      prev.map(conv => ({
        ...conv,
        isActive: conv.id === conversationId
      }))
    );
    setActiveConversationId(conversationId);
  }, []);

  // Handle conversation editing
  const handleConversationEdit = useCallback((conversationId: string, newTitle: string) => {
    if (!newTitle.trim()) return;

    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, title: newTitle.trim() }
          : conv
      )
    );
  }, []);

  // Handle conversation deletion
  const handleConversationDelete = useCallback((conversationId: string) => {
    setConversations(prev => {
      const filteredConversations = prev.filter(conv => conv.id !== conversationId);

      // If we deleted the active conversation, select another one
      if (conversationId === activeConversationId && filteredConversations.length > 0) {
        const newActiveConversation = filteredConversations[0];
        newActiveConversation.isActive = true;
        setActiveConversationId(newActiveConversation.id);

        return filteredConversations.map(conv => ({
          ...conv,
          isActive: conv.id === newActiveConversation.id
        }));
      }

      // If no conversations left, create a new one
      if (filteredConversations.length === 0) {
        const newConversation: Conversation = {
          id: `thread-${Date.now()}`,
          title: 'New Conversation',
          preview: 'Start a new analysis...',
          date: new Date().toLocaleString(),
          isActive: true,
          messages: []
        };
        setActiveConversationId(newConversation.id);
        return [newConversation];
      }

      return filteredConversations;
    });
  }, [activeConversationId]);

  // Handle new analysis
  const handleNewAnalysis = useCallback(() => {
    const newConversation: Conversation = {
      id: `thread-${Date.now()}`,
      title: 'New Conversation',
      preview: 'Start a new analysis...',
      date: new Date().toLocaleString(),
      isActive: true,
      messages: []
    };

    setConversations(prev => [
      newConversation,
      ...prev.map(conv => ({ ...conv, isActive: false }))
    ]);
    setActiveConversationId(newConversation.id);
  }, []);

  // Handle sending a message with streaming response
  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!activeConversationId) return;

    setIsLoading(true);
    setError(null);

    // Add user message immediately
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    // Update conversation with just the user message first
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              preview: messageContent.substring(0, 80) + (messageContent.length > 80 ? '...' : ''),
              date: new Date().toLocaleString(),
              // Update title if it's still "New Conversation"
              title: conv.title === 'New Conversation'
                ? messageContent.substring(0, 30) + (messageContent.length > 30 ? '...' : '')
                : conv.title
            }
          : conv
      )
    );

    try {
      // Send request to FastAPI streaming endpoint
      const response = await fetch(`${API_URL}/agent/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: messageContent,
          thread_id: activeConversationId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body reader available');
      }

      const decoder = new TextDecoder();
      let accumulatedContent = '';
      let assistantMessageId: string | null = null;
      let hasStartedResponse = false;

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.type === 'error') {
                  throw new Error(data.content);
                }

                // Accumulate content from assistant messages
                if (data.type === 'ai' || data.type === 'assistant') {
                  accumulatedContent += data.content;

                  // Create assistant message on first response chunk
                  if (!hasStartedResponse) {
                    assistantMessageId = (Date.now() + 1).toString();
                    hasStartedResponse = true;

                    const assistantMessage: Message = {
                      id: assistantMessageId,
                      type: 'assistant',
                      content: accumulatedContent,
                      timestamp: new Date()
                    };

                    // Add the assistant message to the conversation
                    setConversations(prev =>
                      prev.map(conv =>
                        conv.id === activeConversationId
                          ? {
                              ...conv,
                              messages: [...conv.messages, assistantMessage]
                            }
                          : conv
                      )
                    );
                  } else if (assistantMessageId) {
                    // Update existing assistant message with accumulated content
                    setConversations(prev =>
                      prev.map(conv =>
                        conv.id === activeConversationId
                          ? {
                              ...conv,
                              messages: conv.messages.map(msg =>
                                msg.id === assistantMessageId
                                  ? { ...msg, content: accumulatedContent }
                                  : msg
                              )
                            }
                          : conv
                      )
                    );
                  }
                }

                // Handle tool calls or other message types
                if (data.tool_calls) {
                  // You can handle tool calls here if needed
                  console.log('Tool calls:', data.tool_calls);
                }

              } catch (parseError) {
                console.error('Failed to parse SSE data:', parseError);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      // Auto-scroll to bottom after response completes
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);

    } catch (error) {
      console.error('Failed to send message to API:', error);
      setError('Failed to send message. Please try again.');

      // Add an error message to the conversation
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        timestamp: new Date()
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, errorMessage]
              }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId]);

  // Handle address submission (can reuse the streaming logic)
  const handleAddressSubmit = useCallback(async (address: string) => {
    if (!activeConversationId) return;

    // Use the same streaming logic but with a formatted address question
    const addressQuestion = `My address is: ${address}. Please find my representative information.`;
    await handleSendMessage(addressQuestion);
  }, [activeConversationId, handleSendMessage]);

  // Handle bill actions
  const handleBillAction = useCallback(async (billId: string, action: 'view' | 'analyze') => {
    if (action === 'analyze') {
      // Navigate to the Bill Analyzer page
      navigate('/bill-analyzer');
      return;
    }

    // Handle "view" action by sending a question to the agent
    if (!activeConversationId) return;

    const billQuestion = `Please provide detailed information about bill ${billId}, including its status, sponsors, summary, and key provisions.`;
    await handleSendMessage(billQuestion);
  }, [activeConversationId, navigate, handleSendMessage]);

  // Clear error after a timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const value: ChatContextType = {
    conversations,
    activeConversationId,
    activeConversation,
    isLoading,
    error,
    handleConversationSelect,
    handleNewAnalysis,
    handleSendMessage,
    handleAddressSubmit,
    handleBillAction,
    handleConversationDelete,
    handleConversationEdit
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};