import React, { useState, useEffect } from 'react';

interface ArchitecturePageProps {
  onBack: () => void;
}

export const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack }) => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  // Auto-animate the data flow
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const layers = {
    presentation: {
      title: "Presentation Layer",
      description: "Clean and responsive React application where users ask their questions",
      color: "teal",
      components: ["React Frontend", "User Interface"]
    },
    backend: {
      title: "Backend Services Layer",
      description: "High-performance FastAPI application acting as the central API gateway",
      color: "blue",
      components: ["FastAPI Gateway", "Agent Endpoints"]
    },
    orchestration: {
      title: "AI Orchestration Layer",
      description: "The brain of our system, powered by LangGraph with specialized agents",
      color: "purple",
      components: ["ReAct Agent", "Tool-Calling Agent", "LangGraph Router"]
    },
    tools: {
      title: "Tool Layer",
      description: "Specialized capabilities for different types of queries and data access",
      color: "green",
      components: ["Google Civics API", "PostgreSQL DB", "ChromaDB Vector Store"]
    },
    inference: {
      title: "Inference & Generation Layer",
      description: "Powerful Llama3 model synthesizes context into human-readable answers",
      color: "orange",
      components: ["Ollama Server", "Llama3 Model", "Response Synthesis"]
    }
  };

  const dataFlow = [
    { from: "User Query", to: "React Frontend", step: 0 },
    { from: "React Frontend", to: "FastAPI Gateway", step: 1 },
    { from: "FastAPI Gateway", to: "LangGraph Agents", step: 2 },
    { from: "LangGraph Agents", to: "Data Sources", step: 3 },
    { from: "Data Sources", to: "Llama3 Model", step: 4 },
    { from: "Llama3 Model", to: "User Response", step: 5 }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
            <div className="text-gray-400">System Architecture</div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-black to-black"></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              System
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                {' '}Architecture
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A modern, decoupled microservices architecture that transforms complex legislative queries
              into clear, actionable insights through intelligent AI orchestration.
            </p>
          </div>

          {/* Architecture Flow Overview */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Journey of a Query</h2>
              <p className="text-gray-400 max-w-3xl mx-auto">
                Follow the intelligent path your questions take through our sophisticated system
              </p>
            </div>

            {/* Animated Data Flow */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                {dataFlow.map((flow, index) => (
                  <div key={index} className="text-center">
                    <div className={`
                      p-4 rounded-xl border transition-all duration-500
                      ${animationStep === flow.step 
                        ? 'border-teal-500 bg-teal-500/20 shadow-lg shadow-teal-500/25' 
                        : 'border-gray-800 bg-gray-900/50'
                      }
                    `}>
                      <div className={`
                        w-3 h-3 rounded-full mx-auto mb-2 transition-all duration-500
                        ${animationStep === flow.step ? 'bg-teal-400 animate-pulse' : 'bg-gray-600'}
                      `}></div>
                      <p className="text-sm font-medium">{flow.from}</p>
                    </div>
                    {index < dataFlow.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2"
                           style={{left: `${(index + 1) * 16.66 - 1}%`}}>
                        <svg className={`w-6 h-6 transition-colors duration-500 ${
                          animationStep >= flow.step ? 'text-teal-400' : 'text-gray-600'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Architecture Layers */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Architecture Layers</h2>
            <p className="text-xl text-gray-400">
              Each layer serves a specific purpose in our intelligent system
            </p>
          </div>

          <div className="space-y-12">
            {Object.entries(layers).map(([key, layer], index) => (
              <div
                key={key}
                className={`
                  group relative p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black
                  hover:border-gray-600 transition-all duration-300 cursor-pointer
                  ${activeLayer === key ? 'ring-2 ring-teal-500/50 bg-teal-500/5' : ''}
                `}
                onClick={() => setActiveLayer(activeLayer === key ? null : key)}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* Layer Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center
                        ${layer.color === 'teal' ? 'bg-teal-500/20' : ''}
                        ${layer.color === 'blue' ? 'bg-blue-500/20' : ''}
                        ${layer.color === 'purple' ? 'bg-purple-500/20' : ''}
                        ${layer.color === 'green' ? 'bg-green-500/20' : ''}
                        ${layer.color === 'orange' ? 'bg-orange-500/20' : ''}
                      `}>
                        <span className="text-2xl font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className={`
                          text-2xl font-bold
                          ${layer.color === 'teal' ? 'text-teal-300' : ''}
                          ${layer.color === 'blue' ? 'text-blue-300' : ''}
                          ${layer.color === 'purple' ? 'text-purple-300' : ''}
                          ${layer.color === 'green' ? 'text-green-300' : ''}
                          ${layer.color === 'orange' ? 'text-orange-300' : ''}
                        `}>
                          {layer.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {layer.description}
                    </p>

                    {/* Components */}
                    <div className="flex flex-wrap gap-2">
                      {layer.components.map((component, idx) => (
                        <span
                          key={idx}
                          className={`
                            px-3 py-1 rounded-full text-sm border
                            ${layer.color === 'teal' ? 'border-teal-500/30 bg-teal-500/10 text-teal-300' : ''}
                            ${layer.color === 'blue' ? 'border-blue-500/30 bg-blue-500/10 text-blue-300' : ''}
                            ${layer.color === 'purple' ? 'border-purple-500/30 bg-purple-500/10 text-purple-300' : ''}
                            ${layer.color === 'green' ? 'border-green-500/30 bg-green-500/10 text-green-300' : ''}
                            ${layer.color === 'orange' ? 'border-orange-500/30 bg-orange-500/10 text-orange-300' : ''}
                          `}
                        >
                          {component}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual Representation */}
                  <div className="lg:col-span-1">
                    <div className={`
                      relative p-6 rounded-2xl border-2 border-dashed transition-all duration-300
                      ${layer.color === 'teal' ? 'border-teal-500/30 bg-teal-500/5' : ''}
                      ${layer.color === 'blue' ? 'border-blue-500/30 bg-blue-500/5' : ''}
                      ${layer.color === 'purple' ? 'border-purple-500/30 bg-purple-500/5' : ''}
                      ${layer.color === 'green' ? 'border-green-500/30 bg-green-500/5' : ''}
                      ${layer.color === 'orange' ? 'border-orange-500/30 bg-orange-500/5' : ''}
                      ${activeLayer === key ? 'animate-pulse' : ''}
                    `}>
                      <div className="text-center">
                        <div className={`
                          w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center
                          ${layer.color === 'teal' ? 'bg-teal-500/20' : ''}
                          ${layer.color === 'blue' ? 'bg-blue-500/20' : ''}
                          ${layer.color === 'purple' ? 'bg-purple-500/20' : ''}
                          ${layer.color === 'green' ? 'bg-green-500/20' : ''}
                          ${layer.color === 'orange' ? 'bg-orange-500/20' : ''}
                        `}>
                          {key === 'presentation' && (
                            <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                          )}
                          {key === 'backend' && (
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>
                            </svg>
                          )}
                          {key === 'orchestration' && (
                            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                          )}
                          {key === 'tools' && (
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                            </svg>
                          )}
                          {key === 'inference' && (
                            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                          )}
                        </div>
                        <p className={`
                          text-sm font-medium
                          ${layer.color === 'teal' ? 'text-teal-300' : ''}
                          ${layer.color === 'blue' ? 'text-blue-300' : ''}
                          ${layer.color === 'purple' ? 'text-purple-300' : ''}
                          ${layer.color === 'green' ? 'text-green-300' : ''}
                          ${layer.color === 'orange' ? 'text-orange-300' : ''}
                        `}>
                          Layer {index + 1}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {activeLayer === key && (
                  <div className="mt-8 pt-8 border-t border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {key === 'presentation' && (
                        <>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-teal-300 mb-2">React Components</h4>
                            <p className="text-sm text-gray-400">Modular, reusable UI components for consistent user experience</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-teal-300 mb-2">State Management</h4>
                            <p className="text-sm text-gray-400">Efficient state handling for real-time UI updates</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-teal-300 mb-2">Responsive Design</h4>
                            <p className="text-sm text-gray-400">Optimized for desktop, tablet, and mobile devices</p>
                          </div>
                        </>
                      )}
                      {key === 'backend' && (
                        <>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-blue-300 mb-2">FastAPI Framework</h4>
                            <p className="text-sm text-gray-400">High-performance, async API with automatic documentation</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-blue-300 mb-2">Request Routing</h4>
                            <p className="text-sm text-gray-400">Intelligent routing to appropriate AI agents</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-blue-300 mb-2">Error Handling</h4>
                            <p className="text-sm text-gray-400">Robust error handling and response validation</p>
                          </div>
                        </>
                      )}
                      {key === 'orchestration' && (
                        <>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-purple-300 mb-2">LangGraph Framework</h4>
                            <p className="text-sm text-gray-400">State-of-the-art agent orchestration and workflow management</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-purple-300 mb-2">ReAct Agent</h4>
                            <p className="text-sm text-gray-400">General-purpose agent for reasoning and acting</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-purple-300 mb-2">Tool-Calling Agent</h4>
                            <p className="text-sm text-gray-400">Specialized agent for deep legislative analysis</p>
                          </div>
                        </>
                      )}
                      {key === 'tools' && (
                        <>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-green-300 mb-2">Google Civics API</h4>
                            <p className="text-sm text-gray-400">Live representative and electoral district data</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-green-300 mb-2">PostgreSQL Database</h4>
                            <p className="text-sm text-gray-400">Structured legislator and political division data</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-green-300 mb-2">ChromaDB Vector Store</h4>
                            <p className="text-sm text-gray-400">Semantic search across legislative documents</p>
                          </div>
                        </>
                      )}
                      {key === 'inference' && (
                        <>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-orange-300 mb-2">Llama3 Model</h4>
                            <p className="text-sm text-gray-400">Advanced language model for context synthesis</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-orange-300 mb-2">Ollama Server</h4>
                            <p className="text-sm text-gray-400">Efficient local model serving and inference</p>
                          </div>
                          <div className="p-4 rounded-xl bg-gray-800/50">
                            <h4 className="font-semibold text-orange-300 mb-2">Response Generation</h4>
                            <p className="text-sm text-gray-400">Human-readable synthesis of complex information</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Technology Stack</h2>
            <p className="text-xl text-gray-400">
              Built with modern, scalable technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "React", icon: "⚛️", description: "Frontend Framework" },
              { name: "FastAPI", icon: "🚀", description: "Backend API" },
              { name: "LangGraph", icon: "🧠", description: "AI Orchestration" },
              { name: "Llama3", icon: "🦙", description: "Language Model" },
              { name: "ChromaDB", icon: "🔍", description: "Vector Database" },
              { name: "PostgreSQL", icon: "🐘", description: "Relational DB" },
              { name: "Docker", icon: "🐳", description: "Containerization" },
              { name: "Ollama", icon: "⚡", description: "Model Serving" },
              { name: "Google APIs", icon: "🌐", description: "External Data" },
              { name: "Python", icon: "🐍", description: "Backend Language" },
              { name: "TypeScript", icon: "📝", description: "Frontend Language" },
              { name: "Tailwind", icon: "🎨", description: "CSS Framework" }
            ].map((tech, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment & Scalability */}
      <section className="py-16 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Deployment &
              <span className="text-teal-400"> Scalability</span>
            </h2>
            <p className="text-xl text-gray-400">
              Containerized, portable, and ready to empower citizen advocates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Containerized Architecture</h3>
              <p className="text-gray-400">
                Fully containerized with Docker for consistent deployment across environments,
                from development to production.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">High Performance</h3>
              <p className="text-gray-400">
                Optimized for speed with async processing, efficient caching,
                and intelligent load balancing across components.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Citizen-Focused</h3>
              <p className="text-gray-400">
                Designed specifically to bridge the gap between complex legislation
                and citizen understanding and engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              Built with passion for democratic engagement •
              <button
                onClick={onBack}
                className="text-teal-400 hover:text-teal-300 transition-colors ml-2"
              >
                Back to Home
              </button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};