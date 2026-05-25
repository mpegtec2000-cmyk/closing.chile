'use client';

import { forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  showArrow?: boolean;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-5 py-2.5 text-[10px]',
  md: 'px-8 py-4 text-[11px]',
  lg: 'px-10 py-5 text-sm',
};

const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  (
    {
      children,
      href,
      showArrow = true,
      variant = 'solid',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const base = cn(
      'group relative inline-flex items-center justify-center gap-2 font-semibold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300',
      sizeClasses[size],
      variant === 'solid'
        ? 'bg-gold text-black hover:shadow-[0_0_40px_rgba(201,168,76,0.4)]'
        : 'border border-gold text-gold hover:bg-gold hover:text-black',
      className
    );

    const inner = (
      <>
        <span className="relative z-10">{children}</span>
        {showArrow && (
          <ArrowRight
            size={14}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
        {variant === 'solid' && (
          <span className="absolute inset-0 bg-gold-light translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300" />
        )}
      </>
    );

    if (href) {
      return (
        <a href={href} className={base}>
          {inner}
        </a>
      );
    }

    return (
      <button ref={ref} className={base} {...props}>
        {inner}
      </button>
    );
  }
);

GoldButton.displayName = 'GoldButton';
export default GoldButton;
