import type { Metadata } from "next";
import { ScaffoldPage } from "@/components/sections/ScaffoldPage";

export const metadata: Metadata = {
  title: "Process",
  description:
    "From problem to working system — understand, design, build, launch, improve.",
};

export default function ProcessPage() {
  return (
    <ScaffoldPage
      eyebrow="// HOW WE WORK"
      title="From problem to working system."
      intro="Understand, design, build, launch, improve. A deeper look at how we work lives here — the homepage walks through the sequence."
    />
  );
}
