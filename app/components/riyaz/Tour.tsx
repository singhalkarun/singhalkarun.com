'use client';

import { useEffect, useState } from 'react';

export interface TourStep {
  target: string; // CSS selector for the element to highlight
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TourProps {
  steps: TourStep[];
  onComplete: () => void;
}

export default function Tour({ steps, onComplete }: TourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  if (!targetRect) return null;

  const step = steps[currentStep];
  const position = step.position || 'bottom';

  // Calculate tooltip position
  const padding = 16;
  const arrowSize = 8;
  const tooltipWidth = window.innerWidth < 640 ? Math.min(340, window.innerWidth * 0.9) : 384; // sm:max-w-sm = 384px

  // Calculate horizontal position with boundary checks
  const calculateHorizontalPosition = () => {
    const centerX = targetRect.left + targetRect.width / 2;
    let left = centerX;

    // Check if tooltip would go off-screen on the left
    if (left - tooltipWidth / 2 < 16) {
      left = tooltipWidth / 2 + 16;
    }
    // Check if tooltip would go off-screen on the right
    if (left + tooltipWidth / 2 > window.innerWidth - 16) {
      left = window.innerWidth - tooltipWidth / 2 - 16;
    }

    return left;
  };

  // Arrow position - calculate offset from tooltip center to target center
  const getArrowStyle = () => {
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const tooltipLeft = calculateHorizontalPosition();
    const offsetX = targetCenterX - tooltipLeft;

    // Clamp offset to keep arrow within tooltip bounds (with some margin)
    const maxOffset = tooltipWidth / 2 - 24; // 24px margin from edges
    const clampedOffsetX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));

    return {
      position: 'absolute' as const,
      left: '50%',
      transform: `translateX(calc(-50% + ${clampedOffsetX}px))`,
    };
  };

  let tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 10001,
  };

  switch (position) {
    case 'bottom':
      tooltipStyle = {
        ...tooltipStyle,
        top: targetRect.bottom + padding + arrowSize,
        left: calculateHorizontalPosition(),
        transform: 'translateX(-50%)',
      };
      break;
    case 'top':
      tooltipStyle = {
        ...tooltipStyle,
        bottom: window.innerHeight - targetRect.top + padding + arrowSize,
        left: calculateHorizontalPosition(),
        transform: 'translateX(-50%)',
      };
      break;
    case 'left':
      tooltipStyle = {
        ...tooltipStyle,
        top: targetRect.top + targetRect.height / 2,
        right: window.innerWidth - targetRect.left + padding + arrowSize,
        transform: 'translateY(-50%)',
      };
      break;
    case 'right':
      tooltipStyle = {
        ...tooltipStyle,
        top: targetRect.top + targetRect.height / 2,
        left: targetRect.right + padding + arrowSize,
        transform: 'translateY(-50%)',
      };
      break;
  }

  // Arrow position
  const getArrowPosition = () => {
    const base = 'w-0 h-0 border-solid';
    switch (position) {
      case 'bottom':
        return `${base} -top-2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white dark:border-b-[#262626]`;
      case 'top':
        return `${base} -bottom-2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-[#262626]`;
      case 'left':
        return `${base} -right-2 top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white dark:border-l-[#262626]`;
      case 'right':
        return `${base} -left-2 top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white dark:border-r-[#262626]`;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[9999] transition-opacity"
        onClick={handleSkip}
      />

      {/* Spotlight on target element */}
      <div
        className="fixed z-[10000] pointer-events-none"
        style={{
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.4), 0 0 0 9999px rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
        }}
      />

      {/* Tooltip */}
      <div
        style={tooltipStyle}
        className="bg-white dark:bg-[#262626] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-[90vw] max-w-[340px] sm:max-w-sm relative mx-4"
      >
        {/* Arrow */}
        {(position === 'top' || position === 'bottom') && (
          <div className={getArrowPosition()} style={getArrowStyle()} />
        )}
        {(position === 'left' || position === 'right') && (
          <div className={getArrowPosition()} />
        )}

        {/* Content */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-[#e5e5e5] pr-2">
              {step.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
              {currentStep + 1}/{steps.length}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
            {step.description}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleSkip}
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#e5e5e5] transition-colors"
          >
            Skip
          </button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-[#333333] rounded-lg hover:bg-gray-200 dark:hover:bg-[#404040] transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white dark:text-[#1a1a1a] bg-gray-900 dark:bg-[#e5e5e5] rounded-lg hover:bg-gray-800 dark:hover:bg-[#d4d4d4] transition-all"
            >
              {currentStep < steps.length - 1 ? 'Next' : 'Got it!'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
