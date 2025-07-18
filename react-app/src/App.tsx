// App.tsx - Refactored and Clean
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import type { User } from './types';
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

  // Show loading while checking authentication
  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          !isAuthLoading && isAuthenticated ? (
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
          !isAuthLoading && !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <ChatProvider>
              <Dashboard />
            </ChatProvider>
          )
        }
      />

      {/* Root route - redirect to main chat if authenticated, login if not */}
      <Route
        path="/"
        element={
          !isAuthLoading && !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <Navigate to="/mainchat" replace />
          )
        }
      />

      {/* Protected Bill Analyzer */}
      <Route
        path="/bill-analyzer"
        element={
          !isAuthLoading && !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : (
            <BillAnalyzer onBack={() => navigate('/mainchat')} />
          )
        }
      />

      {/* Catch all - redirect based on auth status */}
      <Route
        path="*"
        element={
          <Navigate to={!isAuthLoading && isAuthenticated ? "/mainchat" : "/login"} replace />
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