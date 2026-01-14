"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SideDrawer from './SideDrawer';
import HamburgerButton from './HamburgerButton';
import ModeToggle from './ModeToggle';

export interface NavItem {
  id: string;
  label: string;
  type: 'section' | 'page';
  href?: string;
}

interface NavButtonProps {
  sectionId: string;
  label: string;
  isActive: boolean;
  size?: "base" | "lg";
  onClick: (sectionId: string) => void;
}

function NavButton({ sectionId, label, isActive, size = "lg", onClick }: NavButtonProps) {
  const sizeClass = size === "lg" ? "text-lg" : "text-base";

  return (
    <button
      onClick={() => onClick(sectionId)}
      className={`${sizeClass} font-medium duration-200 cursor-pointer focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0 focus:ring-transparent px-3 py-2 rounded-md transition-all ${
        isActive
          ? "text-gray-900 bg-gray-100 border-b-2 border-gray-900 font-semibold shadow-sm"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
      }`}
      style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
    >
      {label}
    </button>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  size?: "base" | "lg";
}

function NavLink({ href, label, size = "lg" }: NavLinkProps) {
  const sizeClass = size === "lg" ? "text-lg" : "text-base";

  return (
    <Link
      href={href}
      className={`${sizeClass} font-medium duration-200 cursor-pointer focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0 focus:ring-transparent px-3 py-2 rounded-md transition-all text-gray-600 hover:text-gray-900 hover:bg-gray-50`}
      style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const [currentPage, setCurrentPage] = useState<"about" | "history" | "interests" | "experience" | "projects" | "connect">("about");
  const [isScrolling, setIsScrolling] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    // Immediately update the active state when clicked
    setCurrentPage(sectionId as "about" | "history" | "interests" | "experience" | "projects" | "connect");
    setIsScrolling(true);
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.offsetTop - headerHeight - 20; // 20px extra offset for breathing room
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      // Re-enable scroll detection after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust timing based on scroll animation duration
    }
  };

  const navItems: NavItem[] = [
    { id: 'about', label: 'About', type: 'section' },
    { id: 'history', label: 'History', type: 'section' },
    { id: 'interests', label: 'Interests', type: 'section' },
    { id: 'experience', label: 'Experience', type: 'section' },
    { id: 'projects', label: 'Projects', type: 'section' },
    { id: 'blogs', label: 'Blogs', type: 'page', href: '/blogs' },
    { id: 'connect', label: 'Connect', type: 'section' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active state if we're in the middle of a programmatic scroll
      if (isScrolling) return;
      
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const scrollPosition = window.scrollY + headerHeight + 100; // 100px offset for better detection

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          
          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setCurrentPage(item.id as "about" | "history" | "interests" | "experience" | "projects" | "connect");
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems, isScrolling]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 pt-6 pb-6 mb-12">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <nav className="flex justify-center space-x-8 lg:space-x-12">
            {navItems.map((item) =>
              item.type === 'page' ? (
                <NavLink
                  key={item.id}
                  href={item.href!}
                  label={item.label}
                />
              ) : (
                <NavButton
                  key={item.id}
                  sectionId={item.id}
                  label={item.label}
                  isActive={currentPage === item.id}
                  onClick={scrollToSection}
                />
              )
            )}
          </nav>
        </div>

        {/* Mobile Navigation - Hamburger Menu */}
        <div className="md:hidden flex justify-between items-center px-4">
          <div className="flex-1" /> {/* Spacer */}
          <h1 className="text-lg font-semibold text-gray-900">Karun Agarwal</h1>
          <div className="flex-1 flex justify-end">
            <HamburgerButton 
              isOpen={isDrawerOpen} 
              onClick={() => setIsDrawerOpen(!isDrawerOpen)} 
            />
          </div>
        </div>
      </header>

      {/* Side Drawer */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        navItems={navItems}
        currentPage={currentPage}
        onNavigate={scrollToSection}
      />
    </>
  );
}
