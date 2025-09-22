"use client";

import { useMode } from '../contexts/ModeContext';

interface ModeToggleProps {
  className?: string;
  onToggle?: () => void;
}

export default function ModeToggle({ className = "", onToggle }: ModeToggleProps) {
  const { mode, toggleMode } = useMode();

  const handleToggle = () => {
    toggleMode();
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-0 focus:border-0 focus:shadow-none shadow-sm cursor-pointer ${
        mode === 'cat' ? 'bg-orange-400' : 'bg-gray-300'
      } ${
        // Desktop: smaller size, Mobile: bigger size
        'md:h-10 md:w-20 h-12 w-24'
      } ${className}`}
      style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
      role="switch"
      aria-checked={mode === 'cat'}
      title={`Switch to ${mode === 'human' ? 'cat' : 'human'} mode`}
    >
      {/* Toggle dot with icon inside */}
      <span
        className={`absolute inline-flex items-center justify-center transform rounded-full bg-white shadow-md transition-all duration-200 ${
          // Desktop: small dot, Mobile: bigger dot
          'md:h-8 md:w-8 h-10 w-10'
        } ${
          mode === 'cat' 
            ? 'md:translate-x-5 translate-x-5' 
            : 'md:-translate-x-5 -translate-x-5'
        }`}
      >
        <span className={`${
          // Desktop: small icon, Mobile: larger icon
          'md:text-sm text-lg'
        }`}>
          {mode === 'cat' ? '🐱' : '👤'}
        </span>
      </span>
    </button>
  );
}
