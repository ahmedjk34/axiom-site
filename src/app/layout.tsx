import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://axiom.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Axiom — Technology Solutions Studio",
    template: "%s — Axiom",
  },
  description:
    "Axiom is a technology solutions studio that builds custom software, AI-powered tools, automation systems, and digital platforms for businesses that need practical, reliable technology.",
  keywords: [
    "technology studio",
    "custom software",
    "AI tools",
    "workflow automation",
    "digital platforms",
    "software development",
  ],
  openGraph: {
    title: "Axiom — Technology Solutions Studio",
    description:
      "Software, AI, and automation built around your business. Axiom turns complex workflows and product ideas into reliable digital systems.",
    url: SITE_URL,
    siteName: "Axiom",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axiom — Technology Solutions Studio",
    description:
      "Software, AI, and automation built around your business.",
  },
  icons: {
    icon: "/AXIOM_LOGO_SOLO.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1628",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
