import type { Metadata } from "next";
import { ScaffoldPage } from "@/components/sections/ScaffoldPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Build, Automate, Intelligence, Scale — four ways Axiom moves your business forward.",
};

export default function ServicesPage() {
  return (
    <ScaffoldPage
      eyebrow="// CAPABILITIES"
      title="Four ways we move your business forward."
      intro="Custom software, workflow automation, practical AI, and systems built to grow. A detailed services breakdown lives here — for now, see the capabilities overview on the homepage."
    />
  );
}
