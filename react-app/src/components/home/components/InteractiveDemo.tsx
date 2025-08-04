// components/home/components/InteractiveDemo.tsx
import React from 'react';
import { demoData } from '../data/homePageData';

interface InteractiveDemoProps {
  activeDemo: 'climate' | 'infrastructure' | 'healthcare' | 'education';
  onDemoClick: (demo: 'climate' | 'infrastructure' | 'healthcare' | 'education') => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ activeDemo, onDemoClick }) => {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-500">legislAItive.app</div>
        </div>

        {/* Interactive Mock Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="text-sm font-semibold mb-2">Recent Analysis</div>
              <div className="space-y-2">
                <button
                  onClick={() => onDemoClick('climate')}
                  className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                    activeDemo === 'climate' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                  }`}
                >
                  HR-1234: Climate Action
                </button>
                <button
                  onClick={() => onDemoClick('infrastructure')}
                  className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                    activeDemo === 'infrastructure' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                  }`}
                >
                  SB-567: Infrastructure
                </button>
                <button
                  onClick={() => onDemoClick('healthcare')}
                  className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                    activeDemo === 'healthcare' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                  }`}
                >
                  HR-890: Healthcare Reform
                </button>
                <button
                  onClick={() => onDemoClick('education')}
                  className={`w-full bg-gray-700/50 rounded p-2 text-xs text-left transition-all duration-200 hover:bg-gray-600/50 ${
                    activeDemo === 'education' ? 'ring-2 ring-teal-500 bg-teal-900/30' : ''
                  }`}
                >
                  SB-223: Education Funding
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-lg p-6 h-64">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-sm font-bold">AI</div>
                <div className="text-sm">
                  <div className="font-semibold">AI Assistant</div>
                  <div className="text-gray-400 text-xs">Legislative Analysis</div>
                </div>
              </div>
              <div className="text-sm text-gray-300 leading-relaxed">
                <div className="bg-gray-700/30 rounded-lg p-3 mb-3 border-l-4 border-teal-500">
                  <div className="text-gray-400 text-xs mb-1">Analyzing: {demoData[activeDemo].title}</div>
                </div>
                <div className="animate-fade-in">
                  "{demoData[activeDemo].response}"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive indicator */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span>Auto-cycling every 30s • Click bills to explore manually</span>
          </div>
        </div>
      </div>
    </div>
  );
};