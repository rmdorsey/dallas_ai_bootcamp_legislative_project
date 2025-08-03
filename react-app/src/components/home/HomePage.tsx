// components/home/HomePage.tsx
import React, { useState, useEffect } from 'react';

interface HomePageProps {
  onGetStarted: () => void;
  onAboutClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted, onAboutClick }) => {
  const [activeDemo, setActiveDemo] = useState<'climate' | 'infrastructure' | 'healthcare' | 'education'>('climate');

  const demoData = {
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

  // Auto-cycle through demos every 30 seconds
  useEffect(() => {
    const demoKeys = Object.keys(demoData) as Array<keyof typeof demoData>;

    const interval = setInterval(() => {
      setActiveDemo(prevDemo => {
        const currentIndex = demoKeys.indexOf(prevDemo);
        const nextIndex = (currentIndex + 1) % demoKeys.length;
        return demoKeys[nextIndex];
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Handle manual demo selection (this will override auto-cycle temporarily)
  const handleDemoClick = (demo: keyof typeof demoData) => {
    setActiveDemo(demo);
  };

  // Function to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <button
                onClick={scrollToTop}
                className="text-2xl font-bold hover:text-teal-400 transition-colors cursor-pointer"
              >
                legisl<span className="text-teal-400">AI</span>tive
              </button>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="#problem" className="text-gray-400 hover:text-white transition-colors">
                  Problem
                </a>
                <a href="#customer-journey" className="text-gray-400 hover:text-white transition-colors">
                  Customer Journey
                </a>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How it Works
                </a>
                 <a href="#solution" className="text-gray-400 hover:text-white transition-colors">
                  Solution
                </a>
                <button
                  onClick={onAboutClick}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={onGetStarted}
                className="hidden md:block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Added top padding to account for fixed header */}
      <section className="relative overflow-hidden pt-36 pb-32">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-black to-black"></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-gray-300">Making Democracy Accessible</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Legislation
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                Made Legible
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-12 text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Transform complex legislation into clear insights with AI-powered analysis.
              Find your representatives, understand bills, and make your voice heard in democracy.
            </p>

            {/* Interactive Demo Preview */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm text-gray-500">legislAItive.app</div>
                </div>

                {/* Interactive Mock Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm font-semibold mb-2">Recent Analysis</div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleDemoClick('climate')}
                          className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                            activeDemo === 'climate' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                          }`}
                        >
                          HR-1234: Climate Action
                        </button>
                        <button
                          onClick={() => handleDemoClick('infrastructure')}
                          className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                            activeDemo === 'infrastructure' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                          }`}
                        >
                          SB-567: Infrastructure
                        </button>
                        <button
                          onClick={() => handleDemoClick('healthcare')}
                          className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                            activeDemo === 'healthcare' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                          }`}
                        >
                          HR-890: Healthcare Reform
                        </button>
                        <button
                          onClick={() => handleDemoClick('education')}
                          className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                            activeDemo === 'education' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                          }`}
                        >
                          SB-223: Education Funding
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800/50 rounded-lg p-6 h-64">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-sm font-bold">AI</div>
                        <div className="text-sm">
                          <div className="font-semibold">AI Assistant</div>
                          <div className="text-gray-400 text-xs">Legislative Analysis</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 leading-relaxed">
                        <div className="bg-gray-700/30 rounded-lg p-3 mb-3 border-l-4 border-teal-500">
                          <div className="text-gray-400 text-xs mb-1">Analyzing: {demoData[activeDemo].title}</div>
                        </div>
                        <div className="animate-fade-in">
                          "{demoData[activeDemo].response}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive indicator */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    <span>Auto-cycling every 30s • Click bills to explore manually</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The
              <span className="text-blue-400"> Crisis</span> We're Solving
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              There's a fundamental crisis facing our country: a growing disconnect between
              the American people and the governments that serve them.
            </p>
          </div>

          {/* The Vicious Cycle */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">The Vicious Cycle of Civic Disengagement</h3>
              <p className="text-gray-400 max-w-3xl mx-auto">
                This isn't a crisis of apathy. It's a crisis of access and complexity,
                creating a cycle that weakens the foundation of our republic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Low Civic Literacy */}
              <div className="group relative">
                <div className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-blue-300">Low Civic Literacy</h4>
                  <p className="text-gray-400 text-sm">Fewer than 20% of Americans can name their state legislators. You can't engage with people you can't name.</p>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Overwhelming Complexity */}
              <div className="group relative">
                <div className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-blue-200">Overwhelming Complexity</h4>
                  <p className="text-gray-400 text-sm">Legislative text is dense and intimidating, designed for lawyers, not for the public.</p>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* Low Efficacy & Trust */}
              <div className="group relative">
                <div className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-gray-600/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-300">Low Efficacy & Trust</h4>
                  <p className="text-gray-400 text-sm">85% of Americans believe elected officials don't care what they think. "My voice doesn't matter."</p>
                </div>
                {/* Arrow for desktop */}
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>

              {/* High Barriers to Action */}
              <div className="group">
                <div className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300">
                  <div className="w-12 h-12 bg-gray-700/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L12 21l-6.364-6.364M12 21l6.364-6.364M12 21V9m-6.364 9.364L12 21"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2 text-gray-400">High Barriers to Action</h4>
                  <p className="text-gray-400 text-sm">People face overwhelming obstacles and rationally disengage from the democratic process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Journey Section */}
<section id="customer-journey" className="py-12 border-t border-gray-800">
  <div className="mx-auto max-w-7xl px-4 lg:px-8">
    <div className="mx-auto max-w-4xl text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Meet
        <span className="text-teal-400"> Alex's</span> Journey
      </h2>
      <p className="text-lg text-gray-400 leading-relaxed">
        Follow Alex's journey from discovering taxpayer-funded lobbying to becoming
        an effective civic advocate in just days.
      </p>
    </div>

    {/* Journey Steps - Responsive Layout */}
    <div className="flex flex-col lg:flex-row lg:gap-6 lg:overflow-x-auto lg:pb-4">

      {/* Step 1: Discovery & Frustration */}
      <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
        <div className="text-center">
          {/* Timeline Node */}
          <div className="relative w-12 h-12 bg-red-500/20 border-4 border-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1 mb-3">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-red-300 font-semibold text-sm">The Problem</span>
          </div>

          <h3 className="text-lg font-bold mb-3">Discovery & Frustration</h3>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            Alex discovers their tax dollars are funding city lobbying efforts they disagree with.
            Feeling betrayed and powerless, they ask: "What can I possibly do about this?"
          </p>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <span className="font-semibold text-red-300 text-xs">Civic Frustration</span>
            </div>
            <p className="text-xs text-gray-300 italic">
              "My own tax dollars are being used against my interests. There has to be something I can do..."
            </p>
          </div>
        </div>
      </div>

      {/* Step 2: Finding Representatives */}
      <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
        <div className="text-center">
          {/* Timeline Node */}
          <div className="relative w-12 h-12 bg-orange-500/20 border-4 border-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-3 py-1 mb-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-300 font-semibold text-sm">Step 1-2</span>
          </div>

          <h3 className="text-lg font-bold mb-3">Find Representatives</h3>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            Alex asks the chatbot: "Who is my state representative?" In seconds, they learn about
            <strong className="text-white"> Meredith Hayes</strong> and get complete contact information.
          </p>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xs font-bold text-teal-400">AI</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-300 mb-2">
                  "Your Texas House representative is <strong>Meredith Hayes</strong>."
                </p>
                <div className="bg-gray-800/50 rounded-lg p-2 text-xs">
                  <div className="space-y-1 text-gray-400">
                    <div>📞 (512) 463-0486</div>
                    <div>📧 meredith.hayes@house...</div>
                    <div>🏛️ Capitol Office: 1N.3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Finding Solutions */}
      <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
        <div className="text-center">
          {/* Timeline Node */}
          <div className="relative w-12 h-12 bg-yellow-500/20 border-4 border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1 mb-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-300 font-semibold text-sm">Step 3-4</span>
          </div>

          <h3 className="text-lg font-bold mb-3">Find Solutions</h3>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            Alex discovers <strong className="text-white">Senate Bill 19</strong> that addresses taxpayer-funded lobbying.
            The chatbot translates complex legal language into plain English.
          </p>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <span className="font-semibold text-yellow-300 text-xs">Senate Bill 19</span>
            </div>
            <p className="text-xs text-gray-300">
              "This bill prohibits local governments from using taxpayer funds for lobbying activities.
              Here's what it means for Dallas residents..."
            </p>
          </div>
        </div>
      </div>

      {/* Step 4: Building the Case */}
      <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
        <div className="text-center">
          {/* Timeline Node */}
          <div className="relative w-12 h-12 bg-green-500/20 border-4 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 mb-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 font-semibold text-sm">Step 5-6</span>
          </div>

          <h3 className="text-lg font-bold mb-3">Build the Case</h3>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            The chatbot provides compelling arguments and identifies the
            <strong className="text-white"> Policy Advocates Foundation</strong> as an ally.
            Alex discovers specific Dallas examples affecting property taxes.
          </p>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-300 mb-1">
                  <strong>Dallas impact:</strong> City lobbying for real estate disclosure could raise tax bills.
                </p>
                <p className="text-xs text-gray-400">
                  <strong>Ally:</strong> Policy Advocates Foundation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5: The Meeting Success */}
      <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
        <div className="text-center">
          {/* Timeline Node */}
          <div className="relative w-12 h-12 bg-blue-500/20 border-4 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-3 py-1 mb-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-300 font-semibold text-sm">The Meeting</span>
          </div>

          <h3 className="text-lg font-bold mb-3">Successful Meeting</h3>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            Armed with research and solutions, Alex meets Representative Hayes.
            The meeting transforms from constituent complaint to valuable collaboration.
          </p>

          <div className="bg-gray-900/50 border border-blue-800/50 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs text-blue-200 font-medium mb-1">Rep. Hayes:</p>
                <p className="text-xs text-gray-300 italic">
                  "This is incredibly helpful. I'm impressed with how well you know this issue."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6: Taking Action */}
      <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
        <div className="text-center">
          {/* Timeline Node */}
          <div className="relative w-12 h-12 bg-teal-500/20 border-4 border-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/30 rounded-full px-3 py-1 mb-3">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-teal-300 font-semibold text-sm">Taking Action</span>
          </div>

          <h3 className="text-lg font-bold mb-3">Civic Advocate</h3>
          <p className="text-gray-400 leading-relaxed mb-4 text-sm">
            Energized by success, Alex finds upcoming committee hearings to provide testimony.
            In just days, they've transformed from powerless taxpayer to effective civic advocate.
          </p>

          <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="font-semibold text-teal-300 text-xs">Complete</span>
            </div>
            <p className="text-xs text-gray-300">
              <strong>Result:</strong> From frustrated taxpayer to informed advocate with action plan and testimony opportunity.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

        {/* Section features */}
      <section id="features" className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Tools for
              <span className="text-teal-400"> Civic Engagement</span>
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to understand and engage with legislation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Analysis */}
            <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-colors">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Break down complex bills into clear, understandable summaries with key insights and implications.
              </p>
            </div>

            {/* Representative Finder */}
            <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Find Your Representatives</h3>
              <p className="text-gray-400 leading-relaxed">
                Instantly locate your local, state, and federal representatives with complete contact information.
              </p>
            </div>

            {/* Smart Search */}
            <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Intelligent Search</h3>
              <p className="text-gray-400 leading-relaxed">
                Discover relevant legislation using natural language queries and similarity matching.
              </p>
            </div>

            {/* Interactive Chat */}
            <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Interactive Guidance</h3>
              <p className="text-gray-400 leading-relaxed">
                Chat with AI to get personalized advice on civic engagement and advocacy strategies.
              </p>
            </div>

            {/* Document Analysis */}
            <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition-colors">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Document Deep Dive</h3>
              <p className="text-gray-400 leading-relaxed">
                Analyze bills section by section with contextual explanations and impact assessments.
              </p>
            </div>

            {/* Advocacy Tools */}
            <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/30 transition-colors">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Advocacy Support</h3>
              <p className="text-gray-400 leading-relaxed">
                Get guidance on effective communication strategies and tools for civic participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple Steps to
              <span className="text-teal-400"> Civic Engagement</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-400">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ask or Search</h3>
              <p className="text-gray-400">
                Start with a question about legislation or search for specific bills and topics.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get AI Analysis</h3>
              <p className="text-gray-400">
                Receive clear summaries, key insights, and understand the implications of legislation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-indigo-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Take Action</h3>
              <p className="text-gray-400">
                Connect with representatives and make informed decisions about civic participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
<section id="solution" className="py-16 border-t border-gray-800">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our
                <span className="text-teal-400"> AI-Powered</span> Solution
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
                A sophisticated infrastructure combining AI orchestration, external APIs, and
                retrieval-augmented generation to make legislation accessible to everyone.
            </p>
        </div>

        {/* Architecture Overview */}
        <div className="mb-16">
            <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-semibold mb-4">Intelligent Architecture</h3>
                    <p className="text-gray-400 max-w-3xl mx-auto">
                        Our system intelligently routes queries through either internal knowledge or external APIs,
                        ensuring accurate and comprehensive responses about legislation and civic data.
                    </p>
                </div>

                {/* Architecture Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
                    {/* User Layer */}
                    <div className="lg:col-span-1">
                        <div className="text-center p-6 rounded-2xl border border-teal-500/30 bg-teal-500/10">
                            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                </svg>
                            </div>
                            <h4 className="font-semibold text-teal-300">User</h4>
                            <p className="text-xs text-gray-400 mt-2">Query Input</p>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center lg:col-span-1">
                        <svg className="w-6 h-6 text-gray-600 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>

                    {/* Frontend & Backend */}
                    <div className="lg:col-span-1">
                        <div className="space-y-4">
                            <div className="text-center p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                    </svg>
                                </div>
                                <h5 className="text-sm font-semibold text-blue-300">React Frontend</h5>
                            </div>
                            <div className="text-center p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10">
                                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>
                                    </svg>
                                </div>
                                <h5 className="text-sm font-semibold text-indigo-300">FastAPI Backend</h5>
                            </div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center lg:col-span-1">
                        <svg className="w-6 h-6 text-gray-600 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>

                    {/* AI Orchestration */}
                    <div className="lg:col-span-1">
                        <div className="text-center p-6 rounded-2xl border border-purple-500/30 bg-purple-500/10">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                </svg>
                            </div>
                            <h4 className="font-semibold text-purple-300">LangGraph Agent</h4>
                            <p className="text-xs text-gray-400 mt-2">AI Dispatcher</p>
                        </div>
                    </div>
                </div>

                {/* Processing Paths */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Internal RAG Path */}
                    <div className="p-6 rounded-2xl border border-green-500/30 bg-green-500/5">
                        <h4 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Internal RAG Workflow
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-green-400">1</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Vector Database</p>
                                    <p className="text-xs text-gray-400">Similarity search on internal knowledge</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-green-400">2</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Ollama + LLaMA3</p>
                                    <p className="text-xs text-gray-400">Local inference with embeddings</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10">
                                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-green-400">3</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Context Synthesis</p>
                                    <p className="text-xs text-gray-400">Combines retrieved data with query</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* External API Path */}
                    <div className="p-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/5">
                        <h4 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                            </svg>
                            External API Workflow
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-cyan-400">1</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Google Civics API</p>
                                    <p className="text-xs text-gray-400">Representative & electoral data</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-cyan-400">2</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Wikipedia & Ballotpedia</p>
                                    <p className="text-xs text-gray-400">Legislative & political context</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-cyan-500/10">
                                <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-cyan-400">3</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Data Integration</p>
                                    <p className="text-xs text-gray-400">Combines external sources</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chunk Testing Framework */}
                    <div className="p-6 rounded-2xl border border-orange-500/30 bg-orange-500/5">
                        <h4 className="text-lg font-semibold text-orange-300 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                            Chunk Testing Framework
                        </h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10">
                                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-orange-400">1</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Strategy Testing</p>
                                    <p className="text-xs text-gray-400">Multiple chunking approaches</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10">
                                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-orange-400">2</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Embedding Evaluation</p>
                                    <p className="text-xs text-gray-400">Cosine similarity & retrieval metrics</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/10">
                                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                                    <span className="text-xs font-bold text-orange-400">3</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Performance Analytics</p>
                                    <p className="text-xs text-gray-400">F1 scores & execution metrics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Technical Stack */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <div className="text-center p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.471 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.87.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z"/>
                    </svg>
                </div>
                <p className="text-sm font-medium">React</p>
                <p className="text-xs text-gray-400">Frontend</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                </div>
                <p className="text-sm font-medium">FastAPI</p>
                <p className="text-xs text-gray-400">Backend</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                </div>
                <p className="text-sm font-medium">LangGraph</p>
                <p className="text-xs text-gray-400">AI Agent</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
                    </svg>
                </div>
                <p className="text-sm font-medium">Vector DB</p>
                <p className="text-xs text-gray-400">RAG Store</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </div>
                <p className="text-sm font-medium">LLaMA3</p>
                <p className="text-xs text-gray-400">LLM Model</p>
            </div>

            <div className="text-center p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                    </svg>
                </div>
                <p className="text-sm font-medium">External APIs</p>
                <p className="text-xs text-gray-400">Data Sources</p>
            </div>
        </div>
    </div>
</section>
      {/* CTA Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to Transform Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Civic Engagement?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands making informed decisions about legislation.
          </p>
          <button
            onClick={onGetStarted}
            className="px-12 py-6 bg-white text-black rounded-full text-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-sm text-gray-400">
            © 2025 LegislAItive. All rights reserved. Idea develop in the Dallas AI Summer Bootcamp.
          </div>
        </div>
      </footer>
    </div>
  );
};