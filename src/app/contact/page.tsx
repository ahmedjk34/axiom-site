import type { Metadata } from "next";
import { ScaffoldPage } from "@/components/sections/ScaffoldPage";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have a workflow, idea, or product to build? Let's turn it into a system that works.",
};

export default function ContactPage() {
  return (
    <ScaffoldPage
      eyebrow="// START A PROJECT"
      title="Let's turn it into a system that works."
      intro={`Tell us about the workflow, idea, or product you want to build. Email ${CONTACT_EMAIL} and we'll take it from there.`}
    />
  );
}
