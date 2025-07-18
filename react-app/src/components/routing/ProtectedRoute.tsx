// components/routing/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import type { User } from '../../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  user: User | null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};