// components/home/components/ArchitectureFlow.tsx
import React from 'react';

export const ArchitectureFlow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
      {/* User Layer */}
      <div className="lg:col-span-1">
        <div className="text-center p-6 rounded-2xl border border-teal-500/30 bg-teal-500/10">
          <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h4 className="font-semibold text-teal-300">User</h4>
          <p className="text-xs text-gray-400 mt-2">Query Input</p>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center lg:col-span-1">
        <svg className="w-6 h-6 text-gray-600 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>

      {/* Frontend & Backend */}
      <div className="lg:col-span-1">
        <div className="space-y-4">
          <div className="text-center p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h5 className="text-sm font-semibold text-blue-300">React Frontend</h5>
          </div>
          <div className="text-center p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>
              </svg>
            </div>
            <h5 className="text-sm font-semibold text-indigo-300">FastAPI Backend</h5>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center lg:col-span-1">
        <svg className="w-6 h-6 text-gray-600 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>

      {/* AI Orchestration */}
      <div className="lg:col-span-1">
        <div className="text-center p-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h4 className="font-semibold text-cyan-300">LangGraph Agent</h4>
          <p className="text-xs text-gray-400 mt-2">AI Dispatcher</p>
        </div>
      </div>
    </div>
  );
};