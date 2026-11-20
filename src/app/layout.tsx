import type { Metadata } from "next";
import "./globals.css";
import { PERSONAL_INFO } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Maruf Hasan — Cybersecurity & AI Security",
  description:
    "Portfolio of Maruf Hasan — Cybersecurity & AI Security. Focused on LLM hardening, application security (AppSec), and secure software systems.",
  keywords: [
    "Maruf Hasan",
    "MarufDev",
    "marufdev.xyz",
    "Cybersecurity",
    "AI Security",
    "AppSec",
    "LLM Hardening",
    "Kotlin",
    "Android",
    "C++",
    "Next.js",
  ],
  authors: [{ name: PERSONAL_INFO.name, url: `https://${PERSONAL_INFO.domain}` }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    title: `${PERSONAL_INFO.name} — Cybersecurity & AI Security`,
    description:
      "Portfolio of Maruf Hasan — Cybersecurity & AI Security. Focused on LLM hardening, application security (AppSec), and secure software systems.",
    url: `https://${PERSONAL_INFO.domain}`,
    siteName: PERSONAL_INFO.domain,
    type: "website",
    images: ["/images/maruf-portrait.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — Cybersecurity & AI Security`,
    description:
      "Portfolio of Maruf Hasan — Cybersecurity & AI Security. Focused on LLM hardening, application security (AppSec), and secure software systems.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
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
