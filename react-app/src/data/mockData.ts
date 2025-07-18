// data/mockData.ts
import type { Conversation, Bill } from '../types';

export const mockBills: Bill[] = [
  {
    id: '1',
    name: 'HB121',
    summary: 'Prohibits use of public funds for lobbying activities by state agencies and local governments',
    similarity: 98
  },
  {
    id: '2',
    name: 'SB7',
    summary: 'Restricts taxpayer-funded lobbying and requires disclosure of lobbying expenditures',
    similarity: 91
  },
  {
    id: '3',
    name: 'HB450',
    summary: 'Establishes transparency requirements for government lobbying activities',
    similarity: 89
  }
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Finding Your Representative',
    preview: 'Found Meredith Hayes as Texas House representative and discussed taxpayer-funded lobbying bills...',
    date: 'Today, 3:45 PM',
    isActive: true,
    messages: [
      {
        id: '1',
        type: 'assistant',
        content: 'Hello! I\'m your Civic Advocate. I can help you understand legislation, find your representatives, and learn how to make your voice heard. How can I help you today?',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'user',
        content: 'Who is my state representative?',
        timestamp: new Date()
      },
      {
        id: '3',
        type: 'assistant',
        content: 'I can help you with that. To find your specific representative, I\'ll need your street address.',
        timestamp: new Date(),
        hasAddressInput: true
      },
      {
        id: '4',
        type: 'assistant',
        content: 'Thank you. Searching the official database...',
        timestamp: new Date()
      },
      {
        id: '5',
        type: 'assistant',
        content: 'Your Texas House representative is Meredith Hayes. I\'ve also found her contact information. Would you like me to display it?',
        timestamp: new Date()
      },
      {
        id: '6',
        type: 'user',
        content: 'Yes, please',
        timestamp: new Date()
      },
      {
        id: '7',
        type: 'assistant',
        content: 'Here is the contact information for Representative Meredith Hayes:\n\nOffice: (512) 463-0486\nEmail: meredith.hayes@house.texas.gov\nOffice Address: Texas State Capitol, Room E1.412\n1100 Congress Ave, Austin, TX 78701',
        timestamp: new Date()
      },
      {
        id: '8',
        type: 'user',
        content: 'Have there been any bills in past sessions to stop taxpayer-funded lobbying?',
        timestamp: new Date()
      },
      {
        id: '9',
        type: 'assistant',
        content: 'Searching the legislative corpus... One moment.',
        timestamp: new Date()
      },
      {
        id: '10',
        type: 'assistant',
        content: 'Found relevant bills:',
        timestamp: new Date(),
        hasBillsTable: true,
        bills: mockBills
      }
    ]
  },
  {
    id: '2',
    title: 'Infrastructure Bill Analysis',
    preview: 'Summarized key provisions of the Infrastructure Investment and Jobs Act...',
    date: 'Today, 2:30 PM',
    isActive: false,
    messages: []
  },
  {
    id: '3',
    title: 'Climate Legislation Review',
    preview: 'Compared state-level climate policies and federal initiatives...',
    date: 'Dec 15, 2024',
    isActive: false,
    messages: []
  },
  {
    id: '4',
    title: 'Education Reform Bill',
    preview: 'Broke down the proposed changes to federal education funding...',
    date: 'Dec 14, 2024',
    isActive: false,
    messages: []
  },
  {
    id: '5',
    title: 'Tax Code Updates',
    preview: 'Analyzed implications of recent tax law modifications...',
    date: 'Dec 12, 2024',
    isActive: false,
    messages: []
  }
];