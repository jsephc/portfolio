import React from "react";

export default function Biography() {
  return (
    <section id="biography" className="relative bg-void grain py-[15vh] px-[8vw] md:px-[12vw]">
      <div className="absolute top-0 left-0 right-0 h-px bg-cinnabar/40" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-3">
          <p className="font-body text-cinnabar-bright text-[13px] tracking-mega uppercase mb-4">
            01 - Biography
          </p>
          <img
            src="/mark.png"
            alt=""
            aria-hidden="true"
            className="w-28 md:w-44 ml-6 md:ml-16 mt-24 -rotate-6 opacity-90 transition-transform duration-500 hover:rotate-0"
          />
          <img
            src="/mark-2.png"
            alt=""
            aria-hidden="true"
            className="w-24 md:w-32 ml-24 md:ml-36 mt-6 rotate-6 opacity-90 transition-transform duration-500 hover:rotate-0"
          />
        </div>

        <div className="md:col-span-9">
          <h2
            className="font-heading heading-kern text-parchment leading-[0.95] mb-12"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            José Caselles - Product Designer
            <br />
            based in <em className="text-cinnabar not-italic">Argentina</em>.
          </h2>

          <div className="space-y-8 max-w-3xl">
            <p className="font-body text-parchment/70 text-lg md:text-xl leading-[1.6] tracking-caption">
              I began designing at an early age, exploring tools like Photoshop
              and Illustrator. Over the years, I worked on various projects
              spanning branding, art direction, and digital design.
            </p>
            <p className="font-body text-parchment/70 text-lg md:text-xl leading-[1.6] tracking-caption">
              At ONPOWER, I built the brand's visual identity from scratch and
              shaped its digital experiences. From there I moved into UX/UI,
              leading design strategy and mentoring teams at Novaz Group for
              international clients, then joined{" "}
              <span className="text-cinnabar">Globant</span> to design
              end-to-end products for enterprise clients and lead
              accessibility programs aligned with ADA and WCAG 2.2.
            </p>
            <p className="font-body text-parchment/70 text-lg md:text-xl leading-[1.6] tracking-caption">
              Today, I'm still with{" "}
              <span className="text-cinnabar">Globant</span> - a global
              company - designing end-to-end products and leading
              accessibility work for enterprise clients worldwide. I've also
              taken on a Senior UX Strategist role at Hauler Hero, shaping
              experience frameworks and customer journeys.
            </p>
          </div>

          {/* Focus areas */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              "UI Design",
              "UX Strategy",
              "Design Systems",
              "Accessibility",
              "Art Direction",
              "Branding",
              "Stakeholder Management",
              "Team Leadership",
            ].map((skill) => (
              <div key={skill} className="border-t border-parchment/15 pt-4">
                <p className="font-body text-parchment/60 text-sm tracking-caption uppercase">
                  {skill}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}