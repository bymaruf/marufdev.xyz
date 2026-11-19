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
  category: "Security" | "Systems" | "Web" | "AI" | "Mobile";
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
  year: string;
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
  shortName: string;
  location: string;
  status: string;
  focus: string;
}

export const PERSONAL_INFO = {
  name: "Md. Maruf Hasan",
  firstName: "Maruf",
  tagline: "focusing on cybersecurity & secure systems",
  domain: "marufdev.xyz",
  email: "contact@marufdev.xyz",
  location: "Dhaka, Bangladesh",
  status: "Open to Security & Dev Roles",
  sidebarLabel: "CYBERSECURITY & APPSEC — 2026",
  bio: "Studying B.Sc. in Computer Science & Engineering at BUBT. Transitioning from full-stack web and Android development into cybersecurity, focusing on web application security, vulnerability analysis, and securing AI-driven software.",
};

export const EDUCATION: EducationItem = {
  degree: "B.Sc. in Computer Science & Engineering",
  institution: "Bangladesh University of Business and Technology",
  shortName: "BUBT",
  location: "Dhaka, Bangladesh",
  status: "Studying B.Sc. in Computer Science & Engineering at BUBT",
  focus: "Cybersecurity, Web Application Security, AI Security & Systems Programming",
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
      primary: "AppSec & Web",
      secondary: "Vulnerability Testing & OWASP",
    },
    {
      primary: "AI & Systems",
      secondary: "Secure APIs, Android & C",
    },
  ] as CapabilityHighlight[],
  greeting: "Hello",
  subGreeting: "— It's Md. Maruf Hasan, specializing in Cybersecurity.",
  bio: "Studying B.Sc. in Computer Science & Engineering at BUBT. Leveraging hands-on experience in web development, Android apps, and C systems programming to specialize in web application security, vulnerability testing, and AI security.",
  primaryCta: {
    label: "View projects",
    href: "#projects",
  },
  secondaryCta: {
    label: "Get in touch",
    href: "mailto:contact@marufdev.xyz",
  },
  scrollDown: {
    label: "Scroll down",
    href: "#tech-stack",
  },
  portrait: {
    src: "/images/maruf-portrait.jpg",
    alt: "Md. Maruf Hasan - Cybersecurity & Application Security",
  },
  statusCard: {
    badge: "Open to Security & Dev Roles",
    note: "AppSec • Web Security • AI Safety",
    href: "#contact",
  },
};

