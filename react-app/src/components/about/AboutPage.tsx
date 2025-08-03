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

  // Function to navigate back to home and scroll to specific section
  const navigateToHomeSection = (sectionId: string) => {
    onBackToHome(); // This should switch to the home page
    // Small delay to ensure the page has switched, then scroll to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
                <button
                  onClick={() => navigateToHomeSection('problem')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Problem
                </button>
                <button
                  onClick={() => navigateToHomeSection('features')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => navigateToHomeSection('how-it-works')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  How it Works
                </button>
                <button
                  onClick={() => navigateToHomeSection('solution')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Solution
                </button>
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
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Dallas AI Logo */}
            <div className="mb-8 flex justify-center">
              <img
                src="/DallasAI_Logo-blue.webp"
                alt="Dallas AI Logo"
                className="h-20 w-auto hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Born at the
              <a
                href="https://dallas-ai.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 transition-colors underline decoration-2 decoration-teal-400/50 hover:decoration-teal-300"
              >
                {" "}Dallas AI Summer Bootcamp
              </a>
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

      {/* Meet the Creators Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span className="text-gray-300">Meet the Creators</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Team Behind
              <span className="text-teal-400"> LegislAItive</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Three passionate developers united by a vision to democratize access to legislative information through AI.
            </p>
          </div>

          {/* Creators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Creator 1 - Angela Cortes */}
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-500/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-teal-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-teal-400">AC</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Angela Cortes</h3>
                <p className="text-teal-400 mb-4">Lead Developer</p>
                <a
                  href="https://www.linkedin.com/in/angela-cortes-pabon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Bio</h4>
                  <p className="leading-relaxed">
                    [Add Angela's bio here - passion for civic tech, background, what drives her work]
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Experience</h4>
                  <p className="leading-relaxed">
                    [Add professional experience and key achievements]
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Education</h4>
                  <p className="leading-relaxed">
                    Dallas AI Summer Bootcamp, [Add other education details]
                  </p>
                </div>
              </div>
            </div>

            {/* Creator 2 */}
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-blue-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-400">[XX]</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">[Creator 2 Name]</h3>
                <p className="text-blue-400 mb-4">[Role/Title]</p>
                <a
                  href="[LinkedIn URL]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Bio</h4>
                  <p className="leading-relaxed">
                    [Add Creator 2's bio here]
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Experience</h4>
                  <p className="leading-relaxed">
                    [Add professional experience and key achievements]
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Education</h4>
                  <p className="leading-relaxed">
                    Dallas AI Summer Bootcamp, [Add other education details]
                  </p>
                </div>
              </div>
            </div>

            {/* Creator 3 */}
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-purple-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-400">[XX]</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">[Creator 3 Name]</h3>
                <p className="text-purple-400 mb-4">[Role/Title]</p>
                <a
                  href="[LinkedIn URL]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
              <div className="space-y-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Bio</h4>
                  <p className="leading-relaxed">
                    [Add Creator 3's bio here]
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Experience</h4>
                  <p className="leading-relaxed">
                    [Add professional experience and key achievements]
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Education</h4>
                  <p className="leading-relaxed">
                    Dallas AI Summer Bootcamp, [Add other education details]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Leader Section */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                <span className="text-gray-300">Meet the Leader</span>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our
              <span className="text-amber-400"> Guiding Force</span>
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              The visionary leader who guided our team through the Dallas AI Summer Bootcamp journey.
            </p>
          </div>

          {/* Leader Profile */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Leader Image */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 text-center">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-amber-500/30 flex items-center justify-center">
                      <span className="text-4xl font-bold text-amber-400">[XX]</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">[Leader Name]</h3>
                  <p className="text-amber-400 mb-4">[Leader Title/Role]</p>
                  <div className="flex justify-center">
                    <a
                      href="[LinkedIn URL]"
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

              {/* Leader Bio Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
                  <h2 className="text-3xl font-bold mb-6 text-amber-400">Leadership & Vision</h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      [Add leader's bio here - their vision, leadership philosophy, and how they guided the team]
                    </p>
                    <p>
                      [Include their role in the Dallas AI Summer Bootcamp and how they mentored the team]
                    </p>
                    <p>
                      [Add what makes them an exceptional leader and their contribution to the project]
                    </p>
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