// components/home/HomePage.tsx - Refactored Main Container
import React from 'react';
import { NavigationBar } from '../common/NavigationBar';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { CustomerJourneySection } from './sections/CustomerJourneySection';
import { FeaturesSection } from './sections/FeaturesSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { SolutionSection } from './sections/SolutionSection';
import { ArchitectureDetails } from './sections/ArchitectureDetails';
import { CTASection } from './sections/CTASection';
import { Footer } from '../common/Footer';

interface HomePageProps {
  onGetStarted: () => void;
  onAboutClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGetStarted, onAboutClick }) => {
  // Handle section navigation for HomePage
  const handleSectionClick = (sectionId: string) => {
    // Small delay to ensure any page transitions are complete
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <NavigationBar
        onGetStarted={onGetStarted}
        onAboutClick={onAboutClick}
        onSectionClick={handleSectionClick}
      />
      <HeroSection />
      <ProblemSection />
      <CustomerJourneySection />
      <FeaturesSection />
      <HowItWorksSection />
      <SolutionSection />
      <ArchitectureDetails />
      <CTASection onGetStarted={onGetStarted} />
      <Footer />
    </div>
  );
};