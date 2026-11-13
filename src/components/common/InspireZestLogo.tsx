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

  // Standard responsive heights & widths matching Meditrina exact benchmarks
  const heightStyles = {
    xs: 'h-6 sm:h-7 w-auto',
    sm: 'h-7 sm:h-8 md:h-9 w-auto',
    md: 'h-8 sm:h-10 md:h-12 w-auto',
    lg: 'h-auto w-[175px] sm:w-[195px] xl:w-[273px] max-w-full block',
    xl: 'h-12 sm:h-16 md:h-20 lg:h-24 w-auto',
  };

  const src = onDark
    ? '/images/inspirezest-logo-light.svg'
    : '/images/inspirezest-logo.svg';

  return (
    <img
      src={src}
      alt="InspireZest Hospital - Multispeciality Healthcare Center"
      width={273}
      height={70}
      className={`object-contain shrink-0 select-none ${heightStyles[size] || 'h-auto w-[175px] sm:w-[195px] xl:w-[273px]'} ${className}`}
      loading={priority ? undefined : 'lazy'}
      style={{ maxWidth: '100%' }}
    />
  );
};

export default InspireZestLogo;
