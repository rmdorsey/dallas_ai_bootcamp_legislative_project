// types/index.ts
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  hasAddressInput?: boolean;
  hasBillsTable?: boolean;
  bills?: Bill[];
}

export interface Bill {
  id: string;
  name: string;
  summary: string;
  similarity: number;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  date: string;
  messages: Message[];
  isActive: boolean;
}

export interface ConversationListProps {
  conversations: Conversation[];
  onConversationSelect: (conversationId: string) => void;
}

export interface MessageProps {
  message: Message;
  onAddressSubmit?: (address: string) => void;
  onBillAction?: (billId: string, action: 'view' | 'analyze') => void;
}

export interface BillsTableProps {
  bills: Bill[];
  onBillAction: (billId: string, action: 'view' | 'analyze') => void;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

// Authentication types
export interface User {
  name: string;
  email: string;
  type: 'demo' | 'google';
  loginTime: string;
  picture?: string; // For Google users
  googleId?: string; // For Google users
}

// New types for Bill Analyzer
export interface BillAnalyzerData {
  id: string;
  name: string;
  fullTitle: string;
  session: string;
  legislature: string;
  content: BillSection[];
}

export interface BillSection {
  id: string;
  title: string;
  content: string;
  subsections?: BillSubsection[];
}

export interface BillSubsection {
  label: string;
  content: string;
}

export interface SuggestionButton {
  id: string;
  text: string;
  action: string;
}

export interface PDFViewerProps {
  bill: BillAnalyzerData;
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
}

export interface PDFToolbarProps {
  currentPage: number;
  totalPages: number;
  zoomLevel: number;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: number) => void;
}

export interface ChatPanelProps {
  billName: string;
  messages: Message[];
  onSendMessage: (message: string) => void;
  suggestions: SuggestionButton[];
  onSuggestionClick: (suggestion: SuggestionButton) => void;
  isLoading?: boolean;
}

export interface BillAnalyzerHeaderProps {
  bill: BillAnalyzerData;
  onBack: () => void;
  onDownload: () => void;
  onShare: () => void;
  onFullAnalysis: () => void;
}