'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  RefObject,
} from 'react';

interface ActiveSectionContextProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  containerRef: RefObject<HTMLElement>;
}

const ActiveSectionContext = createContext<
  ActiveSectionContextProps | undefined
>(undefined);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>('');
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for an initial hash in the URL on page load
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
      setActiveSection(initialHash);
      const element = document.getElementById(initialHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <ActiveSectionContext.Provider
      value={{ activeSection, setActiveSection, containerRef }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error(
      'useActiveSection must be used within an ActiveSectionProvider',
    );
  }
  return context;
}
