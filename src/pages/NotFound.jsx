import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-void grain px-[8vw] text-center">
      <p className="font-body text-cinnabar text-[13px] tracking-mega uppercase mb-6">
        404 - Lost in the Void
      </p>
      <h1
        className="font-heading heading-kern text-parchment leading-none mb-8"
        style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
      >
        Not Found
      </h1>
      <Link
        to="/"
        className="font-body text-parchment text-sm tracking-mega uppercase border-b border-parchment/40 pb-1 hover:text-cinnabar hover:border-cinnabar transition-colors"
        data-cursor="hover"
      >
        Return Home
      </Link>
    </main>
  );
}
