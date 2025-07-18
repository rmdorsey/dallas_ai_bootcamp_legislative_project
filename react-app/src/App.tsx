// App.tsx
import React, { useState, useCallback } from 'react';
import type { Conversation, Message } from './types';
import { mockConversations } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { BillAnalyzer } from './pages/BillAnalyzer/BillAnalyzer';

const App: React.FC = () => {
  // Navigation state
  const [currentView, setCurrentView] = useState<'main' | 'bill-analyzer'>('main');

  // State management for main app
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string>('1');
  const [isLoading, setIsLoading] = useState(false);

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
              date: new Date().toLocaleString()
            }
          : conv
      )
    );

    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Thank you for your message. I\'m processing your request and will provide a detailed response about the legislation you\'re interested in.',
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
    }, 1000);
  }, [activeConversationId]);

  // Handle address submission
  const handleAddressSubmit = useCallback((address: string) => {
    if (!activeConversationId) return;

    console.log('Address submitted:', address);

    // Simulate processing
    setIsLoading(true);
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: `Thank you for providing your address: ${address}. I'm now searching for your representative...`,
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
      setIsLoading(false);
    }, 2000);
  }, [activeConversationId]);

  // Handle bill actions
  const handleBillAction = useCallback((billId: string, action: 'view' | 'analyze') => {
    if (action === 'analyze') {
      // Navigate to Bill Analyzer
      setCurrentView('bill-analyzer');
      return;
    }

    // Handle 'view' action
    console.log(`${action} bill ${billId}`);

    const responseMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: `I'm ${action === 'view' ? 'retrieving' : 'analyzing'} the details for bill ${billId}. Please wait a moment...`,
      timestamp: new Date()
    };

    if (activeConversationId) {
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
    }
  }, [activeConversationId]);

  // Handle back navigation from Bill Analyzer
  const handleBackToMain = useCallback(() => {
    setCurrentView('main');
  }, []);

  // Render Bill Analyzer if that's the current view
  if (currentView === 'bill-analyzer') {
    return (
      <BillAnalyzer
        onBack={handleBackToMain}
      />
    );
  }

  // Render main application
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="flex h-screen">
        <Sidebar
          conversations={conversations}
          onConversationSelect={handleConversationSelect}
          onNewAnalysis={handleNewAnalysis}
        />

        <MainContent
          activeConversation={activeConversation}
          onSendMessage={handleSendMessage}
          onAddressSubmit={handleAddressSubmit}
          onBillAction={handleBillAction}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;