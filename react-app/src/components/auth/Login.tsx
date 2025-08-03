// components/auth/Login.tsx
import React, { useState } from 'react';

interface LoginProps {
  onDemoLogin: () => void;
  onGoogleLogin: () => void;
  onHomeClick?: () => void;
}

// Environment variable helper function
const getEnvVariable = (name: string, defaultValue: string): string => {
  // For Create React App
  if (typeof window !== 'undefined' && (window as any).process?.env) {
    return (window as any).process.env[name] || defaultValue;
  }

  // For Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[name] || defaultValue;
  }

  // Fallback for other bundlers or manual injection
  try {
    // This will work if process is available (should be with Create React App)
    return (globalThis as any).process?.env?.[name] || defaultValue;
  } catch {
    return defaultValue;
  }
};

export const Login: React.FC<LoginProps> = ({ onDemoLogin, onGoogleLogin, onHomeClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoClick = () => {
    setShowModal(true);
    setPasscode('');
    setError('');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setPasscode('');
    setError('');
  };

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get the expected passcode from environment variable
      const expectedPasscode = getEnvVariable('REACT_APP_DEMO_PASSCODE', 'DALLAS');

      if (passcode.toUpperCase() === expectedPasscode.toUpperCase()) {
        // Correct passcode
        setShowModal(false);
        onDemoLogin();
      } else {
        // Incorrect passcode
        setError('Invalid passcode. Please try again.');
        setPasscode('');
      }
    } catch (err) {
      setError(`An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Navigation - Same as HomePage */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800/50 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onHomeClick}
                className="text-2xl font-bold hover:text-teal-400 transition-colors cursor-pointer"
              >
                legisl<span className="text-teal-400">AI</span>tive
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background Gradient - similar to HomePage */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 via-black to-black"></div>

      <div className="relative flex min-h-screen pt-16">
        {/* Left Side - Branding & Information */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center px-12 xl:px-20">
          <div className="max-w-lg">
            {/* Logo Section - Updated to match HomePage */}
            <div className="mb-8">
              <div className="text-5xl xl:text-6xl font-bold mb-4">
                legisl<span className="text-teal-400">AI</span>tive
              </div>
              <div className="text-xl xl:text-2xl text-gray-300 font-medium mb-2">
                Legislation Made Legible
              </div>
              <div className="text-lg xl:text-xl text-gray-400">
                AI-Powered Civic Engagement Platform
              </div>
            </div>

            {/* Hero Description */}
            <div className="mb-12">
              <h2 className="text-3xl xl:text-4xl font-semibold mb-6">
                Transform How You Engage with Democracy
              </h2>
              <p className="text-lg xl:text-xl text-gray-300 leading-relaxed mb-8">
                Navigate complex legislation with AI-powered analysis, find your representatives instantly,
                and make your voice heard in the democratic process.
              </p>
            </div>

            {/* Features Grid - Compact single line */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300 text-center">
                <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-white font-medium text-sm mb-1">Bill Analysis</h3>
                <p className="text-gray-400 text-xs">AI summaries</p>
              </div>

              <div className="p-3 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300 text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h3 className="text-white font-medium text-sm mb-1">Find Reps</h3>
                <p className="text-gray-400 text-xs">Contact info</p>
              </div>

              <div className="p-3 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300 text-center">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 className="text-white font-medium text-sm mb-1">Smart Search</h3>
                <p className="text-gray-400 text-xs">Find legislation</p>
              </div>

              <div className="p-3 rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black hover:border-gray-600 transition-all duration-300 text-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h3 className="text-white font-medium text-sm mb-1">AI Chat</h3>
                <p className="text-gray-400 text-xs">Civic guidance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo (visible only on mobile) */}
            <div className="lg:hidden text-center mb-8">
              <div className="text-4xl font-bold mb-2">
                legisl<span className="text-teal-400">AI</span>tive
              </div>
              <div className="text-gray-300 text-sm font-medium mb-1">
                Legislation Made Legible
              </div>
              <div className="text-gray-400 text-xs">
                AI-Powered Civic Engagement
              </div>
            </div>

            {/* Login Card - Updated to match HomePage style */}
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
              {/* Welcome Text */}
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl xl:text-3xl font-bold mb-3">
                  Welcome Back
                </h2>
                <p className="text-gray-400 text-base xl:text-lg">
                  Access your legislative analysis dashboard
                </p>
              </div>

              {/* Login Buttons */}
              <div className="space-y-4">
                {/* Google Login Button - Updated styling */}
                <button
                  onClick={onGoogleLogin}
                  className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-gray-800/50 border border-gray-700 rounded-xl text-base font-semibold text-white hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
                >
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="px-4 text-gray-400 text-sm font-medium">or</span>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Demo Login Button - Updated to open modal */}
                <button
                  onClick={handleDemoClick}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-700 border-none rounded-xl text-base font-semibold text-white hover:from-teal-700 hover:to-teal-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Try Demo Version
                </button>
              </div>

              {/* Features List - Mobile Only - Updated styling */}
              <div className="lg:hidden mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-white text-base font-semibold mb-4 text-center">
                  What's included:
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Bill Analysis
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    Smart Search
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    </svg>
                    Find Reps
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    AI Chat
                  </div>
                </div>
              </div>

              {/* Footer - Updated styling */}
              <div className="text-center mt-8 pt-6 border-t border-gray-700 text-gray-400 text-sm">
                <p className="mb-2">
                  By continuing, you agree to our terms and privacy policy
                </p>
                <p className="font-semibold text-gray-300">
                  Empowering democracy through accessible legislation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Passcode Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleModalClose}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md">
            <div className="rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Demo Access</h3>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="mb-6">
                <p className="text-gray-400 mb-4">
                  Enter the passcode to access the demo version of LegislAItive.
                </p>

                <form onSubmit={handlePasscodeSubmit}>
                  <div className="mb-4">
                    <label htmlFor="passcode" className="block text-sm font-medium text-gray-300 mb-2">
                      Passcode
                    </label>
                    <input
                      type="password"
                      id="passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                      placeholder="Enter passcode"
                      required
                      autoFocus
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !passcode.trim()}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Access Demo
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Contact your administrator if you need access
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};