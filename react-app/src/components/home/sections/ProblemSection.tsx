// components/home/sections/ProblemSection.tsx
import React from 'react';

export const ProblemSection: React.FC = () => {
  const cycleSteps = [
    {
      title: 'Low Civic Literacy',
      description: 'Fewer than 20% of Americans can name their state legislators. You can\'t engage with people you can\'t name.',
      icon: 'question-mark-circle',
      color: 'blue-500'
    },
    {
      title: 'Overwhelming Complexity',
      description: 'Legislative text is dense and intimidating, designed for lawyers, not for the public.',
      icon: 'document-text',
      color: 'blue-600'
    },
    {
      title: 'Low Efficacy & Trust',
      description: '85% of Americans believe elected officials don\'t care what they think. "My voice doesn\'t matter."',
      icon: 'emoji-sad',
      color: 'gray-600'
    },
    {
      title: 'High Barriers to Action',
      description: 'People face overwhelming obstacles and rationally disengage from the democratic process.',
      icon: 'x-circle',
      color: 'gray-700'
    }
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      'question-mark-circle': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      ),
      'document-text': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      ),
      'emoji-sad': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      ),
      'x-circle': (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L12 21l-6.364-6.364M12 21l6.364-6.364M12 21V9m-6.364 9.364L12 21"/>
      )
    };
    return icons[iconName as keyof typeof icons] || icons['question-mark-circle'];
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      'blue-500': {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        title: 'text-blue-300',
        number: 'bg-blue-500/30 text-blue-300 border-blue-400/50'
      },
      'blue-600': {
        bg: 'bg-blue-600/20',
        text: 'text-blue-300',
        title: 'text-blue-200',
        number: 'bg-blue-600/30 text-blue-200 border-blue-300/50'
      },
      'gray-600': {
        bg: 'bg-gray-600/20',
        text: 'text-gray-400',
        title: 'text-gray-400',
        number: 'bg-gray-600/30 text-gray-300 border-gray-400/50'
      },
      'gray-700': {
        bg: 'bg-gray-700/20',
        text: 'text-gray-400',
        title: 'text-gray-400',
        number: 'bg-gray-700/30 text-gray-300 border-gray-400/50'
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap['blue-500'];
  };

  return (
    <section id="problem" className="py-16 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The
            <span className="text-blue-400"> Crisis</span> We're Solving
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            There's a fundamental crisis facing our country: a growing disconnect between
            the American people and the governments that serve them.
          </p>
        </div>

        {/* The Vicious Cycle */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">The Vicious Cycle of Civic Disengagement</h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              This isn't a crisis of apathy. It's a crisis of access and complexity,
              creating a cycle that weakens the foundation of our republic.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cycleSteps.map((step, index) => {
                const colors = getColorClasses(step.color);
                return (
                  <div
                    key={step.title}
                    className="relative z-10"
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300 hover:scale-105 animate-fade-in-up">
                      {/* Step Number */}
                      <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 ${colors.number} flex items-center justify-center text-sm font-bold`}>
                        {index + 1}
                      </div>

                      <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                        <svg className={`w-6 h-6 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {getIcon(step.icon)}
                        </svg>
                      </div>

                      <h4 className={`font-semibold mb-2 ${colors.title}`}>{step.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting Arrows */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0">
              <div className="flex justify-between items-center h-full px-6">
                {Array.from({ length: cycleSteps.length - 1 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 flex justify-end pr-3"
                    style={{
                      marginLeft: index === 0 ? 'calc(25% - 1.5rem)' : '0',
                      animationDelay: `${(index + 1) * 400}ms`
                    }}
                  >
                    <div className="text-gray-600 animate-fade-in">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cycle completion arrow (from last to first) */}
            <div className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 mt-8 animate-fade-in" style={{ animationDelay: '1600ms' }}>
              <div className="text-center">
                <div className="text-gray-600 mb-2">
                  <svg className="w-8 h-8 mx-auto transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium">The cycle continues...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};