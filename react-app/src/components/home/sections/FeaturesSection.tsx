// components/home/sections/FeaturesSection.tsx
import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { features } from '../data/homePageData';

export const FeaturesSection: React.FC = () => {
  return (
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
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};