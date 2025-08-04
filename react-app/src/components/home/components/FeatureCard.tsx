// components/home/components/FeatureCard.tsx
import React from 'react';

interface FeatureCardProps {
  feature: {
    icon: string;
    title: string;
    description: string;
    color: string;
  };
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      lightbulb: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      ),
      'map-pin': (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </>
      ),
      search: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      ),
      'message-circle': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      ),
      'file-text': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      ),
      award: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      )
    };
    return icons[iconName as keyof typeof icons] || icons.lightbulb;
  };

  return (
    <div className="group p-8 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105">
      <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-${feature.color}-500/30 transition-colors`}>
        <svg className={`w-6 h-6 text-${feature.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {getIcon(feature.icon)}
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};