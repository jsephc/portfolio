import React, { useState, useEffect } from "react";

export default function ScrollSignature() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const padded = String(progress).padStart(2, "0");

  return (
    <div
      aria-hidden="true"
      className="fixed right-3 top-0 z-[9000] hidden md:flex h-screen flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative h-[50vh] w-px bg-parchment/15">
        <div
          className="absolute left-0 top-0 w-px bg-cinnabar transition-all duration-150 ease-out"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="font-heading text-cinnabar text-sm mt-3 tracking-caption">
        {padded} <span className="text-parchment/40">//</span> 100
      </span>
    </div>
  );
}