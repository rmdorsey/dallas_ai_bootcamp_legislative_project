// components/home/data/homePageData.ts
export const demoData = {
  climate: {
    title: "HR-1234: Climate Action",
    response: "I found 3 bills related to climate policy. The most relevant is HR-1234 which establishes new renewable energy standards and provides federal funding for clean energy initiatives across all states."
  },
  infrastructure: {
    title: "SB-567: Infrastructure",
    response: "SB-567 focuses on modernizing America's infrastructure with a $2 trillion investment plan. This bill includes funding for roads, bridges, broadband expansion, and electric vehicle charging networks nationwide."
  },
  healthcare: {
    title: "HR-890: Healthcare Reform",
    response: "HR-890 aims to expand healthcare access through Medicare expansion and prescription drug cost reduction. This comprehensive bill includes provisions for mental health coverage and reduces the Medicare eligibility age to 60."
  },
  education: {
    title: "SB-223: Education Funding",
    response: "SB-223 addresses the student debt crisis by providing $50 billion in additional funding for public universities and community colleges. The bill also includes provisions for free community college tuition for first-time students."
  }
};

export const journeySteps = [
  {
    id: 'discovery',
    title: 'Discovery & Frustration',
    badge: { text: 'The Problem', color: 'red', bgColor: 'red-500/20', borderColor: 'red-500/30', textColor: 'red-300' },
    description: 'Alex discovers their tax dollars are funding city lobbying efforts they disagree with. Feeling betrayed and powerless, they ask: "What can I possibly do about this?"',
    icon: 'warning',
    quote: '"My own tax dollars are being used against my interests. There has to be something I can do..."',
    quoteAuthor: 'Civic Frustration'
  },
  {
    id: 'representatives',
    title: 'Find Representatives',
    badge: { text: 'Step 1-2', color: 'orange', bgColor: 'orange-500/20', borderColor: 'orange-500/30', textColor: 'orange-300' },
    description: 'Alex asks the chatbot: "Who is my state representative?" In seconds, they learn about Meredith Hayes and get complete contact information.',
    icon: 'location',
    chatResponse: {
      text: '"Your Texas House representative is Meredith Hayes."',
      details: {
        phone: '(XXX) XXX-XXXX',
        email: 'mail@house...',
        office: 'Capitol Office: 1N.3'
      }
    }
  },
  {
    id: 'solutions',
    title: 'Find Solutions',
    badge: { text: 'Step 3-4', color: 'yellow', bgColor: 'yellow-500/20', borderColor: 'yellow-500/30', textColor: 'yellow-300' },
    description: 'Alex discovers Senate House Bill 94 that addresses taxpayer-funded lobbying. The chatbot translates complex legal language into plain English.',
    icon: 'document',
    billInfo: {
      title: 'Senate House Bill 94',
      description: '"This bill prohibits local governments from using taxpayer funds for lobbying activities. Here\'s what it means for Dallas residents..."'
    }
  },
  {
    id: 'build-case',
    title: 'Build the Case',
    badge: { text: 'Step 5-6', color: 'green', bgColor: 'green-500/20', borderColor: 'green-500/30', textColor: 'green-300' },
    description: 'The chatbot provides compelling arguments and identifies the Policy Advocates Foundation as an ally. Alex discovers specific Dallas examples affecting property taxes.',
    icon: 'users',
    impact: {
      dallas: 'City lobbying for real estate disclosure could raise tax bills.',
      ally: 'Policy Advocates Foundation'
    }
  },
  {
    id: 'meeting',
    title: 'Successful Meeting',
    badge: { text: 'The Meeting', color: 'blue', bgColor: 'blue-500/20', borderColor: 'blue-500/30', textColor: 'blue-300' },
    description: 'Armed with research and solutions, Alex meets Representative Hayes. The meeting transforms from constituent complaint to valuable collaboration.',
    icon: 'chat',
    quote: '"This is incredibly helpful. I\'m impressed with how well you know this issue."',
    quoteAuthor: 'Rep. Hayes'
  },
  {
    id: 'action',
    title: 'Civic Advocate',
    badge: { text: 'Taking Action', color: 'teal', bgColor: 'teal-500/20', borderColor: 'teal-500/30', textColor: 'teal-300' },
    description: 'Energized by success, Alex finds upcoming committee hearings to provide testimony. In just days, they\'ve transformed from powerless taxpayer to effective civic advocate.',
    icon: 'star',
    result: 'From frustrated taxpayer to informed advocate with action plan and testimony opportunity.'
  }
];

export const features = [
  {
    icon: 'lightbulb',
    title: 'AI-Powered Analysis',
    description: 'Break down complex bills into clear, understandable summaries with key insights and implications.',
    color: 'teal'
  },
  {
    icon: 'map-pin',
    title: 'Find Your Representatives',
    description: 'Instantly locate your local, state, and federal representatives with complete contact information.',
    color: 'blue'
  },
  {
    icon: 'search',
    title: 'Intelligent Search',
    description: 'Discover relevant legislation using natural language queries and similarity matching.',
    color: 'purple'
  }
  // Features - for the future
  /*
  {
    icon: 'message-circle',
    title: 'Interactive Guidance',
    description: 'Chat with AI to get personalized advice on civic engagement and advocacy strategies.',
    color: 'green'
  },
  {
    icon: 'file-text',
    title: 'Document Deep Dive',
    description: 'Analyze bills section by section with contextual explanations and impact assessments.',
    color: 'orange'
  },
  {
    icon: 'award',
    title: 'Advocacy Support',
    description: 'Get guidance on effective communication strategies and tools for civic participation.',
    color: 'red'
  }
  */
];

export const howItWorksSteps = [
  {
    number: 1,
    title: 'Ask or Search',
    description: 'Start with a question about legislation or search for specific bills and topics.',
    color: 'teal'
  },
  {
    number: 2,
    title: 'Get AI Analysis',
    description: 'Receive clear summaries, key insights, and understand the implications of legislation.',
    color: 'blue'
  },
  {
    number: 3,
    title: 'Take Action',
    description: 'Connect with representatives and make informed decisions about civic participation.',
    color: 'indigo'
  }
];

export const techStack = [
  { name: 'React', description: 'Frontend', color: 'blue' },
  { name: 'FastAPI', description: 'Backend', color: 'green' },
  { name: 'LangGraph', description: 'AI Agents', color: 'purple' },
  { name: 'ChromaDB', description: 'Vector Store', color: 'yellow' },
  { name: 'Llama3', description: 'LLM Model', color: 'red' },
  { name: 'Docker', description: 'Containerization', color: 'blue' }
];