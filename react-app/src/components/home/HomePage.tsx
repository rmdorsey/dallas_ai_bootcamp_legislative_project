// components/home/HomePage.tsx - Refactored Main Container
import React from 'react';
import { NavigationBar } from '../common/NavigationBar';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { CustomerJourneySection } from './sections/CustomerJourneySection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { SolutionSection } from './sections/SolutionSection';
import { CTASection } from './sections/CTASection';
import { Footer } from '../common/Footer';

interface HomePageProps {
  onGetStarted: () => void;
  onAboutClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted, onAboutClick }) => {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationBar onGetStarted={onGetStarted} onAboutClick={onAboutClick} />
      <HeroSection />
      <ProblemSection />
      <CustomerJourneySection />
      <FeaturesSection />
      <HowItWorksSection />
      <SolutionSection />
      <CTASection onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
};