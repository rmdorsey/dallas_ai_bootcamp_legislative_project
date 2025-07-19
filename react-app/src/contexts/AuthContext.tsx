// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAuthLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  recheckAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const savedUser = localStorage.getItem('legislative_user');
        const savedAuth = localStorage.getItem('legislative_auth');

        console.log('Checking auth:', { savedUser: !!savedUser, savedAuth });

        if (savedUser && savedAuth === 'true') {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log('User authenticated:', parsedUser);
        } else {
          console.log('No valid authentication found');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('legislative_user');
        localStorage.removeItem('legislative_auth');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuthentication();

    // Listen for storage changes (when localStorage.clear() is called)
    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage changed:', e);
      if (e.key === 'legislative_auth' || e.key === 'legislative_user' || e.key === null) {
        console.log('Auth storage cleared, resetting authentication');
        setIsAuthenticated(false);
        setUser(null);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    const handleCustomStorageChange = () => {
      const savedUser = localStorage.getItem('legislative_user');
      const savedAuth = localStorage.getItem('legislative_auth');

      if (!savedUser || savedAuth !== 'true') {
        console.log('Manual localStorage clear detected');
        setIsAuthenticated(false);
        setUser(null);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleCustomStorageChange, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [navigate, location.pathname]);

  // Log current route and auth status
  useEffect(() => {
    console.log('Route changed:', {
      pathname: location.pathname,
      isAuthenticated,
      isAuthLoading,
      user: user?.name
    });
  }, [location.pathname, isAuthenticated, isAuthLoading, user]);

  const login = useCallback((userData: User) => {
    console.log('Login initiated for:', userData.name);

    // Clear any existing auth data first
    localStorage.removeItem('legislative_user');
    localStorage.removeItem('legislative_auth');

    // Set new auth state
    setUser(userData);
    setIsAuthenticated(true);

    // Save session
    localStorage.setItem('legislative_user', JSON.stringify(userData));
    localStorage.setItem('legislative_auth', 'true');

    console.log('Login completed, navigating to main chat');
    navigate('/mainchat', { replace: true });
  }, [navigate]);

  const logout = useCallback(() => {
    console.log('Logout initiated');
    setUser(null);
    setIsAuthenticated(false);

    // Clear saved session
    localStorage.removeItem('legislative_user');
    localStorage.removeItem('legislative_auth');

    // Navigate to login
    navigate('/login');
  }, [navigate]);

  const recheckAuth = useCallback(() => {
    console.log('Manual auth recheck');
    const savedUser = localStorage.getItem('legislative_user');
    const savedAuth = localStorage.getItem('legislative_auth');

    if (!savedUser || savedAuth !== 'true') {
      console.log('No valid auth found, logging out');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    }
  }, [navigate]);

  // Expose recheckAuth to window for debugging
  useEffect(() => {
    (window as typeof window & { recheckAuth: () => void }).recheckAuth = recheckAuth;
    return () => {
      delete (window as typeof window & { recheckAuth?: () => void }).recheckAuth;
    };
  }, [recheckAuth]);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    isAuthLoading,
    login,
    logout,
    recheckAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};