"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import { content } from '../data/content';
import { useMode } from '../contexts/ModeContext';
import { NavItem } from './Header';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  currentPage: string;
  onNavigate: (sectionId: string) => void;
}

export default function SideDrawer({ isOpen, onClose, navItems, currentPage, onNavigate }: SideDrawerProps) {
  const { mode } = useMode();
  const currentContent = content[mode];
  // Handle body scroll lock when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 backdrop-blur-sm z-40 transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{currentContent.navigation.menuTitle}</h2>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.type === 'page' ? (
                  <Link
                    href={item.href!}
                    onClick={onClose}
                    className="block w-full text-left px-6 py-4 text-lg font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full text-left px-6 py-4 text-lg font-medium transition-all duration-200 ${
                      currentPage === item.id
                        ? 'text-gray-900 bg-gray-100 border-l-4 border-gray-900 font-semibold'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mode Toggle at Bottom */}
        <div className="p-6 border-t border-gray-200 flex justify-center">
          <ModeToggle onToggle={onClose} />
        </div>
      </div>
    </>
  );
}
