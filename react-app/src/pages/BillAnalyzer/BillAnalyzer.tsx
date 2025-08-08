// pages/BillAnalyzer/BillAnalyzer.tsx
import React, { useState, useCallback, useEffect } from 'react';
import type { Message, SuggestionButton } from '../../types';
import { BillAnalyzerHeader } from './components/BillAnalyzerHeader';
import { ChatPanel } from './components/ChatPanel';
import { PDFPanel } from './components/PDFPanel';
import { mockSuggestions } from './data/mockData';

interface BillAnalyzerProps {
  onBack: () => void;
}

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_FASTAPI_URL || 'http://localhost:8000';

export const BillAnalyzer: React.FC<BillAnalyzerProps> = ({
  onBack
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [billNumber, setBillNumber] = useState<string>('');

  // Extract bill number from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const billParam = urlParams.get('bill') || 'HB112'; // Default fallback
    setBillNumber(billParam);

    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      type: 'assistant',
      content: `Welcome to the Bill Analyzer! I have loaded ${billParam}. You can ask me to summarize sections, define terms, or explain what the bill does. What would you like to know?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Create bill data object from URL parameter
  const billData = {
    id: billNumber,
    name: billNumber,
    fullTitle: `Legislative Bill ${billNumber}`,
    session: '88th Legislature, Regular Session, 2023',
    legislature: '88th Legislature • Regular Session',
    content: []
  };

  const handleSendMessage = useCallback(async (messageContent: string) => {
    console.log('🏛️ Starting bill analysis message send process...');
    console.log('📝 Message content:', messageContent);
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

    try {
      // Extract bill number and chamber from bill data
const billName = billData.name; // e.g., "HB112"
let extractedBillNumber = '';
let chamber = '';

if (billName.startsWith('S.B.') || billName.startsWith('SB')) {
  const rawNumber = billName.replace(/S\.?B\.?\s*/i, '').trim();
  extractedBillNumber = rawNumber.replace(/\D/g, ''); // Remove all non-digits
  chamber = 'Senate';
} else if (billName.startsWith('H.B.') || billName.startsWith('HB')) {
  const rawNumber = billName.replace(/H\.?B\.?\s*/i, '').trim();
  extractedBillNumber = rawNumber.replace(/\D/g, ''); // Remove all non-digits
  chamber = 'House';
} else {
  // Try to extract number from any format
  const numberMatch = billName.match(/\d+/);
  extractedBillNumber = numberMatch ? numberMatch[0] : '';
  chamber = billName.toLowerCase().includes('s') ? 'Senate' : 'House';
}

// Ensure we have a valid numeric bill number
if (!extractedBillNumber || !/^\d+$/.test(extractedBillNumber)) {
  extractedBillNumber = '112'; // fallback default
}

const requestBody = {
  bill_number: extractedBillNumber,
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