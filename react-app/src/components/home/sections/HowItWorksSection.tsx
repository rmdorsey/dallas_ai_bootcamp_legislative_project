// components/home/sections/HowItWorksSection.tsx
import React from 'react';
import { howItWorksSteps } from '../data/homePageData';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple Steps to
            <span className="text-teal-400"> Civic Engagement</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {howItWorksSteps.map((step) => (
            <div key={step.number} className="text-center">
              <div className={`w-16 h-16 bg-${step.color}-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                <span className={`text-2xl font-bold text-${step.color}-400`}>{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};