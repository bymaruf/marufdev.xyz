"use client";

import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  ExternalLink,
  ChevronUp,
} from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import { PERSONAL_INFO, SOCIAL_LINKS, FOOTER_DATA } from "@/data/portfolioData";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return;
    }

    // Construct direct mailto URI with pre-filled fields
    const subject = encodeURIComponent(`Project Scope Inquiry — ${trimmedName}`);
    const body = encodeURIComponent(
      `Hi Maruf,\n\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nProject Scope & Technical Requirements:\n${trimmedMessage}\n\n---\nSent via marufdev.xyz`
    );
    const link = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setMailtoUrl(link);

    // Trigger user's mail client
    window.location.href = link;
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setMailtoUrl("");
    setFormData({ name: "", email: "", message: "" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <GithubIcon className="w-4 h-4" />;
      case "Email":
        return <Mail className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <footer id="contact" className="w-full pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Dark Rounded Container (#171717) - High Contrast Editorial Design, Zero Glow Blobs */}
        <div className="bg-[#171717] text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-16 overflow-hidden relative shadow-xl">
          <div className="relative z-10">
            {/* Top Bar: Status & Back to Top */}
            <div className="flex items-center justify-between pb-8 border-b border-neutral-800 mb-12">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                  {PERSONAL_INFO.status} &bull; 2026
                </span>
              </div>

              <button
                onClick={scrollToTop}
                className="group flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ChevronUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
              {/* Left Column: Big Headline & Direct Contact Links */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight mb-4">
                    {FOOTER_DATA.heading}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed">
                    {FOOTER_DATA.subheading}
                  </p>
                </div>

                {/* Email Direct Action Card */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                      Direct Email Contact
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-base sm:text-lg font-medium text-white hover:text-neutral-300 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyEmail}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium px-4 py-2.5 rounded-xl transition-colors border border-neutral-700 cursor-pointer"
                      title="Copy email to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center justify-center p-2.5 bg-white text-[#171717] hover:bg-neutral-200 rounded-xl transition-colors"
                      title="Send email via mail client"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Direct Freelance & Repository Links */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-4">
                    Direct Profiles & Inquiries
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SOCIAL_LINKS.map((link) => (
                      <a
                        key={link.platform}
                        href={link.url}
                        target={link.url.startsWith("mailto:") ? "_self" : "_blank"}
                        rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="group flex flex-col justify-between p-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between mb-3 text-neutral-400 group-hover:text-white transition-colors">
                          {getPlatformIcon(link.platform)}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            {link.platform}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {link.handle}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Project Inquiry Form with Clear Feedback */}
              <div className="lg:col-span-5">
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                    Start a project
                  </h3>
                  <p className="text-xs text-neutral-400 mb-6">
                    Enter your requirements below. Submitting generates a pre-filled draft to{" "}
                    <span className="text-white font-mono">{PERSONAL_INFO.email}</span>.
                  </p>

                  {formSubmitted ? (
                    <div className="p-6 rounded-2xl bg-neutral-800 border border-neutral-700 text-center space-y-4 animate-in fade-in duration-200">
                      <div className="w-10 h-10 rounded-full bg-white text-[#171717] mx-auto flex items-center justify-center font-bold">
                        <Check className="w-5 h-5" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-semibold text-white">Pre-Filled Email Draft Ready</h4>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          Your email client has been prompted with your project scope. If it didn&apos;t open automatically, use the button below:
                        </p>
                      </div>

                      <div className="pt-2 flex flex-col gap-2">
                        {mailtoUrl && (
                          <a
                            href={mailtoUrl}
                            className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-[#171717] text-xs font-semibold py-3 rounded-xl transition-colors duration-200"
                          >
                            <span>Open Mail Client Again</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={handleReset}
                          className="w-full text-xs text-neutral-400 hover:text-white py-2 underline cursor-pointer"
                        >
                          Send another project scope
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5"
                        >
                          Your Name <span className="text-neutral-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          minLength={2}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex"
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5"
                        >
                          Email Address <span className="text-neutral-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@company.com"
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1.5"
                        >
                          Project Scope & Requirements <span className="text-neutral-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          required
                          minLength={10}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Describe the application scope, timeline, and tech stack..."
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 text-[#171717] text-xs font-semibold py-3.5 rounded-xl transition-colors duration-200 cursor-pointer"
                      >
                        <span>Send Project Scope</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Bar: Copyright & Domain info */}
            <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
              <div className="flex items-center gap-2">
                <span>{PERSONAL_INFO.domain}</span>
                <span>&bull;</span>
                <span>{PERSONAL_INFO.name}</span>
              </div>
              <p>{FOOTER_DATA.copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
