// components/home/HomePage.tsx
import React from 'react';

interface HomePageProps {
  onGetStarted: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold">
                legisl<span className="text-teal-400">AI</span>tive
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm">
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </a>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                  How it Works
                </a>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
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

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={onGetStarted}
                className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                Start Analyzing Bills
              </button>
              <button className="w-full md:w-auto px-8 py-4 border border-gray-600 rounded-full text-lg font-semibold hover:border-gray-400 transition-colors">
                Watch Demo
              </button>
            </div>

            {/* Demo Preview */}
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

                {/* Mock Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
                  <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm font-semibold mb-2">Recent Analysis</div>
                      <div className="space-y-2">
                        <div className="bg-gray-700/50 rounded p-2 text-xs">HR-1234: Climate Action</div>
                        <div className="bg-gray-700/50 rounded p-2 text-xs">SB-567: Infrastructure</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="bg-gray-800/50 rounded-lg p-4 h-48">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-sm font-bold">AI</div>
                        <div className="text-sm">
                          <div className="font-semibold">AI Assistant</div>
                          <div className="text-gray-400 text-xs">Legislative Analysis</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-300 leading-relaxed">
                        "I found 3 bills related to climate policy. The most relevant is HR-1234 which
                        establishes new renewable energy standards..."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 border-t border-gray-800">
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
      <section id="how-it-works" className="py-32 border-t border-gray-800">
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
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Take Action</h3>
              <p className="text-gray-400">
                Connect with representatives and make informed decisions about civic participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-gray-800">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="text-2xl font-bold mb-4">
                legisl<span className="text-teal-400">AI</span>tive
              </div>
              <p className="text-gray-400 text-sm">
                Making democracy accessible through AI-powered legislative analysis.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>Documentation</div>
                <div>Help Center</div>
                <div>Community</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <div>About</div>
                <div>Contact</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-400">
            © 2025 LegislAItive. All rights reserved. Empowering democracy through technology.
          </div>
        </div>
      </footer>
    </div>
  );
};