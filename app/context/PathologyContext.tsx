'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PathologyContextType {
  selectedPathologyId: string | null;
  setSelectedPathologyId: (id: string | null) => void;
}

const PathologyContext = createContext<PathologyContextType | undefined>(undefined);

export const PathologyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPathologyId, setSelectedPathologyId] = useState<string | null>(null);

  return (
    <PathologyContext.Provider value={{ selectedPathologyId, setSelectedPathologyId }}>
      {children}
    </PathologyContext.Provider>
  );
};

export const usePathology = () => {
  const context = useContext(PathologyContext);
  if (context === undefined) {
    throw new Error('usePathology must be used within a PathologyProvider');
  }
  return context;
}; 