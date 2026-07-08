import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Prompt colors sit on parchment at >=24px (large text, 3:1 minimum):
// #D05D15 3.6:1, #7B29A6 5.4:1, #160324 13.6:1, #2E5F53 5.1:1, #B0475A 3.7:1
const PROMPTS = [
  { text: "a brand identity", color: "#D05D15" },
  { text: "a design system", color: "#7B29A6" },
  { text: "a UX audit", color: "#160324" },
  { text: "a product redesign", color: "#2E5F53" },
  { text: "an accessibility review", color: "#B0475A" },
];

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useTypewriter(prompts) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [text, setText] = useState(REDUCED_MOTION ? prompts[0].text : "");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    if (REDUCED_MOTION) return undefined;
    const target = prompts[promptIndex].text;
    let timeout;

    if (phase === "typing") {
      if (text.length < target.length) {
        timeout = setTimeout(() => setText(target.slice(0, text.length + 1)), 45);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), 1600);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 25);
      } else {
        setPromptIndex((i) => (i + 1) % prompts.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, promptIndex, prompts]);

  return { text, color: prompts[promptIndex].color };
}

export default function Contact() {
  const [discipline, setDiscipline] = useState("");
  const [email, setEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const typewriter = useTypewriter(PROMPTS);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!discipline.trim() || !email.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: "New portfolio inquiry",
          "Looking for": discipline,
          email,
          "Deadline": deadline,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Send failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong - please email me directly instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative bg-parchment grain py-[15vh] px-[8vw] md:px-[12vw]">
      <div className="absolute top-0 left-0 right-0 h-px bg-cinnabar" />

      <p className="font-body text-cinnabar-deep text-[13px] tracking-mega uppercase mb-8">
        04 - Contact
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-1">
              <label className="block">
                <span className="font-body text-void/70 text-base tracking-caption block mb-3">
                  I am looking for
                </span>
                <div className="relative">
                  <input
                    type="text"
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value)}
                    className="w-full bg-transparent border-0 border-b-2 border-void/60 focus:border-cinnabar outline-none font-heading text-void pb-3 transition-colors truncate"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)",
                      letterSpacing: "-0.02em",
                    }}
                    required
                  />
                  {!discipline && (
                    <span
                      className="absolute left-0 bottom-3 font-heading pointer-events-none whitespace-nowrap max-w-full truncate"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2.75rem)",
                        letterSpacing: "-0.02em",
                        color: typewriter.color,
                      }}
                    >
                      {typewriter.text}
                      <span className="animate-pulse">|</span>
                    </span>
                  )}
                </div>
              </label>
            </div>
            <div className="md:w-[280px]">
              <label className="block">
                <span className="font-body text-void/70 text-base tracking-caption block mb-3">
                  reach me at
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full bg-transparent border-0 border-b-2 border-void/60 focus:border-cinnabar outline-none font-body text-void pb-3 transition-colors placeholder:text-void/60"
                  style={{ fontSize: "1.25rem" }}
                  required
                />
              </label>
            </div>
            <div className="md:w-[280px]">
              <label className="block">
                <span className="font-body text-void/70 text-base tracking-caption block mb-3">
                  to be finished by <span className="text-void/40">(optional)</span>
                </span>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-void/60 focus:border-cinnabar outline-none font-body text-void pb-3 transition-colors"
                  style={{ fontSize: "1.25rem" }}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="group flex items-center gap-3 self-start md:self-end font-body font-bold text-parchment text-sm tracking-mega uppercase bg-cinnabar-deep px-6 py-3 hover:bg-void transition-colors disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send"}
              <ArrowUpRight
                size={16}
                strokeWidth={1.2}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
          {error && (
            <p role="alert" className="font-body text-cinnabar-deep text-sm tracking-caption mt-4">{error}</p>
          )}
        </form>
      ) : (
        <div className="py-8" role="status">
          <p
            className="font-heading heading-kern text-void leading-none"
            style={{ fontSize: "clamp(2rem, 7vw, 6rem)" }}
          >
            Got it.
          </p>
          <p className="font-body text-void/60 text-lg tracking-caption mt-6">
            I'll reply soon!
          </p>
        </div>
      )}

      <div className="mt-[12vh] flex flex-col md:flex-row gap-8 md:gap-12 border-t border-void/15 pt-12">
        <div className="flex-1">
          <p className="font-body text-void/70 text-sm tracking-mega uppercase mb-2">
            Direct Line
          </p>
          <a
            href="mailto:jose.caselles@gmail.com"
            className="font-heading text-void text-xl md:text-2xl heading-kern hover:text-cinnabar transition-colors"
            data-cursor="hover"
          >
            jose.caselles@gmail.com
          </a>
        </div>
        <div>
          <p className="font-body text-void/70 text-sm tracking-mega uppercase mb-2">
            Located
          </p>
          <p className="font-heading text-void text-xl md:text-2xl heading-kern">
            Argentina
          </p>
        </div>
      </div>
    </section>
  );
}
