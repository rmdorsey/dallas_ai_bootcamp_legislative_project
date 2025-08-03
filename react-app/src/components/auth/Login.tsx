// components/auth/Login.tsx
import React from 'react';

interface LoginProps {
  onDemoLogin: () => void;
  onGoogleLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onDemoLogin, onGoogleLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-teal-900 flex">
      {/* Left Side - Branding & Information */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center px-12 xl:px-20">
        <div className="max-w-lg">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="text-5xl xl:text-6xl font-bold text-white mb-4">
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
            <h2 className="text-3xl xl:text-4xl font-semibold text-white mb-6">
              Transform How You Engage with Democracy
            </h2>
            <p className="text-lg xl:text-xl text-gray-300 leading-relaxed mb-8">
              Navigate complex legislation with AI-powered analysis, find your representatives instantly,
              and make your voice heard in the democratic process.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Bill Analysis</h3>
              <p className="text-gray-400 text-sm">AI-powered summaries and insights</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Find Representatives</h3>
              <p className="text-gray-400 text-sm">Instant contact information</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-400 text-sm">Discover relevant legislation</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">AI Chat</h3>
              <p className="text-gray-400 text-sm">Interactive civic guidance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo (visible only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            <div className="text-4xl font-bold text-white mb-2">
              legisl<span className="text-teal-400">AI</span>tive
            </div>
            <div className="text-gray-300 text-sm font-medium mb-1">
              Legislation Made Legible
            </div>
            <div className="text-gray-400 text-xs">
              AI-Powered Civic Engagement
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h2 className="text-gray-800 text-2xl xl:text-3xl font-bold mb-3">
                Welcome Back
              </h2>
              <p className="text-gray-600 text-base xl:text-lg">
                Access your legislative analysis dashboard
              </p>
            </div>

            {/* Login Buttons */}
            <div className="space-y-4">
              {/* Google Login Button */}
              <button
                onClick={onGoogleLogin}
                className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border-2 border-gray-200 rounded-xl text-base font-semibold text-gray-700 hover:border-teal-600 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
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
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Demo Login Button */}
              <button
                onClick={onDemoLogin}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-teal-600 to-teal-700 border-none rounded-xl text-base font-semibold text-white hover:from-teal-700 hover:to-teal-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Try Demo Version
              </button>
            </div>

            {/* Features List - Mobile Only */}
            <div className="lg:hidden mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-gray-800 text-base font-semibold mb-4 text-center">
                What's included:
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Bill Analysis
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  Smart Search
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  Find Reps
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4 text-teal-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  AI Chat
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200 text-gray-500 text-sm">
              <p className="mb-2">
                By continuing, you agree to our terms and privacy policy
              </p>
              <p className="font-semibold text-gray-600">
                Empowering democracy through accessible legislation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};