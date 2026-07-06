import React, { useState } from "react";
import { EXPERIENCE } from "@/lib/experience";

export default function Experience() {
  const [active, setActive] = useState(0);
  const job = EXPERIENCE[active];

  return (
    <section id="experience" className="relative gradient-void-depth grain py-[15vh] px-[8vw] md:px-[12vw]">
      <div className="absolute top-0 left-0 right-0 h-px bg-cinnabar/40" />

      <div className="mb-16 md:mb-24">
        <p className="font-body text-cinnabar text-[13px] tracking-mega uppercase mb-4">
          02 - Where I've Worked
        </p>
        <h2
          className="font-heading heading-kern text-parchment leading-none"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          Experience
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
        {/* Timeline list */}
        <div className="md:col-span-5">
          <ul className="space-y-0">
            {EXPERIENCE.map((exp, i) => {
              const isActive = active === i;
              return (
                <li key={`${exp.company}-${exp.role}-${i}`}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className="group w-full text-left border-t border-parchment/15 last:border-b py-6 transition-colors duration-300"
                    data-cursor="hover"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <h3
                          className="font-heading heading-kern transition-colors duration-300"
                          style={{
                            fontSize: "clamp(1.25rem, 3vw, 2rem)",
                            color: isActive ? "#D05D15" : "#F2D2AB",
                          }}
                        >
                          {exp.company}
                        </h3>
                        <p className="font-body text-parchment/50 text-sm tracking-caption mt-1">
                          {exp.role}
                        </p>
                      </div>
                      <span className="font-body text-parchment/40 text-[12px] tracking-caption whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Active detail */}
        <div className="md:col-span-7 md:sticky md:top-[10vh] md:self-start">
          <div
            key={active}
            className="border border-parchment/10 p-8 md:p-12"
            style={{
              background: "rgba(22, 3, 36, 0.5)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h4 className="font-heading heading-kern text-cinnabar text-2xl md:text-3xl">
                  {job.role}
                </h4>
                <p className="font-body text-parchment text-base tracking-caption mt-1">
                  {job.company}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <span className="font-body text-parchment/50 text-sm tracking-mega uppercase">
                {job.period}
              </span>
              <span className="font-body text-parchment/30">·</span>
              <span className="font-body text-parchment/50 text-sm tracking-mega uppercase">
                {job.location}
              </span>
            </div>

            {job.positions ? (
              <div className="space-y-8">
                {job.positions.map((position, i) => (
                  <div key={i} className={i > 0 ? "border-t border-parchment/10 pt-8" : ""}>
                    <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                      <h5 className="font-heading heading-kern text-parchment text-lg md:text-xl">
                        {position.role}
                      </h5>
                      {position.period && (
                        <span className="font-body text-parchment/40 text-[12px] tracking-mega uppercase whitespace-nowrap">
                          {position.period}
                        </span>
                      )}
                    </div>
                    <p className="font-body text-parchment/70 text-base leading-[1.6] tracking-caption mb-6">
                      {position.summary}
                    </p>
                    <ul className="space-y-3">
                      {position.highlights.map((h, hi) => (
                        <li
                          key={hi}
                          className="font-body text-parchment/60 text-sm leading-[1.6] tracking-caption flex gap-3"
                        >
                          <span className="text-cinnabar mt-1 flex-shrink-0">-</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="font-body text-parchment/70 text-base md:text-lg leading-[1.6] tracking-caption mb-8">
                  {job.summary}
                </p>

                <div className="space-y-4">
                  <p className="font-body text-cinnabar text-[12px] tracking-mega uppercase">
                    Key Contributions
                  </p>
                  <ul className="space-y-3">
                    {job.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="font-body text-parchment/60 text-sm leading-[1.6] tracking-caption flex gap-3"
                      >
                        <span className="text-cinnabar mt-1 flex-shrink-0">-</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}