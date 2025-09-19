"use client";

import { useMode } from '../contexts/ModeContext';

export default function ModeToggle() {
  const { isCatMode, toggleMode } = useMode();

  return (
    <button
        onClick={toggleMode}
        className="relative inline-flex h-12 w-20 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 hover:scale-105 shadow-lg"
        style={{ 
          backgroundColor: isCatMode ? '#10b981' : '#6b7280',
          outline: 'none'
        }}
        aria-label={`Switch to ${isCatMode ? 'human' : 'cat'} mode`}
      >
        {/* Sliding Circle with Icon */}
        <span
          className={`inline-flex items-center justify-center h-8 w-8 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            isCatMode ? 'translate-x-9' : 'translate-x-1'
          }`}
        >
          {/* Human Icon */}
          <span className={`text-lg transition-all duration-300 ${
            isCatMode ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}>
            👤
          </span>
          
          {/* Cat Icon */}
          <span className={`absolute text-lg transition-all duration-300 ${
            isCatMode ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}>
            🐱
          </span>
        </span>
    </button>
  );
}
