// contexts/ChatContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Conversation, Message } from '../types';
import { mockConversations } from '../data/mockData';

interface ChatContextType {
  conversations: Conversation[];
  activeConversationId: string;
  activeConversation: Conversation | null;
  handleConversationSelect: (conversationId: string) => void;
  handleNewAnalysis: () => void;
  handleSendMessage: (messageContent: string) => void;
  handleAddressSubmit: (address: string) => void;
  handleBillAction: (billId: string, action: 'view' | 'analyze') => void;
  handleConversationDelete: (conversationId: string) => void;
  handleConversationEdit: (conversationId: string, newTitle: string) => void; // Added edit function
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

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const navigate = useNavigate();

  // Get active conversation
  const activeConversation = conversations.find(conv => conv.id === activeConversationId) || null;

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
    if (!newTitle.trim()) return; // Don't allow empty titles

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
          id: Date.now().toString(),
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
      id: Date.now().toString(),
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

  // Handle sending a message
  const handleSendMessage = useCallback((messageContent: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

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

    // Auto-scroll to bottom after adding message
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);

    // Simulate AI response with specific logic for different requests
    setTimeout(() => {
      let aiResponseContent = 'Thank you for your message. I\'m processing your request and will provide a detailed response about the legislation you\'re interested in.';
      let hasAddressInput = false;
      let hasBillsTable = false;
      let bills = undefined;

      // Check if the user is asking about representatives
      const isRepresentativeRequest = messageContent.toLowerCase().includes('representative') ||
                                    messageContent.toLowerCase().includes('congressman') ||
                                    messageContent.toLowerCase().includes('senator') ||
                                    messageContent.toLowerCase().includes('my rep');

      // Check if the user is asking about bills or legislation
      const isBillRequest = messageContent.toLowerCase().includes('bill') ||
                           messageContent.toLowerCase().includes('legislation') ||
                           messageContent.toLowerCase().includes('search') ||
                           messageContent.toLowerCase().includes('climate') ||
                           messageContent.toLowerCase().includes('analyze');

      if (isRepresentativeRequest) {
        aiResponseContent = 'I can help you with that. To find your specific representative, I\'ll need your street address.';
        hasAddressInput = true;
      } else if (isBillRequest) {
        aiResponseContent = 'Found relevant bills:';
        hasBillsTable = true;
        bills = [
          {
            id: 'HR-1234',
            name: 'Climate Action Now Act',
            summary: 'A comprehensive bill to address climate change through renewable energy investments and carbon reduction targets.',
            similarity: 95
          },
          {
            id: 'S-567',
            name: 'Green Infrastructure Investment Act',
            summary: 'Legislation focused on building sustainable infrastructure and creating green jobs across the United States.',
            similarity: 87
          },
          {
            id: 'HR-890',
            name: 'Environmental Protection Enhancement Act',
            summary: 'Updates environmental regulations and strengthens EPA oversight of industrial emissions.',
            similarity: 82
          },
          {
            id: 'S-234',
            name: 'Renewable Energy Transition Act',
            summary: 'Provides tax incentives and federal support for transitioning to renewable energy sources.',
            similarity: 78
          }
        ];
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
        hasAddressInput: hasAddressInput,
        hasBillsTable: hasBillsTable,
        bills: bills
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, aiResponse]
              }
            : conv
        )
      );

      // Auto-scroll to bottom after AI response
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }, 1000);
  }, [activeConversationId]);

  // Handle address submission
  const handleAddressSubmit = useCallback((address: string) => {
    if (!activeConversationId) return;

    // Add user's address as a message
    const addressMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `My address is: ${address}`,
      timestamp: new Date()
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, addressMessage],
              preview: `Address provided: ${address.substring(0, 50)}...`,
              date: new Date().toLocaleString()
            }
          : conv
      )
    );

    // Auto-scroll to bottom
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);

    // Simulate AI response with representative information
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Thank you for providing your address: ${address}. I'm now searching for your representative... 

Based on your location, here's what I found:

**Your Representative:**
- **Name:** John Smith (Example)
- **District:** 15th Congressional District
- **Party:** Democratic
- **Office:** 123 Capitol Building, Washington, DC 20515
- **Phone:** (202) 225-1234
- **Email:** rep.johnsmith@house.gov

**Your Senators:**
- **Senator Jane Doe** - (202) 224-5678
- **Senator Bob Johnson** - (202) 224-9876

Would you like me to help you draft a message to contact any of these representatives about specific legislation?`,
        timestamp: new Date()
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversationId
            ? {
                ...conv,
                messages: [...conv.messages, aiResponse]
              }
            : conv
        )
      );

      // Auto-scroll to bottom after AI response
      setTimeout(() => {
        const chatContainer = document.querySelector('.chat-messages-container');
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }, 2000);
  }, [activeConversationId]);

  // Handle bill actions
  const handleBillAction = useCallback((billId: string, action: 'view' | 'analyze') => {
    if (action === 'analyze') {
      // Navigate to the Bill Analyzer page
      navigate('/bill-analyzer');
      return;
    }

    // Handle "view" action - show bill details in chat
    if (!activeConversationId) return;

    const responseContent = `Here are the details for bill ${billId}:

**Bill ${billId} - Full Details**

**Status:** Currently in committee review
**Sponsors:** Rep. Jane Smith (D-CA), Sen. John Doe (R-TX)
**Last Action:** Referred to House Committee on Energy and Commerce
**Summary:** This comprehensive legislation aims to address critical environmental challenges through innovative policy solutions and federal investment strategies.

**Key Provisions:**
• Establishes new renewable energy tax credits
• Creates federal grants for green infrastructure projects
• Sets new emissions standards for major industries
• Funds research into clean energy technologies

Would you like me to explain any specific section of this bill?`;

    const responseMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: responseContent,
      timestamp: new Date()
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversationId
          ? {
              ...conv,
              messages: [...conv.messages, responseMessage]
            }
          : conv
      )
    );

    // Auto-scroll to bottom
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }, [activeConversationId, navigate]);

  const value: ChatContextType = {
    conversations,
    activeConversationId,
    activeConversation,
    handleConversationSelect,
    handleNewAnalysis,
    handleSendMessage,
    handleAddressSubmit,
    handleBillAction,
    handleConversationDelete,
    handleConversationEdit // Added edit handler
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};