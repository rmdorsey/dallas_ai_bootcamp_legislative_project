// components/common/NavigationBar.tsx
import React from 'react';

interface NavigationBarProps {
  onGetStarted: () => void;
  onAboutClick: () => void;
  onHomeClick?: () => void; // Optional for Login page
  onSectionClick?: (sectionId: string) => void; // New prop for section navigation
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  onGetStarted,
  onAboutClick,
  onHomeClick,
  onSectionClick
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    if (onHomeClick) {
      onHomeClick(); // Use onHomeClick if provided (Login page or About page)
    } else {
      scrollToTop(); // Use scrollToTop if not provided (HomePage)
    }
  };

  const handleAboutClick = () => {
    onAboutClick(); // Navigate to About page
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleSectionClick = (sectionId: string) => {
    // Always use the callback if provided (works for both HomePage and AboutPage)
    if (onSectionClick) {
      onSectionClick(sectionId);
    } else {
      // Fallback for backwards compatibility if no callback provided
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
              <button
                onClick={() => handleSectionClick('problem')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Problem
              </button>
              <button
                onClick={() => handleSectionClick('customer-journey')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Customer Journey
              </button>
              <button
                onClick={() => handleSectionClick('features')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => handleSectionClick('how-it-works')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                How it Works
              </button>
              <button
                onClick={() => handleSectionClick('solution')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Solution
              </button>
              <button
                onClick={() => handleSectionClick('architecture-details')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Architecture
              </button>
              <button
                onClick={handleAboutClick}
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