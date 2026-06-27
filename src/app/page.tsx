import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Services } from "@/components/sections/Services";
import { Testimonial } from "@/components/sections/Testimonial";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Process } from "@/components/sections/Process";
import { WhyAxiom } from "@/components/sections/WhyAxiom";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-text-primary"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <Services />
        <Testimonial />
        <SelectedWork />
        <Process />
        <WhyAxiom />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
