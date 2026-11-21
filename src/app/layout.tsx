import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ActiveSectionProvider } from "@/components/ActiveSectionContext";
import { PERSONAL_INFO } from "@/data/portfolioData";

const description =
  "Portfolio of Maruf Hasan — AI Engineer & Cybersecurity Builder. Focused on LLM hardening, application security, and secure software systems.";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${PERSONAL_INFO.domain}`),
  title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
  description,
  keywords: [
    "Maruf Hasan",
    "marufdev",
    PERSONAL_INFO.domain,
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
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description,
    url: `https://${PERSONAL_INFO.domain}`,
    siteName: PERSONAL_INFO.domain,
    type: "website",
    images: ["/blackhole-poster.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PERSONAL_INFO.name} — ${PERSONAL_INFO.role}`,
    description,
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
      <body className="bg-black text-white antialiased selection:bg-amber-300 selection:text-zinc-950">
        <ActiveSectionProvider>
          <Navbar />
          {children}
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
