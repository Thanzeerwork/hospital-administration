'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

// Luxury cubic-bezier easing curve matching high-end interactive experiences (smooth ease-out)
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface MotionRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 50,
  threshold = 0.15,
  once = true,
  className = '',
  style,
}) => {
  let initialX = 0;
  let initialY = 0;

  if (direction === 'left') initialX = -distance;
  else if (direction === 'right') initialX = distance;
  else if (direction === 'up') initialY = distance;
  else if (direction === 'down') initialY = -distance;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialX,
        y: initialY,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Staggered Container for grids of cards (specialties, doctors, packages, blogs)
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  className = '',
  style,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Child item inside StaggerContainer
interface StaggerItemProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up';
  duration?: number;
  distance?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  duration = 0.6,
  distance = 35,
  className = '',
  style,
}) => {
  let initialX = 0;
  let initialY = 0;

  if (direction === 'left') initialX = -distance;
  else if (direction === 'right') initialX = distance;
  else if (direction === 'up') initialY = distance;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: initialX, y: initialY },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            ease: LUXURY_EASE,
          },
        },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

// Paragon-Style Animated Circle Action Button
interface ParagonArrowButtonProps {
  label?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'light' | 'dark' | 'teal' | 'outline';
}

export const ParagonArrowButton: React.FC<ParagonArrowButtonProps> = ({
  label,
  children,
  onClick,
  className = '',
  variant = 'teal',
}) => {
  const colorStyles = {
    teal: 'text-[#00829B] group-hover:text-[#006275]',
    light: 'text-white group-hover:text-[#2FE5A7]',
    dark: 'text-gray-900 group-hover:text-[#00829B]',
    outline: 'text-[#00829B] group-hover:text-[#006275]',
  };

  const circleStyles = {
    teal: 'border-[#00829B]/40 group-hover:border-[#00829B] group-hover:bg-[#00829B] group-hover:text-white text-[#00829B]',
    light: 'border-white/40 group-hover:border-white group-hover:bg-white group-hover:text-[#0A1A22] text-white',
    dark: 'border-gray-300 group-hover:border-[#00829B] group-hover:bg-[#00829B] group-hover:text-white text-gray-700',
    outline: 'border-[#00829B] group-hover:bg-[#00829B] group-hover:text-white text-[#00829B]',
  };

  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-3 text-sm font-bold tracking-wide transition-all cursor-pointer ${colorStyles[variant]} ${className}`}
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">{children || label}</span>
      <span
        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs ${circleStyles[variant]}`}
      >
        <svg
          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </button>
  );
};
