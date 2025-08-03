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

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';

export const BillAnalyzer: React.FC<BillAnalyzerProps> = ({
  onBack
}) => {
  const [messages, setMessages] = useState<Message[]>(mockBillAnalyzerMessages);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, you'd fetch bill data based on billId
  const billData = mockBillData;

  const handleSendMessage = useCallback(async (messageContent: string, useMockResponse?: boolean) => {
    console.log('🏛️ Starting bill analysis message send process...');
    console.log('📝 Message content:', messageContent);
    console.log('🎭 Use mock response:', useMockResponse);
    console.log('📋 Bill data:', billData.name);
    console.log('🌐 API URL:', API_URL);

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    console.log('👤 Adding user message:', newMessage);
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Check if this should use mock response for "Summarize the whole bill"
    if (useMockResponse || messageContent.toLowerCase().includes('summarize the whole bill')) {
      console.log('🎭 Using mock summary response');

      // Create mock summary response with markdown formatting
      const mockSummaryResponse = `**What does this change?**

This bill restricts public entities from spending public funds on lobbying activities. It prohibits the use of public funds to hire or contract with lobbyists and prohibits nonprofits that primarily represent public entities from receiving public funds if they hire or contract with lobbyists.

**Who does this affect?**

• Public entities, including:
  • Political subdivisions that impose taxes
  • Public institutions of higher education
  • Community college districts
  • Publicly owned utilities
  • River authorities and water supply corporations
• Nonprofits that primarily represent public entities
• Taxpayers or residents of public entities

**Why is this important?**

This bill aims to prevent the misuse of public funds for lobbying activities, which could be seen as a form of voter suppression. By restricting the use of public funds for lobbying, this bill seeks to promote transparency and accountability in government spending.

Note: The answer is based on the information returned by the \`search_legislative_text\` tool. If more context or details are needed, please provide them.`;

      // Simulate loading delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: mockSummaryResponse,
          timestamp: new Date()
        };

        console.log('🎭 Adding mock summary response:', aiResponse);
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        console.log('✅ Mock summary response completed successfully');
      }, 1500);

      return; // Exit early for mock response
    }

    try {
      // Extract bill number and chamber from bill data
      // For "S.B. 7" -> bill_number: "7", chamber: "Senate"
      // For "H.B. 121" -> bill_number: "121", chamber: "House"
      const billName = billData.name; // "S.B. 7"
      let billNumber = '';
      let chamber = '';

      if (billName.startsWith('S.B.')) {
        billNumber = billName.replace('S.B. ', '').trim();
        chamber = 'Senate';
      } else if (billName.startsWith('H.B.')) {
        billNumber = billName.replace('H.B. ', '').trim();
        chamber = 'House';
      } else if (billName.startsWith('SB')) {
        billNumber = billName.replace('SB', '').trim();
        chamber = 'Senate';
      } else if (billName.startsWith('HB')) {
        billNumber = billName.replace('HB', '').trim();
        chamber = 'House';
      } else {
        // Default fallback
        billNumber = '7';
        chamber = 'Senate';
      }

      const requestBody = {
        bill_number: billNumber,
        chamber: chamber,
        query: messageContent
      };

      console.log('📦 Request body:', requestBody);
      console.log('📤 Sending request to:', `${API_URL}/agent_legislative_analysis/agent_legislative_analysis`);

      // Send request to FastAPI bill analysis endpoint
      const response = await fetch(`${API_URL}/agent_legislative_analysis/agent_legislative_analysis`, {
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

      // Parse JSON response
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
      } else if (responseData.analysis) {
        assistantContent = responseData.analysis;
        console.log('✅ Found content in responseData.analysis');
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
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: assistantContent,
        timestamp: new Date()
      };

      console.log('🤖 Adding assistant message:', aiResponse);
      setMessages(prev => [...prev, aiResponse]);
      console.log('✅ Bill analysis message processing completed successfully');

    } catch (error) {
      console.error('❌ Failed to send message to bill analysis API:', error);

      const errorText = error instanceof Error ? error.message : 'Unknown error occurred';
      const errorName = error instanceof Error ? error.name : 'Error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      console.error('❌ Error details:', {
        name: errorName,
        message: errorText,
        stack: errorStack
      });

      // Add an error message to the conversation
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `Sorry, I encountered an error while analyzing the bill: ${errorText}. Please try again.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);

    } finally {
      setIsLoading(false);
      console.log('🏁 Bill analysis message send process completed');
    }
  }, [billData]);

  const handleSuggestionClick = useCallback((suggestion: SuggestionButton) => {
    console.log('💡 Suggestion clicked:', suggestion.text);
    handleSendMessage(suggestion.text);
  }, [handleSendMessage]);

  const handleDownload = useCallback(() => {
    console.log('📥 Downloading PDF for:', billData.name);
    // In a real app, trigger PDF download
  }, [billData.name]);

  const handleShare = useCallback(() => {
    console.log('📤 Sharing bill:', billData.name);
    // In a real app, open share dialog
  }, [billData.name]);

  const handleFullAnalysis = useCallback(() => {
    console.log('🔍 Starting full analysis for:', billData.name);
    // In a real app, navigate to full analysis page
  }, [billData.name]);

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