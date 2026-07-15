import React, { useState } from "react";
import { Link } from "react-router-dom";
import PROJECTS from "@/lib/projects.json";
import { Plus } from "lucide-react";

export default function SelectedWorks() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="works" className="relative bg-void grain py-[12vh] px-[8vw] md:px-[12vw]">
      <div className="absolute top-0 left-0 right-0 h-px bg-cinnabar/40" />

      <div className="mb-16 md:mb-24">
        <p className="font-body text-cinnabar-bright text-[13px] tracking-mega uppercase mb-4">
          03 - Case Studies
        </p>
        <h2
          className="font-heading heading-kern text-parchment leading-none"
          style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
        >
          Selected
          <br />
          Works
        </h2>
      </div>

      <div className="space-y-0">
        {PROJECTS.map((project, i) => {
          const isHovered = hovered === i;
          return (
            <Link
              key={project.id}
              to={`/works/${project.slug}`}
              className="group block border-t border-parchment/15 last:border-b"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <div className="grid grid-cols-12 items-center gap-4 py-6 md:py-10 transition-all duration-500 relative overflow-hidden">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: "linear-gradient(90deg, rgba(123,41,166,0.12) 0%, transparent 70%)",
                  }}
                />
                <div className="col-span-2 md:col-span-1">
                  <span className="font-heading text-cinnabar text-base md:text-2xl">
                    {project.id}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-5">
                  <h3
                    className="font-heading heading-kern text-parchment transition-colors duration-500"
                    style={{
                      fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                      color: isHovered ? "#D05D15" : "#F2D2AB",
                    }}
                  >
                    {project.title}
                  </h3>
                </div>
                <div className="col-span-7 md:col-span-3">
                  <p className="font-body text-parchment/70 text-sm tracking-caption uppercase">
                    {project.discipline}
                  </p>
                </div>
                <div className="col-span-3 md:col-span-2 text-right">
                  <span className="font-body text-parchment/70 text-sm tracking-caption">
                    {project.year}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end">
                  <Plus
                    size={20}
                    strokeWidth={1}
                    className="text-parchment transition-all duration-500"
                    style={{
                      transform: isHovered ? "rotate(45deg)" : "rotate(0deg)",
                      color: isHovered ? "#D05D15" : "#F2D2AB",
                    }}
                  />
                </div>
              </div>

              {/* Hover preview image */}
              <div
                className="overflow-hidden transition-all duration-700"
                style={{
                  // 600px accommodates the stacked mobile layout; on md+ the
                  // row is ~360px. The image height is capped below so the
                  // centered description can never fall outside the clip.
                  maxHeight: isHovered ? "600px" : "0px",
                  opacity: isHovered ? 1 : 0,
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10">
                  <div className="relative overflow-hidden" style={{ height: "320px" }}>
                    <img
                      src={project.worksImage}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(123,41,166,0.2) 0%, transparent 60%)",
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="font-body text-parchment/70 text-lg leading-[1.6] tracking-caption">
                      {project.description}
                    </p>
                    <div className="mt-8 flex gap-4">
                      <span className="font-body text-cinnabar-bright text-sm tracking-mega uppercase border-b border-cinnabar-bright pb-1">
                        View Case Study
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}