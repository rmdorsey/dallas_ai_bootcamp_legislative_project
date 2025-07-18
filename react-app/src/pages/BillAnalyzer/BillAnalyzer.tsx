// pages/BillAnalyzer/BillAnalyzer.tsx
import React, { useState, useCallback } from 'react';
import type { Message, SuggestionButton } from '../../types';
import { BillAnalyzerHeader } from './components/BillAnalyzerHeader';
import { ChatPanel } from './components/ChatPanel';
import { PDFPanel } from './components/PDFPanel';
import { mockBillData, mockSuggestions, mockBillAnalyzerMessages } from './data/mockData';

interface BillAnalyzerProps {
  onBack: () => void;
}

export const BillAnalyzer: React.FC<BillAnalyzerProps> = ({
  onBack
}) => {
  const [messages, setMessages] = useState<Message[]>(mockBillAnalyzerMessages);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, you'd fetch bill data based on billId
  const billData = mockBillData;

  const handleSendMessage = useCallback((messageContent: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getAIResponse(messageContent),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: SuggestionButton) => {
    handleSendMessage(suggestion.text);
  }, [handleSendMessage]);

  const handleDownload = useCallback(() => {
    console.log('Downloading PDF for:', billData.name);
    // In a real app, trigger PDF download
  }, [billData.name]);

  const handleShare = useCallback(() => {
    console.log('Sharing bill:', billData.name);
    // In a real app, open share dialog
  }, [billData.name]);

  const handleFullAnalysis = useCallback(() => {
    console.log('Starting full analysis for:', billData.name);
    // In a real app, navigate to full analysis page
  }, [billData.name]);

  // Simple AI response generator based on message content
  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('summarize') || lowerMessage.includes('summary')) {
      return 'Senate Bill 7 is the "Taxpayer Protection from Government Lobbying Act." It prohibits government entities from using public funds for lobbying activities, requires transparency in lobbying expenditures, and establishes clear definitions for government entities, lobbying, and public funds. The bill aims to ensure taxpayer money goes to essential services rather than lobbying efforts.';
    }

    if (lowerMessage.includes('section 4') || lowerMessage.includes('prohibition')) {
      return 'Section 4 establishes the core prohibition of the bill. It states that government entities cannot use public funds to: (1) employ or contract with lobbyists, (2) pay membership dues to lobbying organizations, or (3) directly or indirectly support lobbying activities. This section is the enforcement mechanism of the bill.';
    }

    if (lowerMessage.includes('lobbying') && lowerMessage.includes('define')) {
      return 'According to Section 3(2) of the bill, "Lobbying" means direct communication with a member of the legislative or executive branch for the purpose of influencing legislative or administrative action. This definition is intentionally broad to capture various forms of influence attempts.';
    }

    if (lowerMessage.includes('penalties') || lowerMessage.includes('enforcement')) {
      return 'The bill as shown doesn\'t specify explicit penalties, but it establishes a clear prohibition. Enforcement would typically be handled through existing government oversight mechanisms, budget audits, and potentially civil enforcement actions. Additional sections of the full bill may contain specific penalty provisions.';
    }

    if (lowerMessage.includes('affect') || lowerMessage.includes('who')) {
      return 'This bill affects all government entities, defined as state agencies, departments, boards, commissions, and other state governmental entities, including political subdivisions. This means state agencies, local governments, school districts, and other public entities would all be subject to these restrictions.';
    }

    if (lowerMessage.includes('current law') || lowerMessage.includes('compare')) {
      return 'This bill would strengthen existing lobbying restrictions by creating a blanket prohibition on taxpayer-funded lobbying. Current law may have some restrictions, but this bill creates a comprehensive ban with clear definitions and broad coverage of all government entities.';
    }

    return 'I can help you analyze any aspect of Senate Bill 7. You can ask me about specific sections, definitions, implications, or how this bill might affect different groups. What would you like to explore further?';
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="flex h-screen flex-col">
        <BillAnalyzerHeader
          bill={billData}
          onBack={onBack}
          onDownload={handleDownload}
          onShare={handleShare}
          onFullAnalysis={handleFullAnalysis}
        />

        <div className="flex-1 flex overflow-hidden">
          <ChatPanel
            billName={billData.name}
            messages={messages}
            onSendMessage={handleSendMessage}
            suggestions={mockSuggestions}
            onSuggestionClick={handleSuggestionClick}
            isLoading={isLoading}
          />

          <PDFPanel
            bill={billData}
            totalPages={12}
          />
        </div>
      </div>
    </div>
  );
};