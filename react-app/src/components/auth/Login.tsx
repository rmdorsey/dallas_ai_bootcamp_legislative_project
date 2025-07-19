// components/auth/Login.tsx
import React from 'react';

interface LoginProps {
  onDemoLogin: () => void;
  onGoogleLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onDemoLogin, onGoogleLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-10 relative overflow-hidden">
        {/* Top accent border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-700 to-teal-900"></div>

        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-gray-800 mb-2">
            legisl<span className="text-teal-700">AI</span>tive
          </div>
          <div className="text-gray-500 text-sm font-medium mb-1">
            Legislation Made Legible
          </div>
          <div className="text-gray-400 text-xs">
            AI-Powered Civic Engagement
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-gray-800 text-2xl font-semibold mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Access legislative analysis and connect with your representatives
          </p>
        </div>

        {/* Login Form */}
        <div className="flex flex-col gap-5">
          {/* Google Login Button */}
          <button
            onClick={onGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3.5 px-5 bg-white border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-teal-700 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-gray-400 text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Demo Login Button */}
          <button
            onClick={onDemoLogin}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-5 bg-gradient-to-r from-teal-700 to-teal-900 border-none rounded-xl text-sm font-semibold text-white hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Try Demo Version
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-gray-800 text-base font-semibold mb-3 text-center">
            What you'll get access to:
          </h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-teal-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              AI-powered bill analysis and summaries
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-teal-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              Search and discover relevant legislation
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-teal-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Find your representatives and contact info
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <svg className="w-4 h-4 text-teal-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Interactive chat for civic engagement
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 pt-5 border-t border-gray-100 text-gray-400 text-xs leading-relaxed">
          By continuing, you agree to our terms of service and privacy policy.<br />
          <strong className="text-gray-500">Empowering democracy through accessible legislation.</strong>
        </div>
      </div>
    </div>
  );
};