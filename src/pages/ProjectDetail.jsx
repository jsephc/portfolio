import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Menu, ArrowLeft } from "lucide-react";
import PROJECTS from "@/lib/projects.json";
import MenuOverlay from "@/components/MenuOverlay";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";

const MEDIA_TAG = /\[(img|video)\](.+?)\[\/\1\]/g;

function getYouTubeId(url) {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function YouTubeEmbed({ url }) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return (
    <div className="relative overflow-hidden my-2" style={{ aspectRatio: "16 / 9" }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="YouTube video"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function renderInline(text) {
  const parts = text.split(MEDIA_TAG);
  const nodes = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    const [type, value] = [parts[i + 1], parts[i + 2]];
    if (type === "img") {
      nodes.push(<img key={i} src={value} alt="" className="inline-block max-w-full h-auto align-middle my-2" />);
    } else if (type === "video") {
      nodes.push(<YouTubeEmbed key={i} url={value} />);
    }
  }
  return nodes;
}

function ParagraphBlock({ text, imageFit = "crop" }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const isList = lines.length > 0 && lines.every((l) => l.startsWith("- "));
  if (isList) {
    return (
      <ul className="space-y-3">
        {lines.map((line, i) => (
          <li
            key={i}
            className="font-body text-parchment/70 text-base md:text-lg leading-[1.6] tracking-caption flex gap-3"
          >
            <span className="text-cinnabar mt-1 flex-shrink-0">-</span>
            <span>{renderInline(line.slice(2))}</span>
          </li>
        ))}
      </ul>
    );
  }

  const soloMedia = text.trim().match(/^\[(img|video)\](.+?)\[\/\1\]$/);
  if (soloMedia) {
    const [, type, value] = soloMedia;
    if (type === "video") return <YouTubeEmbed url={value} />;
    if (imageFit === "natural") {
      return <img src={value} alt="" className="w-full h-auto" />;
    }
    return (
      <div className="relative overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <img src={value} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <p className="font-body text-parchment/70 text-base md:text-lg leading-[1.6] tracking-caption">
      {renderInline(text)}
    </p>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(project?.sections?.[0]?.id);
  const sectionRefs = useRef({});

  useEffect(() => {
    if (!project) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [project]);

  if (!project) return <NotFound />;

  const isGallery = project.layout === "gallery";

  return (
    <main className="relative bg-void">
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="sticky top-0 z-30 flex items-center justify-between px-[8vw] md:px-[12vw] py-6 md:py-8 bg-void/90 backdrop-blur-sm border-b border-parchment/10">
        <Link
          to="/"
          className="flex items-center gap-2 font-body text-parchment hover:text-cinnabar transition-colors text-[13px] tracking-mega uppercase"
        >
          <ArrowLeft size={14} strokeWidth={1.2} />
          Index
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-3 font-body text-parchment hover:text-cinnabar transition-colors text-[13px] tracking-mega uppercase"
          aria-label="Open menu"
        >
          <span>Menu</span>
          <Menu size={16} strokeWidth={1.2} />
        </button>
      </div>

      {isGallery ? (
        <article className="grain px-[8vw] md:px-[12vw] py-[10vh]">
          <div className="max-w-3xl mx-auto">
            <p className="font-body text-cinnabar text-[13px] tracking-mega uppercase mb-4">
              {project.id} - {project.discipline}
            </p>
            <h1
              className="font-heading heading-kern text-parchment leading-none mb-16"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              {project.title}
            </h1>

            <img src={project.image} alt={project.title} className="w-full h-auto" />

            <div>
              {project.sections.flatMap((section) => section.body).map((paragraph, i) => (
                <ParagraphBlock key={i} text={paragraph} imageFit="natural" />
              ))}
            </div>
          </div>
        </article>
      ) : (
        <article className="grain px-[8vw] md:px-[12vw] py-[10vh] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Content */}
          <div className="md:col-span-8">
            <p className="font-body text-cinnabar text-[13px] tracking-mega uppercase mb-4">
              {project.id} - {project.discipline}
            </p>
            <h1
              className="font-heading heading-kern text-parchment leading-none mb-10"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              {project.title}
            </h1>

            <div className="relative overflow-hidden mb-16" style={{ aspectRatio: "16 / 10" }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-16 max-w-2xl">
              {project.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="scroll-mt-32"
                >
                  <h2 className="font-heading heading-kern text-parchment text-2xl md:text-3xl mb-6">
                    {section.label}
                  </h2>
                  <div className="space-y-5">
                    {section.body.map((paragraph, i) => (
                      <ParagraphBlock key={i} text={paragraph} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* Table of contents */}
          <nav className="md:col-span-4">
            <div className="md:sticky md:top-32">
              <p className="font-body text-parchment/40 text-[12px] tracking-mega uppercase mb-6">
                Table of Contents
              </p>
              <ul className="space-y-3 border-l border-parchment/15">
                {project.sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block pl-5 py-1 -ml-px border-l transition-colors duration-300 font-body text-base tracking-caption"
                        style={{
                          borderColor: isActive ? "#D05D15" : "transparent",
                          color: isActive ? "#D05D15" : "rgba(242,210,171,0.5)",
                        }}
                        data-cursor="hover"
                      >
                        {section.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </article>
      )}

      <Footer />
    </main>
  );
}
