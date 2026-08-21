import type { ReactNode } from 'react';

interface PixelButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function PixelButton({ children, onClick, className = '', variant = 'primary' }: PixelButtonProps) {
  const base = variant === 'primary'
    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 shadow-[4px_4px_0_0_#b8960f]'
    : 'bg-pink-100 text-pink-800 hover:bg-pink-200 shadow-[4px_4px_0_0_#e8a0b0]';

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        px-6 py-3
        font-['Press_Start_2P',monospace] text-xs sm:text-sm
        border-2 border-current
        transition-all duration-150
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_currentColor]
        cursor-pointer
        ${base}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
