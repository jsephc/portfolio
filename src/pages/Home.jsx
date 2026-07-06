import React, { useState } from "react";
import ScrollSignature from "@/components/ScrollSignature";
import MenuOverlay from "@/components/MenuOverlay";
import Hero from "@/components/Hero";
import Biography from "@/components/Biography";
import Experience from "@/components/Experience";
import SelectedWorks from "@/components/SelectedWorks";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative bg-void">
      <ScrollSignature />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Hero onMenuOpen={() => setMenuOpen(true)} />
      <Biography />
      <Experience />
      <SelectedWorks />
      <Contact />
      <Footer />
    </main>
  );
}