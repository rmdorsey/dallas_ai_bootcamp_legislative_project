// components/home/components/JourneyStep.tsx
import React from 'react';

interface JourneyStepProps {
  step: {
    id: string;
    title: string;
    badge: {
      text: string;
      color: string;
      bgColor: string;
      borderColor: string;
      textColor: string;
    };
    description: string;
    icon: string;
    quote?: string;
    quoteAuthor?: string;
    chatResponse?: {
      text: string;
      details: {
        phone: string;
        email: string;
        office: string;
      };
    };
    billInfo?: {
      title: string;
      description: string;
    };
    impact?: {
      dallas: string;
      ally: string;
    };
    result?: string;
  };
}

export const JourneyStep: React.FC<JourneyStepProps> = ({ step }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      warning: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 15.5c-.77.833.192 2.5 1.732 2.5z"/>
      ),
      location: (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </>
      ),
      document: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      ),
      users: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857"/>
      ),
      chat: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
      ),
      star: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      )
    };
    return icons[iconName as keyof typeof icons] || icons.warning;
  };

  const renderContent = () => {
    if (step.quote && step.quoteAuthor) {
      return (
        <div className={`bg-gray-900/50 border border-gray-800 rounded-xl p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 bg-${step.badge.color}-500/20 rounded-full flex items-center justify-center`}>
              <svg className={`w-3 h-3 text-${step.badge.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getIcon(step.icon)}
              </svg>
            </div>
            <span className={`font-semibold text-${step.badge.color}-300 text-xs`}>{step.quoteAuthor}</span>
          </div>
          <p className="text-xs text-gray-300 italic">
            {step.quote}
          </p>
        </div>
      );
    }

    if (step.chatResponse) {
      return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xs font-bold text-teal-400">AI</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-300 mb-2">
                {step.chatResponse.text}
              </p>
              <div className="bg-gray-800/50 rounded-lg p-2 text-xs">
                <div className="space-y-1 text-gray-400">
                  <div>📞 {step.chatResponse.details.phone}</div>
                  <div>📧 {step.chatResponse.details.email}</div>
                  <div>🏛️ {step.chatResponse.details.office}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (step.billInfo) {
      return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 bg-${step.badge.color}-500/20 rounded-full flex items-center justify-center`}>
              <svg className={`w-3 h-3 text-${step.badge.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getIcon(step.icon)}
              </svg>
            </div>
            <span className={`font-semibold text-${step.badge.color}-300 text-xs`}>{step.billInfo.title}</span>
          </div>
          <p className="text-xs text-gray-300">
            {step.billInfo.description}
          </p>
        </div>
      );
    }

    if (step.impact) {
      return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-3">
          <div className="flex items-start gap-2">
            <div className={`w-6 h-6 bg-${step.badge.color}-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
              <svg className={`w-3 h-3 text-${step.badge.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {getIcon(step.icon)}
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-300 mb-1">
                <strong>Dallas impact:</strong> {step.impact.dallas}
              </p>
              <p className="text-xs text-gray-400">
                <strong>Ally:</strong> {step.impact.ally}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (step.result) {
      return (
        <div className={`bg-gradient-to-r from-${step.badge.color}-500/10 to-blue-500/10 border border-${step.badge.color}-500/30 rounded-xl p-3`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-6 h-6 bg-${step.badge.color}-500/20 rounded-full flex items-center justify-center`}>
              <svg className={`w-3 h-3 text-${step.badge.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className={`font-semibold text-${step.badge.color}-300 text-xs`}>Complete</span>
          </div>
          <p className="text-xs text-gray-300">
            <strong>Result:</strong> {step.result}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="relative flex-shrink-0 lg:w-64 mb-8 lg:mb-0">
      <div className="text-center">
        {/* Timeline Node */}
        <div className={`relative w-12 h-12 bg-${step.badge.color}-500/20 border-4 border-${step.badge.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <svg className={`w-5 h-5 text-${step.badge.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {getIcon(step.icon)}
          </svg>
        </div>

        <div className={`inline-flex items-center gap-2 bg-${step.badge.bgColor} border border-${step.badge.borderColor} rounded-full px-3 py-1 mb-3`}>
          <div className={`w-2 h-2 bg-${step.badge.color}-400 rounded-full animate-pulse`}></div>
          <span className={`text-${step.badge.textColor} font-semibold text-sm`}>{step.badge.text}</span>
        </div>

        <h3 className="text-lg font-bold mb-3">{step.title}</h3>
        <p className="text-gray-400 leading-relaxed mb-4 text-sm">
          {step.description}
        </p>

        {renderContent()}
      </div>
    </div>
  );
};