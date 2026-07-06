import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import PROJECTS from "@/lib/projects.json";

export default function Hero({ onMenuOpen }) {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(0, rect.top);
      const pct = total > 0 ? Math.min(1, Math.abs(scrolled) / total) : 0;
      setScrollProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" ref={scrollRef} className="relative" style={{ height: "210vh" }}>
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden grain bg-void flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-[8vw] md:px-[12vw] py-6 md:py-8">
          <div className="font-body text-parchment text-[13px] tracking-mega uppercase">
            José Caselles - Product Designer
          </div>
          <button
            onClick={onMenuOpen}
            className="flex items-center gap-3 font-body text-parchment hover:text-cinnabar transition-colors text-[13px] tracking-mega uppercase"
            aria-label="Open menu"
          >
            <span>Index</span>
            <Menu size={16} strokeWidth={1.2} />
          </button>
        </div>

        {/* Intro line */}
        <div className="px-[8vw] md:px-[12vw] pb-6">
          <h1
            className="font-heading heading-kern text-parchment leading-[1.05] mb-6"
            style={{ fontSize: "clamp(1.5rem, 4.5vw, 3.25rem)" }}
          >
            Product design across brand,
            <br />
            UI, and spatial systems.
          </h1>
          <a
            href="#contact"
            className="inline-block font-body font-bold text-void bg-cinnabar text-sm tracking-mega uppercase px-6 py-3 hover:bg-parchment transition-colors"
          >
            Send Me a Message
          </a>
        </div>

        {/* Horizontal scrub track - fills remaining space, centered vertically */}
        <div className="flex-1 min-h-0 flex items-center overflow-hidden">
          <div
            className="flex gap-[2vw]"
            style={{
              transform: `translateX(calc(-${scrollProgress} * (100% - 100vw + 8vw)))`,
              willChange: "transform",
              paddingLeft: "8vw",
            }}
          >
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {/* End cap */}
            <div className="flex items-center pl-[6vw] pr-[12vw]">
              <div className="max-w-xs">
                <p className="font-body text-parchment/50 text-sm tracking-caption leading-relaxed">
                  A decade of designing systems, brands, and experiences across Argentina and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rule line */}
        <div>
          <div className="h-px bg-cinnabar/40" />
          <div className="flex items-center justify-between px-[8vw] md:px-[12vw] py-4">
            <span className="font-body text-parchment/40 text-[12px] tracking-mega uppercase">
              Scroll for work
            </span>
            <span className="font-heading text-cinnabar text-base">
              {String(Math.round(scrollProgress * 6 + 1)).padStart(2, "0")} / 06
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/works/${project.slug}`}
      className="relative flex-shrink-0 group block"
      style={{ width: "clamp(200px, min(30vw, 26vh), 440px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative overflow-hidden transition-all duration-500"
        style={{
          aspectRatio: "3 / 4",
          boxShadow: hovered
            ? "0 0 100px 10px rgba(123,41,166,0.5)"
            : "0 0 40px 0 rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            filter: hovered ? "brightness(1.1)" : "brightness(0.7)",
          }}
        />
        {/* Liquid glass overlay on hover */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: "linear-gradient(135deg, rgba(123,41,166,0.15) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-heading text-parchment text-lg md:text-xl heading-kern leading-tight truncate">
            {project.title}
          </h3>
          <p className="font-body text-parchment/50 text-xs md:text-sm tracking-caption mt-1 truncate">
            {project.discipline}
          </p>
        </div>
        <span className="font-heading text-cinnabar text-base flex-shrink-0">
          {project.id}
        </span>
      </div>
    </Link>
  );
}