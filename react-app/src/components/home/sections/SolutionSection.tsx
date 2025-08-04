// components/home/sections/SolutionSection.tsx
import React from 'react';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { TechStackGrid } from '../components/TechStackGrid';

export const SolutionSection: React.FC = () => {
  return (
    <section id="solution" className="py-16 border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our
            <span className="text-teal-400"> AI-Powered</span> Solution
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            A sophisticated infrastructure combining AI orchestration, external APIs, and
            retrieval-augmented generation to make legislation accessible to everyone.
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="mb-16">
          <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Intelligent Architecture</h3>
              <p className="text-gray-400 max-w-3xl mx-auto">
                Our system intelligently routes queries through either internal knowledge or external APIs,
                ensuring accurate and comprehensive responses about legislation and civic data.
              </p>
            </div>

            <ArchitectureFlow />

            {/* Processing Paths */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ReAct Agent Path */}
              <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5">
                <h4 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  ReAct Agent Workflow
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">PostgreSQL Database</p>
                      <p className="text-xs text-gray-400">Legislator information queries</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Google Civics API</p>
                      <p className="text-xs text-gray-400">Live representative districts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Intelligent Dispatch</p>
                      <p className="text-xs text-gray-400">Multi-tool orchestration</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool-Calling Agent Path */}
              <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/5">
                <h4 className="text-lg font-semibold text-teal-300 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Tool-Calling Agent
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-500/10">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-teal-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">ChromaDB Vector Store</p>
                      <p className="text-xs text-gray-400">Full legislative bill texts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-500/10">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-teal-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Semantic Search</p>
                      <p className="text-xs text-gray-400">Deep content analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-teal-500/10">
                    <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-teal-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expert Analysis</p>
                      <p className="text-xs text-gray-400">Focused single-tool operation</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inference Layer */}
              <div className="p-6 rounded-2xl border border-sky-500/30 bg-sky-500/5">
                <h4 className="text-lg font-semibold text-sky-300 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7"/>
                  </svg>
                  Inference & Generation
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/10">
                    <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-sky-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Llama3 Model</p>
                      <p className="text-xs text-gray-400">Served via Ollama</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/10">
                    <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-sky-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Context Synthesis</p>
                      <p className="text-xs text-gray-400">Coherent response generation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-sky-500/10">
                    <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-sky-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Human-Readable Output</p>
                      <p className="text-xs text-gray-400">Ready for citizen advocates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testing Strategy Section */}
            <div className="mt-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">Testing Strategy</h3>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Comprehensive evaluation framework ensuring optimal chunking strategies and retrieval performance
                  for legislative document processing.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                {/* Chunk Testing Framework */}
                <div className="p-8 rounded-2xl border border-orange-500/30 bg-orange-500/5">
                  <h4 className="text-xl font-semibold text-orange-300 mb-6 flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    Chunk Testing Framework
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-400">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Strategy Testing</p>
                        <p className="text-xs text-gray-400">Multiple chunking approaches</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-400">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Embedding Evaluation</p>
                        <p className="text-xs text-gray-400">Cosine similarity & retrieval metrics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-400">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Performance Analytics</p>
                        <p className="text-xs text-gray-400">F1 scores & execution metrics</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Architecture Note */}
            <div className="mt-12 text-center">
              <p className="text-gray-400 max-w-4xl mx-auto">
                The entire system is containerized with <strong>Docker</strong>, making it scalable, portable, and ready to empower citizen advocates with accessible legislative information.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <TechStackGrid />
      </div>
    </section>
  );
};