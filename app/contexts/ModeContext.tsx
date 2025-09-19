"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ModeContextType {
  isCatMode: boolean;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [isCatMode, setIsCatMode] = useState(true);

  // Load mode from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('catMode');
    if (savedMode !== null) {
      setIsCatMode(JSON.parse(savedMode));
    }
  }, []);

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('catMode', JSON.stringify(isCatMode));
  }, [isCatMode]);

  const toggleMode = () => {
    setIsCatMode(prev => !prev);
  };

  return (
    <ModeContext.Provider value={{ isCatMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
