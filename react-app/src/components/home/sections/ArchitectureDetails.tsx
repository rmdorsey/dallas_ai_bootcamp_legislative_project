// components/home/sections/ArchitectureDetails.tsx
import React, { useState } from 'react';

export const ArchitectureDetails: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = [
    {
      id: 'presentation',
      title: 'Presentation Layer',
      subtitle: 'Clean & Responsive Interface',
      description: 'Modern React application providing an intuitive user experience where citizens can ask questions about legislation in natural language.',
      color: 'teal',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      details: [
        'Responsive React Components',
        'Real-time Query Interface',
        'Interactive Results Display',
        'Mobile-First Design'
      ]
    },
    {
      id: 'backend',
      title: 'Backend Services Layer',
      subtitle: 'High-Performance API Gateway',
      description: 'FastAPI application serving as the central nervous system, intelligently routing queries to specialized agent endpoints.',
      color: 'blue',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>
        </svg>
      ),
      details: [
        'FastAPI Framework',
        'Intelligent Query Routing',
        'RESTful API Endpoints',
        'Request/Response Management'
      ]
    },
    {
      id: 'orchestration',
      title: 'AI Orchestration Layer',
      subtitle: 'The Brain of the System',
      description: 'LangGraph-powered intelligent agent system that deploys specialized agents based on query type and complexity.',
      color: 'cyan',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
      details: [
        'LangGraph Framework',
        'Multi-Agent Coordination',
        'Dynamic Tool Selection',
        'Context-Aware Routing'
      ]
    },
    {
      id: 'inference',
      title: 'Inference & Generation Layer',
      subtitle: 'Language Model Processing',
      description: 'Powerful LLaMA 3 model served via Ollama that synthesizes retrieved information into coherent, human-readable responses.',
      color: 'orange',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7"/>
        </svg>
      ),
      details: [
        'LLaMA 3 Model',
        'Ollama Integration',
        'Context Synthesis',
        'Natural Language Generation'
      ]
    }
  ];

  const agents = [
    {
      name: 'ReAct Agent',
      type: 'Intelligent Dispatcher',
      description: 'Versatile agent for general overview requests with access to multiple tools and data sources.',
      tools: [
        { name: 'PostgreSQL Database', purpose: 'Legislator Information' },
        { name: 'Google Civics API', purpose: 'Representative Districts' },
        { name: 'Multi-Tool Orchestration', purpose: 'Complex Queries' }
      ],
      color: 'blue'
    },
    {
      name: 'Tool-Calling Agent',
      type: 'Deep Analysis Specialist',
      description: 'Focused agent for detailed legislative analysis using semantic search capabilities.',
      tools: [
        { name: 'ChromaDB Vector Store', purpose: 'Legislative Bill Texts' },
        { name: 'Semantic Search', purpose: 'Content Analysis' },
        { name: 'Expert Analysis', purpose: 'Detailed Insights' }
      ],
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400',
      blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
      orange: 'bg-orange-500/10 border-orange-500/30 text-orange-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.teal;
  };

  return (
    <section id="architecture-details" className="py-20 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Architecture
            <span className="text-teal-400"> Deep Dive</span>
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            A modern decoupled microservices architecture designed for power, efficiency, and scalability.
            Follow the journey of a user's query through our intelligent system.
          </p>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="mb-20">
          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">System Architecture Flow</h3>

            {/* Architecture PNG */}
            <div className="mb-12 text-center">
              <img
                src="/arch.png"
                alt="System Architecture Diagram"
                className="mx-auto max-w-full h-auto rounded-xl border border-gray-700 shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Interactive Layer Details */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Architecture Layers</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {layers.map((layer) => (
              <div
                key={layer.id}
                className={`rounded-2xl border p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  activeLayer === layer.id
                    ? `${getColorClasses(layer.color)} shadow-lg`
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                }`}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(layer.color)} mr-4`}>
                    {layer.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{layer.title}</h4>
                    <p className="text-sm text-gray-400">{layer.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {layer.description}
                </p>

                {activeLayer === layer.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h5 className="font-medium mb-3 text-white">Key Features:</h5>
                    <ul className="space-y-2">
                      {layer.details.map((detail, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center">
                          <div className={`w-2 h-2 rounded-full ${getColorClasses(layer.color)} mr-3`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Agents Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Intelligent Agent System</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {agents.map((agent, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-8 ${getColorClasses(agent.color)}`}
              >
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-2">{agent.name}</h4>
                  <p className="text-lg font-medium opacity-80 mb-4">{agent.type}</p>
                  <p className="text-gray-300 leading-relaxed">{agent.description}</p>
                </div>

                <div>
                  <h5 className="font-semibold mb-4 text-white">Available Tools:</h5>
                  <div className="space-y-3">
                    {agent.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex justify-between items-center p-3 rounded-lg bg-black/20">
                        <span className="font-medium">{tool.name}</span>
                        <span className="text-sm opacity-75">{tool.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};