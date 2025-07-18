import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = ''
}) => {
  const baseClasses = 'font-semibold transition-colors rounded-lg flex items-center gap-2';

  const variantClasses = {
    primary: 'bg-teal-700 text-white hover:bg-teal-800',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    outline: 'border border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
