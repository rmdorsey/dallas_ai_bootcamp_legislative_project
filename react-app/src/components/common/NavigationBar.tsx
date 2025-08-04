// components/common/NavigationBar.tsx
import React from 'react';

interface NavigationBarProps {
  onGetStarted: () => void;
  onAboutClick: () => void;
  onHomeClick?: () => void; // Optional for Login page
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onGetStarted,
  onAboutClick,
  onHomeClick
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    if (onHomeClick) {
      onHomeClick(); // Use onHomeClick if provided (Login page)
    } else {
      scrollToTop(); // Use scrollToTop if not provided (HomePage)
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={handleLogoClick}
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
  );
};