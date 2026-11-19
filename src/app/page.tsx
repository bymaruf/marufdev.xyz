import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechStackStrip from "@/components/TechStackStrip";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] text-[#171717] antialiased flex flex-col selection:bg-[#171717] selection:text-white">
      {/* Top Floating Navigation */}
      <Navbar />

      {/* Hero Section (Hybrid of references with portrait & glassmorphism badge) */}
      <HeroSection />

      {/* Core Tech Stack Horizontal Strip */}
      <TechStackStrip />

      {/* About & Engineering Philosophy */}
      <AboutSection />

      {/* 3-Column Services / Focus Grid */}
      <ServicesSection />

      {/* 2-Column Selected Projects Showcase */}
      <ProjectsSection />

      {/* Dark Rounded Contact Footer (#171717) */}
      <ContactFooter />
    </main>
  );
}
