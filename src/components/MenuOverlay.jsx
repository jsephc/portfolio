import React, { useState, useEffect, useRef } from "react";
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
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Dialog behavior: focus moves in on open, Escape closes, Tab cycles
  // within the overlay, and focus returns to the opener on close.
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const opener = document.activeElement;
    overlay.querySelector("button")?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = overlay.querySelectorAll("button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, [open, onClose]);

  const handleNav = (target) => {
    onClose();
    navigate(`/#${target}`);
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={`fixed inset-0 z-[9500] transition-[opacity,visibility] duration-500 ${
        open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
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
        <p className="font-body text-parchment/60 text-sm tracking-mega uppercase mb-8 md:mb-12">
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
                <span
                  aria-hidden="true"
                  className="font-body text-sm align-top text-parchment/60 mr-4 tracking-caption"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-6 left-[8vw] md:bottom-10 md:left-[12vw] font-body text-parchment/60 text-[12px] tracking-mega uppercase">
        José Caselles - Product Designer · Argentina
      </div>
    </div>
  );
}
