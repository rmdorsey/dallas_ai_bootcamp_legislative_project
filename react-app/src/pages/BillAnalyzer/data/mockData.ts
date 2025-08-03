// pages/BillAnalyzer/data/mockData.ts
import type { BillAnalyzerData, SuggestionButton, Message } from '../../../types';

export const mockBillData: BillAnalyzerData = {
  id: 'HB94',
  name: 'HB 94',
  fullTitle: 'AN ACT relating to restrictions on taxpayer-funded lobbying and requiring disclosure of lobbying expenditures by government entities',
  session: '87th Legislature, Regular Session, 2021',
  legislature: '87th Legislature • Regular Session',
  content: [
    {
      id: 'section1',
      title: 'SECTION 1. SHORT TITLE',
      content: 'This Act may be cited as the "Taxpayer Protection from Government Lobbying Act."'
    },
    {
      id: 'section2',
      title: 'SECTION 2. FINDINGS AND PURPOSE',
      content: '',
      subsections: [
        {
          label: '(a) FINDINGS.',
          content: 'The Legislature finds that:\n\n(1) taxpayer funds should be used for essential government services and not for lobbying activities that may conflict with taxpayer interests;\n\n(2) the use of public funds to hire lobbyists creates an unequal playing field in the democratic process;\n\n(3) transparency in government spending on lobbying activities is essential for public accountability.'
        },
        {
          label: '(b) PURPOSE.',
          content: 'The purpose of this Act is to prohibit the use of taxpayer funds for lobbying activities and ensure transparency in any government interaction with lobbyists.'
        }
      ]
    },
    {
      id: 'section3',
      title: 'SECTION 3. RESTRICTION ON USE OF PUBLIC FUNDS BY CERTAIN PUBLIC ENTITIES FOR LOBBYING ACTIVITIES',
      content: `This section applies to specific public entities such as political subdivisions, transit authorities, public institutions of higher education, etc. It prohibits spending public funds to hire lobbyists or pay associations that engage in lobbying, with several exemptions such as providing information to legislators or testifying upon request. Violations may result in injunctions, attorney fee recovery, and loss of state funding for two years.`
    },
    {
      id: 'section4',
      title: 'SECTION 4. AMENDMENT TO SECTION 89.002, LOCAL GOVERNMENT CODE',
      content: `Modifies existing code to align with lobbying restrictions, emphasizing that counties may fund associations only if they do not engage in prohibited lobbying or political activities. Taxpayers may seek injunctions against violations.`
    },
    {
      id: 'section5',
      title: 'SECTION 5. EFFECTIVE DATE',
      content: 'This Act takes effect on the 91st day after the last day of the legislative session.'
    }
  ]
};

export const mockSuggestions: SuggestionButton[] = [
  { id: '1', text: 'Summarize the whole bill', action: 'summarize_all' },
  { id: '2', text: 'Explain Section 4', action: 'explain_section_4' },
  { id: '3', text: 'Define "lobbying"', action: 'define_lobbying' },
  { id: '4', text: 'What are the penalties?', action: 'show_penalties' },
  { id: '5', text: 'Who does this affect?', action: 'show_affected_parties' },
  { id: '6', text: 'Compare to current law', action: 'compare_current_law' }
];

export const mockBillAnalyzerMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: 'Welcome to the Bill Analyzer! I have loaded HB 94. You can ask me to summarize sections, define terms, or explain what the bill does. What would you like to know?',
    timestamp: new Date()
  }
];