// contexts/ChatContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Conversation, Message } from '../types';
import { mockConversations } from '../data/mockData'; // Import mock conversations

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

  // Initialize with mock conversations on mount
  useEffect(() => {
    // Load mock conversations as default to show interesting content with bills table
    if (conversations.length === 0) {
      console.log('🚀 Loading mock conversations with bills table...');

      // Load the mock conversations from mockData.ts
      // The first conversation already contains a bills table
      const conversationsWithActiveFlag = mockConversations.map((conv, index) => ({
        ...conv,
        isActive: index === 0 // Make the first conversation (with bills table) active
      }));

      setConversations(conversationsWithActiveFlag);
      setActiveConversationId(conversationsWithActiveFlag[0].id);

      console.log('✅ Loaded mock conversations:', conversationsWithActiveFlag);
      console.log('📋 Active conversation ID:', conversationsWithActiveFlag[0].id);
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

  // Handle sending a message with invoke endpoint (non-streaming)
  const handleSendMessage = useCallback(async (messageContent: string) => {
    if (!activeConversationId) return;

    console.log('🚀 Starting message send process...');
    console.log('📝 Message content:', messageContent);
    console.log('🔗 Thread ID:', activeConversationId);
    console.log('🌐 API URL:', API_URL);

    setIsLoading(true);
    setError(null);

    // Add user message immediately
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    console.log('👤 Adding user message:', newMessage);

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
      const requestBody = {
        question: messageContent,
        thread_id: activeConversationId
      };

      console.log('📤 Sending request to:', `${API_URL}/agent_legislative_overview/agent_legislative_overview`);
      console.log('📦 Request body:', requestBody);

      // Send request to FastAPI invoke endpoint (non-streaming)
      const response = await fetch(`${API_URL}/agent_legislative_overview/agent_legislative_overview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Response status:', response.status);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        console.error('❌ HTTP error:', response.status, response.statusText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // For /agent/invoke, we expect a JSON response, not streaming
      const responseData = await response.json();

      console.log('📊 Full response data:', responseData);
      console.log('📊 Response type:', typeof responseData);
      console.log('📊 Response keys:', Object.keys(responseData));

      // Extract the assistant's response content
      let assistantContent = '';

      // Check different possible response structures - prioritize 'data' field
      if (responseData.data) {
        assistantContent = responseData.data;
        console.log('✅ Found content in responseData.data');
      } else if (responseData.content) {
        assistantContent = responseData.content;
        console.log('✅ Found content in responseData.content');
      } else if (responseData.response) {
        assistantContent = responseData.response;
        console.log('✅ Found content in responseData.response');
      } else if (responseData.message) {
        assistantContent = responseData.message;
        console.log('✅ Found content in responseData.message');
      } else if (responseData.output) {
        assistantContent = responseData.output;
        console.log('✅ Found content in responseData.output');
      } else if (typeof responseData === 'string') {
        assistantContent = responseData;
        console.log('✅ Response is a string');
      } else {
        console.warn('⚠️ Could not find content in response, using full response as string');
        assistantContent = JSON.stringify(responseData, null, 2);
      }

      console.log('🤖 Assistant content:', assistantContent);

      if (!assistantContent) {
        console.error('❌ No content found in response');
        throw new Error('No content received from the API');
      }

      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };

      console.log('🤖 Adding assistant message:', assistantMessage);

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

      console.log('✅ Message processing completed successfully');

      // Auto-scroll to bottom after response
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
          console.log('📜 Auto-scrolled to bottom');
        }
      }, 100);

    } catch (error) {
      console.error('❌ Failed to send message to API:', error);

      const errorText = error instanceof Error ? error.message : 'Unknown error occurred';
      const errorName = error instanceof Error ? error.name : 'Error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      console.error('❌ Error details:', {
        name: errorName,
        message: errorText,
        stack: errorStack
      });

      setError(`Failed to send message: ${errorText}`);

      // Add an error message to the conversation
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Sorry, I encountered an error while processing your request: ${errorText}. Please try again.`,
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
      console.log('🏁 Message send process completed');
    }
  }, [activeConversationId]);

  // Handle address submission (can reuse the invoke logic)
  const handleAddressSubmit = useCallback(async (address: string) => {
    if (!activeConversationId) return;

    // Use the same invoke logic but with a formatted address question
    const addressQuestion = `My address is: ${address}. Please find my representative information.`;
    await handleSendMessage(addressQuestion);
  }, [activeConversationId, handleSendMessage]);

  // Handle bill actions
  const handleBillAction = useCallback(async (billId: string, action: 'view' | 'analyze') => {
    console.log(`🏛️ Bill action: ${action} for bill ${billId}`);

    if (action === 'analyze') {
      // Navigate to the Bill Analyzer page
      console.log('📊 Navigating to bill analyzer...');
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