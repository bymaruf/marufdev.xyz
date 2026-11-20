export interface NavLink {
  label: string;
  href: string;
}

export interface CapabilityHighlight {
  primary: string;
  secondary: string;
}

export interface TechItem {
  name: string;
  category: "Security" | "AI" | "Mobile" | "Systems" | "Web";
  iconName: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  handle: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
}

export const EDUCATION: EducationItem = {
  degree: "B.Sc. in Computer Science & Engineering",
  institution: "Bangladesh University of Business and Technology (BUBT)",
};

export const PERSONAL_INFO = {
  name: "Maruf Hasan",
  title: "Cybersecurity & AI Security",
  domain: "marufdev.xyz",
  email: "mo.marufhasan@gmail.com",
  github: "https://github.com/bymaruf",
  status: "Open to Security & AI Projects • Available Worldwide",
  bio: "Studying B.Sc. in Computer Science & Engineering at BUBT. Focused on Cybersecurity and AI Security—combining application security fundamentals with securing LLM-powered applications, API integrations, and modern software systems.",
};

export const NAVIGATION_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Focus", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const HERO_DATA = {
  highlights: [
    {
      primary: "Cybersecurity",
      secondary: "Web & Application Security",
    },
    {
      primary: "AI & Systems",
      secondary: "LLM Integrations, Kotlin & C++",
    },
  ] as CapabilityHighlight[],
  greeting: "Hello",
  subGreeting: "— It's Maruf Hasan, focused on Cybersecurity & AI Security.",
  bio: "Studying B.Sc. in Computer Science & Engineering at BUBT. Focused on Cybersecurity and AI Security—combining application security fundamentals with securing LLM-powered applications, API integrations, and modern software systems.",
  primaryCta: {
    label: "View projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Get in touch",
    href: "mailto:mo.marufhasan@gmail.com",
  },
  scrollDown: {
    label: "Scroll down",
    href: "#tech-stack",
  },
  portrait: {
    src: "/images/maruf-portrait.jpg",
    alt: "Maruf Hasan - Cybersecurity and AI",
  },
  statusCard: {
    badge: "Open to Security & AI Projects • Available Worldwide",
    note: "Cybersecurity • AI • Software Engineering",
    href: "#contact",
  },
};

export const TECH_STACK: TechItem[] = [
  { name: "Linux", category: "Systems", iconName: "Server" },
  { name: "Python", category: "Systems", iconName: "FileCode2" },
  { name: "Cybersecurity", category: "Security", iconName: "Shield" },
  { name: "AI & LLMs", category: "AI", iconName: "Sparkles" },
  { name: "Kotlin", category: "Mobile", iconName: "Smartphone" },
  { name: "C++", category: "Systems", iconName: "FileCode2" },
  { name: "Next.js", category: "Web", iconName: "Layers" },
  { name: "Git & GitHub", category: "Systems", iconName: "Code2" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ai-security",
    number: "01",
    title: "AI Security & LLM Hardening",
    tagline: "Securing LLM-powered applications",
    description:
      "Assessing and defending LLM-powered applications against OWASP LLM Top 10 risks, including prompt injection (LLM01), sensitive information disclosure (LLM02), and excessive agency (LLM03).",
    capabilities: [
      "OWASP LLM Top 10 threat modeling",
      "Prompt injection & jailbreak mitigation",
      "Sensitive information disclosure controls",
      "Excessive agency & tool-abuse guardrails",
    ],
    icon: "ShieldCheck",
  },
  {
    id: "appsec",
    number: "02",
    title: "Application Security (AppSec)",
    tagline: "Hardening web & mobile attack surfaces",
    description:
      "Identifying and remediating web and mobile vulnerabilities across authentication flows, REST APIs, and client-side logic using OWASP security standards.",
    capabilities: [
      "OWASP Top 10 web vulnerability analysis",
      "Authentication, session & API hardening",
      "Client-side logic & input validation review",
      "Remediation guidance & secure code patterns",
    ],
    icon: "Shield",
  },
  {
    id: "systems-foundations",
    number: "03",
    title: "Secure Software & Systems Foundations",
    tagline: "Resilient engineering from the ground up",
    description:
      "Building resilient software from the ground up with native Android (Kotlin), systems programming (C++), and clean web architectures (Next.js).",
    capabilities: [
      "Native Android apps with Kotlin & Jetpack Compose",
      "Systems & data structure programming in C++",
      "Clean Next.js web architectures",
      "Version control & open-source workflows on GitHub",
    ],
    icon: "Globe",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "vibereader",
    title: "VibeReader",
    subtitle: "Native Android e-book reader (PDF & EPUB) with AI Book Assistant",
    category: "Android & AI (Kotlin)",
    description:
      "Native Android e-book reader (PDF & EPUB) integrating an AI Book Assistant and text-to-speech support, built with clean API key separation and structured document context handling.",
    tags: ["Kotlin", "Android", "Gemini API", "AI Assistant"],
    githubUrl: "https://github.com/bymaruf/VibeReader",
    featured: true,
  },
  {
    id: "banglish-ai",
    title: "banglishAI",
    subtitle: "Interactive web concept for Banglish AI text workflows",
    category: "AI Concept & Web",
    description:
      "Interactive web concept exploring conversational AI interfaces for Banglish (Bengali-English) text workflows.",
    tags: ["HTML/CSS", "JavaScript", "Web Prototype", "AI Concept"],
    githubUrl: "https://github.com/bymaruf/banglishAI",
    featured: true,
  },
  {
    id: "lifestream",
    title: "Lifestream",
    subtitle: "Core C++ systems application",
    category: "Systems Programming (C++)",
    description:
      "Core C++ systems application demonstrating low-level memory management, structured data handling, and deterministic execution.",
    tags: ["C++", "Systems Programming", "Data Structures"],
    githubUrl: "https://github.com/bymaruf/Lifestream",
    featured: true,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/bymaruf",
    label: "Explore GitHub",
    handle: "@bymaruf",
  },
  {
    platform: "Email",
    url: "mailto:mo.marufhasan@gmail.com",
    label: "Direct Email",
    handle: "mo.marufhasan@gmail.com",
  },
];

export const FOOTER_DATA = {
  heading: "Connect for cybersecurity, AI projects, or collaboration.",
  subheading:
    "Focused on cybersecurity and AI systems while studying B.Sc. in Computer Science & Engineering at BUBT. Feel free to explore my repositories on GitHub or reach out directly.",
  email: "mo.marufhasan@gmail.com",
  copyright: `© ${new Date().getFullYear()} Maruf Hasan. All rights reserved.`,
  domain: "marufdev.xyz",
};