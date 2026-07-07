import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-void grain px-[8vw] md:px-[12vw] py-[8vh]">
      <div className="absolute top-0 left-0 right-0 h-px bg-cinnabar/40" />

      <div className="flex flex-col gap-12">
        {/* Massive footer wordmark - decorative, hidden from assistive tech
            (the 1.5:1 contrast is intentional; it is not content) */}
        <div
          aria-hidden="true"
          className="font-heading heading-kern text-parchment/10 leading-none text-center"
          style={{ fontSize: "clamp(3rem, 16vw, 14rem)" }}
        >
          CASELLES
        </div>

        <p className="font-body text-parchment/70 text-[14px] tracking-mega uppercase text-center border-t border-parchment/10 pt-8">
          © {year} - José Caselles · Product Designer
        </p>
      </div>
    </footer>
  );
}
