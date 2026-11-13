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

  // Standard responsive heights across mobile (<640px), tablet (640-1024px), and desktop (>1024px)
  const heightStyles = {
    xs: 'h-6 sm:h-7 w-auto',
    sm: 'h-7 sm:h-8 md:h-9 w-auto',
    md: 'h-8 sm:h-10 md:h-12 w-auto',
    lg: 'h-[36px] xs:h-[40px] sm:h-[48px] md:h-[54px] lg:h-[64px] xl:h-[66px] w-auto',
    xl: 'h-12 sm:h-16 md:h-20 lg:h-24 w-auto',
  };

  const src = onDark
    ? '/images/inspirezest-logo-light.svg'
    : '/images/inspirezest-logo.svg';

  return (
    <img
      src={src}
      alt="InspireZest Hospital - Multispeciality Healthcare Center"
      className={`object-contain shrink-0 select-none ${heightStyles[size] || 'h-[40px] w-auto'} ${className}`}
      loading={priority ? undefined : 'lazy'}
      style={{ maxWidth: '100%' }}
    />
  );
};

export default InspireZestLogo;
