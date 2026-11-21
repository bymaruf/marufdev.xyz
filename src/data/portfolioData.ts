export interface FocusPillar {
  number: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
}

export const PERSONAL_INFO = {
  name: "Maruf Hasan",
  role: "AI Engineer & Cybersecurity Builder",
  domain: "marufdev.xyz",
  email: "mo.marufhasan@gmail.com",
  github: "https://github.com/bymaruf",
  githubHandle: "@bymaruf",
  about:
    "AI Engineer & Cybersecurity Builder studying B.Sc. in Computer Science & Engineering at BUBT, focused on application security and securing LLM-powered systems.",
};

export const EDUCATION = {
  degree: "B.Sc. in Computer Science & Engineering",
  institution: "Bangladesh University of Business and Technology (BUBT)",
};

export const TECH_STACK: string[] = [
  "Linux",
  "Python",
  "Cybersecurity",
  "AI & LLMs",
  "Kotlin",
  "C++",
  "Next.js",
  "Git & GitHub",
];

export const FOCUS_PILLARS: FocusPillar[] = [
  {
    number: "01",
    title: "AI Security & LLM Hardening",
    description:
      "Assessing and defending LLM-powered applications against OWASP LLM Top 10 risks, including prompt injection (LLM01), sensitive information disclosure (LLM02), and excessive agency (LLM03).",
  },
  {
    number: "02",
    title: "Application Security (AppSec)",
    description:
      "Identifying and remediating web and mobile vulnerabilities across authentication flows, REST APIs, and client-side logic using OWASP security standards.",
  },
  {
    number: "03",
    title: "Secure Software & Systems Foundations",
    description:
      "Building resilient software from the ground up with native Android (Kotlin), systems programming (C++), and clean web architectures (Next.js).",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "vibereader",
    title: "VibeReader",
    category: "Android & AI (Kotlin)",
    description:
      "Native Android e-book reader (PDF & EPUB) integrating an AI Book Assistant and text-to-speech support, built with clean API key separation and structured document context handling.",
    tags: ["Kotlin", "Android", "Gemini API", "AI Assistant"],
    githubUrl: "https://github.com/bymaruf/VibeReader",
  },
  {
    id: "banglish-ai",
    title: "banglishAI",
    category: "AI Concept & Web",
    description:
      "Interactive web concept exploring conversational AI interfaces for Banglish (Bengali-English) text workflows.",
    tags: ["HTML/CSS", "JavaScript", "Web Prototype", "AI Concept"],
    githubUrl: "https://github.com/bymaruf/banglishAI",
  },
  {
    id: "lifestream",
    title: "Lifestream",
    category: "Systems Programming (C++)",
    description:
      "Core C++ systems application demonstrating low-level memory management, structured data handling, and deterministic execution.",
    tags: ["C++", "Systems Programming", "Data Structures"],
    githubUrl: "https://github.com/bymaruf/Lifestream",
  },
];
