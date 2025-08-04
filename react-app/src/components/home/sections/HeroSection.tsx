// components/home/sections/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { InteractiveDemo } from '../components/InteractiveDemo';
import { demoData } from '../data/homePageData';

export const HeroSection: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'climate' | 'infrastructure' | 'healthcare' | 'education'>('climate');

  // Auto-cycle through demos every 10 seconds
  useEffect(() => {
    const demoKeys = Object.keys(demoData) as Array<keyof typeof demoData>;

    const interval = setInterval(() => {
      setActiveDemo(prevDemo => {
        const currentIndex = demoKeys.indexOf(prevDemo);
        const nextIndex = (currentIndex + 1) % demoKeys.length;
        return demoKeys[nextIndex];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDemoClick = (demo: keyof typeof demoData) => {
    setActiveDemo(demo);
  };

  return (
    <section className="relative overflow-hidden pt-36 pb-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-black to-black"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/50 px-4 py-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <span className="text-gray-300">Making Democracy Accessible</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="mb-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Legislation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
              Made Legible
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Transform complex legislation into clear insights with AI-powered analysis.
            Find your representatives, understand bills, and make your voice heard.
          </p>

          {/* Watch Demo Button */}
          <div className="mb-12">
            <button
              onClick={() => window.open('https://www.youtube.com/watch?v=nhg2P_Mksas', '_blank')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-lg font-semibold hover:from-red-700 hover:to-red-800 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Interactive Demo Preview */}
          <InteractiveDemo
            activeDemo={activeDemo}
            onDemoClick={handleDemoClick}
          />
        </div>
      </div>
    </section>
  );
};