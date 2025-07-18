// pages/BillAnalyzer/data/mockData.ts
import type { BillAnalyzerData, SuggestionButton, Message } from '../../../types';

export const mockBillData: BillAnalyzerData = {
  id: 'sb7',
  name: 'S.B. 7',
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
      title: 'SECTION 3. DEFINITIONS',
      content: 'For purposes of this Act:',
      subsections: [
        {
          label: '(1) "Government entity"',
          content: 'means a state agency, department, board, commission, or other state governmental entity, and includes any political subdivision of the state.'
        },
        {
          label: '(2) "Lobbying"',
          content: 'means direct communication with a member of the legislative or executive branch for the purpose of influencing legislative or administrative action.'
        },
        {
          label: '(3) "Public funds"',
          content: 'means money received from taxes, fees, federal grants, or other revenue sources by a government entity.'
        }
      ]
    },
    {
      id: 'section4',
      title: 'SECTION 4. PROHIBITION ON USE OF PUBLIC FUNDS',
      content: '',
      subsections: [
        {
          label: '(a)',
          content: 'A government entity may not use public funds to:\n\n(1) employ or contract with a person to engage in lobbying;\n\n(2) pay membership dues to an organization that engages in lobbying; or\n\n(3) directly or indirectly support lobbying activities.'
        }
      ]
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
    content: 'Welcome to the Bill Analyzer! I have loaded SB7. You can ask me to summarize sections, define terms, or explain what the bill does. What would you like to know?',
    timestamp: new Date()
  }
];