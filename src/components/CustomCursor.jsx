import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  // The CSS that hides the native cursor is scoped to this same condition,
  // so users with reduced motion keep their normal pointer.
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion) return;
    let rafId;
    const move = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
      const target = e.target;
      const interactive =
        target.closest('a, button, [data-cursor="hover"], input, textarea, label');
      setIsHovering(!!interactive);
    };
    const down = () => setIsClicking(true);
    const up = () => setIsClicking(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      {/* The dot */}
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.5 : 1})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div
          style={{
            // Keep a visible dot while hovering interactive elements -
            // collapsing to 0 left only a translucent ring to aim with.
            width: isHovering ? "5px" : "7px",
            height: isHovering ? "5px" : "7px",
            backgroundColor: "#F2D2AB",
            borderRadius: "50%",
            transition: "all 0.2s ease-out",
          }}
        />
      </div>
      {/* The lens ring */}
      <div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.4 : 1})`,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          opacity: isHovering ? 1 : 0,
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(123,41,166,0.35) 0%, rgba(123,41,166,0.08) 60%, transparent 100%)",
            backdropFilter: "blur(2px)",
            border: "1px solid rgba(242,210,171,0.3)",
          }}
        />
      </div>
    </>
  );
}