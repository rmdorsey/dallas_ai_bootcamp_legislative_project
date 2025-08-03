// App.tsx - Updated with Home Page and About Page
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { User } from './types';
import { HomePage } from './components/home/HomePage';
import { AboutPage } from './components/about/AboutPage';
import { Login } from './components/auth/Login';
import { BillAnalyzer } from './pages/BillAnalyzer/BillAnalyzer';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { LoadingScreen } from './components/common/LoadingScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

// Main Application Component (inside Router and Providers)
const MainApp: React.FC = () => {
  const { isAuthenticated, isAuthLoading, login } = useAuth();
  const navigate = useNavigate();

  // Authentication handlers
  const handleDemoLogin = () => {
    const demoUser: User = {
      name: 'Demo User',
      email: 'demo@legislative.app',
      type: 'demo',
      loginTime: new Date().toISOString()
    };
    login(demoUser);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked - implement OAuth later');
    alert('Google OAuth will be implemented in the next step. For now, use Demo Version!');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Show loading while checking authentication
  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Home Route - Landing Page */}
      <Route
        path="/"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : isAuthenticated ? (
            <Navigate to="/mainchat" replace />
          ) : (
            <HomePage
              onGetStarted={handleGetStarted}
              onAboutClick={handleAboutClick}
            />
          )
        }
      />

      {/* Explicit Home Route */}
      <Route
        path="/home"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : isAuthenticated ? (
            <Navigate to="/mainchat" replace />
          ) : (
            <HomePage
              onGetStarted={handleGetStarted}
              onAboutClick={handleAboutClick}
            />
          )
        }
      />

      {/* About Route */}
      <Route
        path="/about"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : isAuthenticated ? (
            <Navigate to="/mainchat" replace />
          ) : (
            <AboutPage onBackToHome={handleBackToHome} />
          )
        }
      />

      {/* Login Route */}
      <Route
        path="/login"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : isAuthenticated ? (
            <Navigate to="/mainchat" replace />
          ) : (
            <Login
              onDemoLogin={handleDemoLogin}
              onGoogleLogin={handleGoogleLogin}
            />
          )
        }
      />

      {/* Main Chat Route - The primary dashboard */}
      <Route
        path="/mainchat"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : !isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <ChatProvider>
              <Dashboard />
            </ChatProvider>
          )
        }
      />

      {/* Protected Bill Analyzer */}
      <Route
        path="/bill-analyzer"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : !isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <BillAnalyzer onBack={() => navigate('/mainchat')} />
          )
        }
      />

      {/* Catch all - redirect to home for unauthenticated, mainchat for authenticated */}
      <Route
        path="*"
        element={
          isAuthLoading ? (
            <LoadingScreen />
          ) : isAuthenticated ? (
            <Navigate to="/mainchat" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

// Root App Component with Router and Providers
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
};

export default App;