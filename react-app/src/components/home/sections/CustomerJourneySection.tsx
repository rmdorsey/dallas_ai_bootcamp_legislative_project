// components/home/sections/CustomerJourneySection.tsx
import React from 'react';
import { JourneyStep } from '../components/JourneyStep';
import { journeySteps } from '../data/homePageData';

export const CustomerJourneySection: React.FC = () => {
  return (
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
          {journeySteps.map((step) => (
            <JourneyStep key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};