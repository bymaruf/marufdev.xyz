import type { Metadata } from "next";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} — Cybersecurity & Application Security (${PERSONAL_INFO.domain})`,
  description: `${PERSONAL_INFO.name} (${PERSONAL_INFO.domain}) — Studying B.Sc. in CSE at BUBT. Specializing in Cybersecurity, Web Application Security, vulnerability analysis, and secure software foundations.`,
  keywords: [
    "Md. Maruf Hasan",
    "MarufDev",
    "marufdev.xyz",
    "Cybersecurity",
    "Web Application Security",
    "Application Security",
    "AppSec",
    "OWASP",
    "AI Security",
    "BUBT",
    "Linux",
    "C Systems",
    "Next.js",
    "Android",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: `https://${PERSONAL_INFO.domain}` }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    title: `${PERSONAL_INFO.name} — Cybersecurity & Application Security (${PERSONAL_INFO.domain})`,
    description: PERSONAL_INFO.bio,
    url: `https://${PERSONAL_INFO.domain}`,
    siteName: PERSONAL_INFO.domain,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — Cybersecurity & Application Security (${PERSONAL_INFO.domain})`,
    description: PERSONAL_INFO.bio,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#F7F7F7] text-[#171717] selection:bg-[#171717] selection:text-white">
        {children}
      </body>
    </html>
  );
}
