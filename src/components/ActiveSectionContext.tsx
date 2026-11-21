"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type SectionId = "home" | "focus" | "projects" | "contact";

type ActiveSectionValue = {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  scrollToSection: (id: SectionId) => void;
  /** Stage registers a direct-DOM updater; the page feeds it scroll progress. */
  stageUpdateRef: { current: ((progress: number) => void) | null };
};

const ActiveSectionContext = createContext<ActiveSectionValue | null>(null);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const stageUpdateRef = useRef<((progress: number) => void) | null>(null);

  const scrollToSection = useCallback((id: SectionId) => {
    const element = document.getElementById(id);
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  const value = useMemo(
    () => ({ activeSection, setActiveSection, scrollToSection, stageUpdateRef }),
    [activeSection, scrollToSection]
  );

  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error("useActiveSection must be used within ActiveSectionProvider");
  }
  return context;
}
