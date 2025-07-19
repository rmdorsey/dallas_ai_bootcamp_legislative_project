// components/routing/AuthRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../../types';

interface AuthRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: User | null;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({
  children,
  isAuthenticated
}) => {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};