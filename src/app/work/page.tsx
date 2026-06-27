import type { Metadata } from "next";
import { ScaffoldPage } from "@/components/sections/ScaffoldPage";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected systems and digital products — platforms built around operational complexity.",
};

export default function WorkPage() {
  return (
    <ScaffoldPage
      eyebrow="// PROOF OF EXECUTION"
      title="Selected systems & digital products."
      intro="Platforms built around operational complexity — Prospect Engine, Motasq, and adstation. Full case studies live here; the homepage carries the highlights."
    />
  );
}
