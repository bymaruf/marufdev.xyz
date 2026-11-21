import { ArrowUpRight } from "lucide-react";
import GithubIcon from "@/components/icons/GithubIcon";
import BlackHoleSegment from "@/components/BlackHoleSegment";
import { PROJECTS } from "@/data/portfolioData";

const legible = "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]";

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      {/* Segment C — face-on photon ring, bright behind the clear glass cards. */}
      <BlackHoleSegment startTime={14} endTime={20} className="opacity-95" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-28 sm:px-10 lg:px-16">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className={`${legible} text-xs font-medium tracking-wide text-amber-200/70`}>
              03 / Featured projects
            </p>
            <h1 className={`${legible} mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl`}>
              Open-source work
            </h1>
          </div>
          <p className={`${legible} max-w-sm text-sm leading-6 text-white/70`}>
            Three public repositories across Android, the web, and systems code.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className="flex h-full flex-col rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8"
            >
              <p className={`${legible} font-mono text-xs leading-5 text-amber-200/70`}>
                {project.category}
              </p>
              <h2 className={`${legible} mt-5 text-xl font-medium tracking-tight text-white`}>
                {project.title}
              </h2>
              <p className={`${legible} mt-3 flex-1 text-sm leading-6 text-white/65`}>
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${legible} rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${legible} mt-8 inline-flex items-center gap-2 border-t border-white/10 pt-6 text-sm text-white/85 outline-none transition-colors hover:text-amber-200 focus-visible:ring-2 focus-visible:ring-amber-300`}
              >
                <GithubIcon className="h-4 w-4" />
                View repository
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>

        <p className={`${legible} mt-12 font-mono text-xs text-white/45`}>03 / 04</p>
      </div>
    </main>
  );
}
