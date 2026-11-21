import BlackHoleSegment from "@/components/BlackHoleSegment";
import { FOCUS_PILLARS, TECH_STACK } from "@/data/portfolioData";

const legible = "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]";

export default function FocusPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black">
      {/* Segment B — tilted vortex, bright behind the clear glass cards. */}
      <BlackHoleSegment startTime={10} endTime={12} className="opacity-95" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-28 sm:px-10 lg:px-16">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className={`${legible} text-xs font-medium tracking-wide text-amber-200/70`}>
              02 / Core focus
            </p>
            <h1 className={`${legible} mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl`}>
              Three areas of focus
            </h1>
          </div>
          <p className={`${legible} max-w-sm text-sm leading-6 text-white/70`}>
            Core areas across AI security, application defense, and software engineering.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {FOCUS_PILLARS.map((pillar) => (
            <article
              key={pillar.number}
              className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 backdrop-blur-md sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className={`${legible} font-mono text-xs tabular-nums text-amber-200/70`}>
                  {pillar.number}
                </span>
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-300/60" />
              </div>
              <h2 className={`${legible} mt-6 text-lg font-medium tracking-tight text-white`}>
                {pillar.title}
              </h2>
              <p className={`${legible} mt-3 text-sm leading-6 text-white/65`}>
                {pillar.description}
              </p>
            </article>
          ))}
        </div>

        <section className="mt-10 border-t border-white/10 pt-8">
          <h2 className={`${legible} mb-4 text-xs font-medium text-white/55`}>Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className={`${legible} rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-xs text-white/80 backdrop-blur-md`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <p className={`${legible} mt-12 font-mono text-xs text-white/45`}>02 / 04</p>
      </div>
    </main>
  );
}