export const TECH_STACK: TechItem[] = [
  { name: "Linux", category: "Systems", iconName: "Server" },
  { name: "Networking", category: "Security", iconName: "Network" },
  { name: "OWASP Top 10", category: "Security", iconName: "Layers" },
  { name: "C / Systems", category: "Systems", iconName: "FileCode2" },
  { name: "Next.js", category: "Web", iconName: "Atom" },
  { name: "Android", category: "Mobile", iconName: "Smartphone" },
  { name: "REST APIs", category: "Web", iconName: "Palette" },
  { name: "AI Security", category: "AI", iconName: "Sparkles" },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-app-security",
    number: "01",
    title: "Web Application Security",
    tagline: "Vulnerability Testing & OWASP Hardening",
    description:
      "Applying full-stack architecture knowledge to identify and remediate common web security flaws. Analyzing authentication flows, input validation, session handling, and API endpoints against OWASP Top 10 standards.",
    capabilities: [
      "OWASP Top 10 vulnerability analysis (XSS, SQLi, CSRF)",
      "Authentication, session & access control review",
      "REST API endpoint & payload validation",
      "Static site & attack surface minimization",
    ],
    icon: "Globe",
  },
  {
    id: "ai-api-security",
    number: "02",
    title: "AI & API Integration Security",
    tagline: "Safe LLM Workflows & Key Management",
    description:
      "Securing modern AI-integrated applications built with the Gemini API and third-party LLM providers. Protecting sensitive API credentials, validating structured outputs, and mitigating prompt injection risks.",
    capabilities: [
      "Secure API key isolation & environment handling",
      "Prompt injection & structured output validation",
      "Rate limiting & abuse prevention on AI endpoints",
      "Safe document parsing for PDF & EPUB inputs",
    ],
    icon: "Cpu",
  },
  {
    id: "secure-software-dev",
    number: "03",
    title: "Secure Software Foundations",
    tagline: "Web, Android & Low-Level C Engineering",
    description:
      "Understanding how software is engineered from the ground up—from low-level memory and file handling in C to native Android apps and Next.js web platforms—to defend code from the inside out.",
    capabilities: [
      "Next.js & TypeScript full-stack web engineering",
      "Native Android app architecture & local storage",
      "C systems programming & structured data handling",
      "Security-first code review & debugging",
    ],
    icon: "Smartphone",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "ai-document-reader",
    title: "AI-Powered E-Book & Document Reader",
    subtitle: "EPUB & PDF Reader with Gemini & OpenCode API Integration",
    category: "Android & AI Integration",
    description:
      "Multi-format digital document and e-book reader supporting EPUB and PDF parsing with structured Library, Course, and Settings navigation. Integrates Gemini and OpenCode APIs with isolated local API key management and safe state persistence.",
    tags: ["Android", "EPUB / PDF", "Gemini API", "API Security"],
    year: "2026",
    featured: true,
  },
  {
    id: "banglish-ai-showcase",
    title: "Banglish AI — Product Concept & Web Showcase",
    subtitle: "Bangla-Compatible AI Assistant Concept Platform",
    category: "AI & Web Architecture",
    description:
      "Designed and built a dedicated web showcase demonstrating the potential of a Bangla-compatible AI product tailored for Bengali speakers, exploring clean frontend architecture and safe LLM user workflows.",
    tags: ["Web Development", "Bangla AI", "Frontend", "LLM Workflows"],
    year: "2026",
    featured: true,
  },
  {
    id: "lifestream-blood-donor",
    title: "LifeStream — Blood Donor Finder System",
    subtitle: "Console-Based Donor Matching Software in C",
    category: "Systems Programming (C)",
    description:
      "Academic software system engineered in C to register, search, and match available blood donors by blood group and availability. Built using structured file I/O, input validation, and low-level memory management.",
    tags: ["C Language", "Data Structures", "File I/O", "Systems Logic"],
    year: "2025",
    featured: true,
  },
  {
    id: "marufdev-portfolio",
    title: "Zero-Backend Portfolio Architecture",
    subtitle: "Static Minimalist Security & Engineering Portfolio",
    category: "Web Engineering",
    description:
      "Personal portfolio hosted on marufdev.xyz built with Next.js and TypeScript. Engineered with a zero-backend static architecture to eliminate database and server-side attack surfaces.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Static Security"],
    liveUrl: "https://marufdev.xyz",
    year: "2026",
    featured: true,
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "Upwork",
    url: "https://www.upwork.com/", // Replace with your exact Upwork profile link
    label: "Connect on Upwork",
    handle: "Md. Maruf Hasan",
  },
  {
    platform: "Fiverr",
    url: "https://www.fiverr.com/", // Replace with your exact Fiverr profile link
    label: "View on Fiverr",
    handle: "marufdev",
  },
  {
    platform: "GitHub",
    url: "https://github.com/", // Replace with your exact GitHub profile link
    label: "Explore GitHub",
    handle: "Md. Maruf Hasan",
  },
  {
    platform: "Email",
    url: "mailto:contact@marufdev.xyz",
    label: "Direct Email",
    handle: "contact@marufdev.xyz",
  },
];

export const FOOTER_DATA = {
  heading: "Connect for cybersecurity collaboration or secure software projects.",
  subheading:
    "Focused on web application security, vulnerability testing, and building resilient web and AI-integrated applications. Reach out directly via email or professional platforms.",
  email: "contact@marufdev.xyz",
  copyright: `© ${new Date().getFullYear()} Md. Maruf Hasan. All rights reserved.`,
  domain: "marufdev.xyz",
};