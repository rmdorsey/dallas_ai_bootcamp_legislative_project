// components/about/AboutPage.tsx
import React from 'react';

interface AboutPageProps {
  onBackToHome: () => void;
  onGetStarted: () => void;
  onAboutClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onGetStarted, onAboutClick }) => {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-black to-black"></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">


            {/* Main Headline */}
            <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              About
              <br />
            </h1>

            {/* Subtitle */}
            <p className="mb-12 text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              We are passionate about making democracy accessible through technology and AI innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Dallas AI Bootcamp Section */}
      <section className="py-32 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Born at the
              <span className="text-teal-400"> Dallas AI Summer Bootcamp</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              LegislAItive was conceived and developed during the intensive Dallas AI Summer Bootcamp,
              where innovation meets practical application. This program provided the perfect environment
              to transform an idea into a working solution that could make a real difference in how people
              interact with their government.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-gray-400 text-sm">Applying cutting-edge AI to solve real-world civic challenges</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Collaboration</h3>
                <p className="text-gray-400 text-sm">Working with talented developers and AI enthusiasts</p>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Impact</h3>
                <p className="text-gray-400 text-sm">Creating tools that strengthen democratic participation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-gray-300">Meet the Creators</span>
              </div>
            </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image Placeholder */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-teal-500/30 flex items-center justify-center">
                      <span className="text-4xl font-bold text-teal-400">AC</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Angela Cortes</h3>
                  <p className="text-teal-400 mb-4">Creator & Developer</p>
                  <div className="flex justify-center">
                    <a
                      href="https://www.linkedin.com/in/angela-cortes-pabon/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-400">My Story</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Welcome! I'm Angela Cortes Pabon, the creator behind LegislAItive. My passion lies at the intersection of technology, democracy, and civic engagement.
                  </p>
                  <p>
                    [Note: Please replace this section with your actual bio from LinkedIn. Include your professional background, education, key experiences, and what drives your passion for civic technology.]
                  </p>
                  <p>
                    The idea for LegislAItive came from recognizing how difficult it can be for everyday citizens to understand complex legislation and engage meaningfully with the democratic process. I believe that AI can bridge this gap, making government more accessible and transparent for everyone.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
                <h2 className="text-3xl font-bold mb-6 text-teal-400">Professional Background</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    [Please add your professional experience, key skills, and notable achievements from your LinkedIn profile here.]
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Key Skills</h4>
                      <div className="space-y-1 text-sm">
                        <div>• AI & Machine Learning</div>
                        <div>• Full-Stack Development</div>
                        <div>• Civic Technology</div>
                        <div>• Product Strategy</div>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="font-semibold text-white mb-2">Education</h4>
                      <div className="space-y-1 text-sm">
                        <div>• Dallas AI Summer Bootcamp</div>
                        <div>• [Add your education details]</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Let's Connect &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Build Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Interested in collaborating or learning more about civic tech? I'd love to hear from you.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/angela-cortes-pabon/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
            <button
              onClick={onBackToHome}
              className="px-8 py-4 border border-gray-600 rounded-full text-lg font-semibold hover:border-gray-400 transition-colors"
            >
              Back to LegislAItive
            </button>
          </div>
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