import React from 'react';

export interface InspireZestLogoProps {
  variant?: 'full' | 'icon' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}

export const InspireZestLogo: React.FC<InspireZestLogoProps> = ({
  variant = 'full',
  size = 'md',
  onDark = false,
  className = '',
  priority = false,
}) => {
  if (variant === 'icon') {
    const iconSizes = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };
    return (
      <img
        src="/images/inspirezest-icon.svg"
        alt="InspireZest Emblem"
        className={`object-contain shrink-0 ${iconSizes[size] || 'w-10 h-10'} ${className}`}
        loading={priority ? undefined : 'lazy'}
      />
    );
  }

  // Full horizontal SVG logo - pure vector with NO white background box
  const heightStyles = {
    xs: 'h-8 w-auto',
    sm: 'h-11 w-auto',
    md: 'h-13 sm:h-14 w-auto',
    lg: 'h-15 sm:h-16 lg:h-[66px] w-auto',
    xl: 'h-20 sm:h-24 w-auto',
  };

  const src = onDark
    ? '/images/inspirezest-logo-light.svg'
    : '/images/inspirezest-logo.svg';

  return (
    <img
      src={src}
      alt="InspireZest Hospital - Multispeciality Healthcare Center"
      className={`object-contain max-w-full ${heightStyles[size] || 'h-11 w-auto'} ${className}`}
      loading={priority ? undefined : 'lazy'}
    />
  );
};

export default InspireZestLogo;
