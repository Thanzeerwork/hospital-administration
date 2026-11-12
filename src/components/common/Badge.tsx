'use client';

import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'confirmed' | 'completed' | 'cancelled' | 'warning' | 'teal' | 'neutral' | 'emerald';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
  };

  const variantClasses = {
    confirmed: 'bg-[#22A06B]/10 text-[#22A06B] border border-[#22A06B]/25',
    completed: 'bg-[#00829B]/10 text-[#00829B] border border-[#00829B]/25',
    cancelled: 'bg-[#DC5555]/10 text-[#DC5555] border border-[#DC5555]/25',
    warning: 'bg-[#E9A23B]/10 text-[#B8771A] border border-[#E9A23B]/30',
    teal: 'bg-[#00829B]/10 text-[#00829B] border border-[#00829B]/25',
    emerald: 'bg-[#00829B] text-white',
    neutral: 'bg-[#E5E7EB] text-[#4A4A4A] border border-[#D1D5DB]',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeClasses[size]} ${variantClasses[variant]} tracking-wide ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80 shrink-0" />
      {children}
    </span>
  );
};

