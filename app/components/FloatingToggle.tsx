"use client";

import { useState } from 'react';
import ModeToggle from './ModeToggle';

export default function FloatingToggle() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {isVisible ? (
        <div className="flex items-center space-x-3 bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2">
          <ModeToggle />
          <button
            onClick={toggleVisibility}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
            aria-label="Hide toggle"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={toggleVisibility}
          className="bg-white rounded-full shadow-lg border border-gray-200 p-3 hover:shadow-xl transition-all duration-200 hover:scale-105"
          aria-label="Show toggle"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
        </button>
      )}
    </div>
  );
}
