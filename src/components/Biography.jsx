import React from "react";

export default function Biography() {
  return (
    <section id="biography" className="relative bg-void grain py-[15vh] px-[8vw] md:px-[12vw]">
      <div className="absolute top-0 left-0 right-0 h-px bg-cinnabar/40" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <div className="md:col-span-3">
          <p className="font-body text-cinnabar text-[13px] tracking-mega uppercase mb-4">
            01 - Biography
          </p>
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
              At ONPOWER, I developed the visual identity from scratch and
              coordinated the creative areas to maintain brand consistency.
              Later, at Novaz Group, I focused on UI/UX design for clients
              across different sectors.
            </p>
            <p className="font-body text-parchment/70 text-lg md:text-xl leading-[1.6] tracking-caption">
              Currently, I am a Visual Designer at{" "}
              <span className="text-cinnabar">Globant</span>, where I integrate
              design, strategy, and accessibility to create consistent and
              inclusive digital experiences.
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
              <div
                key={skill}
                className="border-t border-parchment/15 pt-4"
              >
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