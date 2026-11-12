'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[8px]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
    md: 'text-sm px-4 py-2 gap-2 h-10',
    lg: 'text-base px-5 py-2.5 gap-2.5 h-12 font-semibold',
  };

  const variantClasses = {
    primary:
      'bg-[#00829B] text-white hover:bg-[#006C82] active:bg-[#005566] focus:ring-[#00829B] shadow-sm',
    secondary:
      'bg-[#22A06B] text-white hover:bg-[#1C8658] active:bg-[#156B46] focus:ring-[#22A06B] shadow-sm',
    outline:
      'border border-[#E5E7EB] bg-white text-[#1A1A1A] hover:bg-[#F4F6F6] hover:border-[#00829B]/40 focus:ring-[#00829B] shadow-xs',
    ghost:
      'bg-transparent text-[#1A1A1A] hover:bg-[#F4F6F6] hover:text-[#00829B] focus:ring-[#00829B]',
    danger:
      'bg-[#DC5555] text-white hover:bg-[#C94040] active:bg-[#B33030] focus:ring-[#DC5555] shadow-sm',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

