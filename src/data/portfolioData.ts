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
  role: "CS Student · Developer & AI/Security Enthusiast",
  domain: "marufdev.xyz",
  email: "mo.marufhasan@gmail.com",
  github: "https://github.com/bymaruf",
  githubHandle: "@bymaruf",
  about:
    "B.Sc. in Computer Science & Engineering student at BUBT building software projects with C, C++, Python, and modern web tools, while actively learning AI, LLMs, and cybersecurity fundamentals.",
};

export const EDUCATION = {
  degree: "B.Sc. in Computer Science & Engineering",
  institution: "Bangladesh University of Business and Technology (BUBT)",
};

export const TECH_STACK: string[] = [
  "C",
  "C++",
  "Python",
  "Linux",
  "Git & GitHub",
  "Kotlin",
  "Next.js",
];

export const FOCUS_PILLARS: FocusPillar[] = [
  {
    number: "01",
    title: "AI & LLM Exploration",
    description:
      "Building hands-on applications with LLM APIs and multi-provider workflows while studying how modern AI assistants handle context and prompts.",
  },
  {
    number: "02",
    title: "Cybersecurity Fundamentals",
    description:
      "Learning core application and system security concepts, safe input handling, and defensive coding practices through continuous study and experimentation.",
  },
  {
    number: "03",
    title: "Programming & Web Foundations",
    description:
      "Writing structured software in C, C++, and Python on Linux, building Android apps with Kotlin, and learning full-stack web development with Next.js.",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "vibereader",
    title: "VibeReader",
    category: "Android & AI (Kotlin)",
    description:
      "Student Android project: a PDF and EPUB reader with an AI book assistant and text-to-speech, built while learning on-device parsing and clean API key handling.",
    tags: ["Kotlin", "Android", "Gemini API", "AI Assistant"],
    githubUrl: "https://github.com/bymaruf/VibeReader",
  },
  {
    id: "banglish-ai",
    title: "banglishAI",
    category: "AI Concept & Web",
    description:
      "A small web experiment exploring conversational AI interfaces for Banglish (Bengali-English) text, built with plain HTML, CSS, and JavaScript.",
    tags: ["HTML/CSS", "JavaScript", "Web Prototype", "AI Concept"],
    githubUrl: "https://github.com/bymaruf/banglishAI",
  },
  {
    id: "lifestream",
    title: "Lifestream",
    category: "Systems Programming (C++)",
    description:
      "A personal C++ systems project for practising manual memory management, structured data containers, and deterministic execution.",
    tags: ["C++", "Systems Programming", "Data Structures"],
    githubUrl: "https://github.com/bymaruf/Lifestream",
  },
];
