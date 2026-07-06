import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Index", target: "hero" },
  { label: "Biography", target: "biography" },
  { label: "Experience", target: "experience" },
  { label: "Works", target: "works" },
  { label: "Contact", target: "contact" },
];

export default function MenuOverlay({ open, onClose }) {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleNav = (target) => {
    onClose();
    navigate(`/#${target}`);
  };

  return (
    <div
      className={`fixed inset-0 z-[9500] transition-opacity duration-500 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{
        background: hovered !== null
          ? "linear-gradient(135deg, #160324 0%, #2a0a3f 50%, #7B29A6 100%)"
          : "#160324",
        transition: "background 0.6s ease",
      }}
    >
      <div className="grain absolute inset-0" />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-10 md:right-12 z-10 text-parchment hover:text-cinnabar transition-colors"
        aria-label="Close menu"
      >
        <X size={28} strokeWidth={1.2} />
      </button>

      <nav className="relative h-full flex flex-col justify-center pl-[8vw] md:pl-[12vw]">
        <p className="font-body text-parchment/40 text-sm tracking-mega uppercase mb-8 md:mb-12">
          Navigate
        </p>
        <ul className="space-y-2 md:space-y-3">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label}>
              <button
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleNav(item.target)}
                className="font-heading heading-kern text-left transition-colors duration-300"
                style={{
                  fontSize: "clamp(2.5rem, 9vw, 8rem)",
                  lineHeight: 1.05,
                  color: hovered === i ? "#D05D15" : "#F2D2AB",
                }}
              >
                <span className="font-body text-sm align-top text-parchment/30 mr-4 tracking-caption">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-[8vw] md:bottom-10 md:left-[12vw] font-body text-parchment/30 text-[12px] tracking-mega uppercase">
        José Caselles - Product Designer · Argentina
      </div>
    </div>
  );
}