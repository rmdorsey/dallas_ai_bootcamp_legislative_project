// data/mockData.ts
import type { Conversation, Bill } from '../types';

export const mockBills: Bill[] = [
  {
    id: '1',
    name: 'HB121',
    summary: 'AN ACT relating to restrictions on taxpayer-funded lobbying and requiring disclosure of lobbying expenditures by government entities',
    similarity: 98
  },
  {
    id: '2',
    name: 'HB 94',
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
        type: 'user',
        content: 'My adddres is: My address is 3665 Western Center Blvd, Fort Worth, TX.',
        timestamp: new Date()
      },
      {
        id: '5',
        type: 'assistant',
        content: 'Your Texas House Representative is Nate Schatzline a Republican representing Texas House of Representatives district 93. He can be contacted at P.O. Box 2910, Room E1.410, Austin, TX 78768 or (512) 463-0562.',
        timestamp: new Date()
      },
        {
        id: '6',
        type: 'user',
        content: 'Has representative Schatzline worked on any legislation related to ending tax-payer funded lobbying?',
        timestamp: new Date()
      },
{
        id: '7',
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