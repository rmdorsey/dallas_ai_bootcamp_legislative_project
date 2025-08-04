import React, { useState, useEffect } from 'react';

interface BootcampInsightsPageProps {
  onBack: () => void;
}

export const BootcampInsightsPage: React.FC<BootcampInsightsPageProps> = ({ onBack }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animationStep, setAnimationStep] = useState(0);

  // Auto-animate elements
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const decisions = [
    {
      title: "Pivot Based on Expert Interviews",
      description: "Shifted focus after interviews with legislative experts, discovering the gap between complex legislation and citizen understanding.",
      icon: "🔄",
      color: "blue"
    },
    {
      title: "Build Foundation for Predictive Module",
      description: "Created architectural groundwork for future predictive capabilities despite time constraints using modular AI orchestration.",
      icon: "🏗️",
      color: "teal"
    },
    {
      title: "MVP Focus Over Feature Completeness",
      description: "Prioritized core legislative analysis capabilities and reliability over building every conceivable feature.",
      icon: "🎯",
      color: "green"
    }
  ];

  const learnings = [
    {
      title: "Agentic AI Integration Mastery",
      description: "Learned to seamlessly integrate multi-agent AI systems, master containerization with Docker, and bridge backend-frontend with RAG implementation.",
      icon: "🚀",
      color: "blue"
    },
    {
      title: "AI Testing & Framework Opportunities",
      description: "Discovered the lack of comprehensive AI testing tools and frameworks. Learning that strategies like chunking optimization significantly impact AI outcomes.",
      icon: "🧪",
      color: "teal"
    },
    {
      title: "Domain Expertise is Essential",
      description: "Legislative knowledge proved crucial for building credible AI tools that experts would trust and actually use.",
      icon: "⚖️",
      color: "green"
    }
  ];

  const slides = [
    { title: "Strategic Decisions", content: decisions, type: "decisions" },
    { title: "Key Learnings", content: learnings, type: "learnings" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xl font-bold hover:text-teal-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              legisl<span className="text-teal-400">AI</span>tive
            </button>
            <div className="flex items-center gap-4">
              <div className="text-gray-400">Bootcamp Insights</div>
              <div className="text-sm text-gray-500">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="h-full pt-16 flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-purple-500/10 via-black to-black py-12">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bootcamp
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                {' '}Insights
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Key decisions and learnings from building legislAItive during our AI Bootcamp journey
            </p>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 flex items-center">
          <div className="mx-auto max-w-7xl px-6 w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{slides[currentSlide].title}</h2>
              <div className="flex justify-center gap-2 mb-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-teal-400' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {slides[currentSlide].content.map((item, index) => (
                <div
                  key={index}
                  className={`
                    relative p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black
                    hover:border-gray-600 transition-all duration-500 transform hover:scale-105
                    ${animationStep === index ? 'ring-2 ring-opacity-50' : ''}
                    ${item.color === 'blue' && animationStep === index ? 'ring-blue-500' : ''}
                    ${item.color === 'teal' && animationStep === index ? 'ring-teal-500' : ''}
                    ${item.color === 'green' && animationStep === index ? 'ring-green-500' : ''}
                  `}
                >
                  {/* Icon */}
                  <div className={`
                    w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto
                    ${item.color === 'blue' ? 'bg-blue-500/20' : ''}
                    ${item.color === 'teal' ? 'bg-teal-500/20' : ''}
                    ${item.color === 'green' ? 'bg-green-500/20' : ''}
                  `}>
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`
                    text-xl font-bold mb-4 text-center
                    ${item.color === 'blue' ? 'text-blue-300' : ''}
                    ${item.color === 'teal' ? 'text-teal-300' : ''}
                    ${item.color === 'green' ? 'text-green-300' : ''}
                  `}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed text-center">
                    {item.description}
                  </p>

                  {/* Number indicator */}
                  <div className={`
                    absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${item.color === 'blue' ? 'bg-blue-500/20 text-blue-300' : ''}
                    ${item.color === 'teal' ? 'bg-teal-500/20 text-teal-300' : ''}
                    ${item.color === 'green' ? 'bg-green-500/20 text-green-300' : ''}
                  `}>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="pb-8">
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
              disabled={currentSlide === 0}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                {slides[currentSlide].title}
              </p>
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
              disabled={currentSlide === slides.length - 1}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BootcampInsightsPage;