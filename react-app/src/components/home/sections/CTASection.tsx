// components/home/sections/CTASection.tsx
import React from 'react';

interface CTASectionProps {
  onGetStarted: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onGetStarted }) => {
  return (
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
  );
};