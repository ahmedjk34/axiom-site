/**
 * Locked marketing copy for the Axiom homepage.
 * Wording here is intentionally fixed per the brand spec — edit with care.
 */

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export const CONTACT_EMAIL = "hello@axiom.studio";

export const ONE_LINE_TRUTH =
  "A technology solutions studio that builds custom software, AI-powered tools, automation systems, and digital platforms.";

export type Service = {
  id: string;
  pillar: "Build" | "Automate" | "Intelligence" | "Scale";
  headline: string;
  body: string;
  schematic: "framework" | "flow" | "neural" | "grid";
};

export const SERVICES: Service[] = [
  {
    id: "build",
    pillar: "Build",
    headline: "Custom software & platforms",
    body: "For businesses that have outgrown spreadsheets and scattered tools. Dashboards, portals, internal systems, MVPs — built from scratch around how you work.",
    schematic: "framework",
  },
  {
    id: "automate",
    pillar: "Automate",
    headline: "Workflow automation",
    body: "Less manual work, fewer mistakes, faster operations. We connect your tools and automate the repetitive work that slows your team down.",
    schematic: "flow",
  },
  {
    id: "intelligence",
    pillar: "Intelligence",
    headline: "Practical AI",
    body: "AI where it actually creates value — not hype. Assistants, document analysis, smart search, and copilots that do real cognitive work inside your business.",
    schematic: "neural",
  },
  {
    id: "scale",
    pillar: "Scale",
    headline: "Built to grow",
    body: "Systems that stay reliable as you grow. Optimization, deployment, maintenance, and technical guidance for the long term.",
    schematic: "grid",
  },
];

export type Project = {
  id: string;
  name: string;
  tag: string;
  diagram: "transformation" | "commerce" | "procurement";
  /** Bold one-line problem statement. */
  headline: string;
  /** Short supporting line (~2 lines max). */
  summary?: string;
  tags: string[];
  rtl?: boolean;
  owner?: string;
  quote?: string;
  quoteAttribution?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "prospect-engine",
    name: "Prospect Engine",
    tag: "SaaS / Product",
    diagram: "transformation",
    headline: "A spreadsheet-run service, rebuilt as a scalable software product.",
    summary:
      "Product strategy, workflow analysis, and a scalable architecture built around how the business actually runs.",
    tags: [
      "Product Strategy",
      "Workflow Analysis",
      "Custom Software",
      "Scalable Architecture",
    ],
  },
  {
    id: "motasq",
    name: "Motasq",
    tag: "Commerce Infrastructure",
    diagram: "commerce",
    rtl: true,
    owner: "Mohammed Al-Khatib",
    headline: "Group import operations, rebuilt as a platform.",
    summary:
      "A full-stack group-import operating system for Saudi collective sourcing — trader campaigns, staff portals, installment payments, and operational automation.",
    tags: [
      "Commerce Infrastructure",
      "Multi-role Portals",
      "Payment Workflows",
      "Operational Automation",
    ],
    quote:
      "Axiom understood that Motasq was not a normal e-commerce project. They helped structure a complex collective import model into a serious platform with the workflows, payment logic, and operational control we needed to grow.",
    quoteAttribution: "Mohammed Al-Khatib, Motasq",
  },
  {
    id: "adstation",
    name: "adstation",
    tag: "B2B Procurement",
    diagram: "procurement",
    rtl: true,
    owner: "Mohammed Al Alas",
    headline: "B2B procurement, RFQs, contracts, and funding workflows.",
    summary:
      "An Arabic-first B2B platform for advertisers and vendors — vendor discovery, offer comparison, contracts, tranche funding, and disputes.",
    tags: [
      "B2B Marketplace",
      "RFQ Workflows",
      "Contract Lifecycle",
      "Escrow Funding",
    ],
    quote:
      "Axiom understood that adstation needed more than a marketplace interface. They helped build the operational backbone for RFQs, vendors, contracts, funding, disputes, and procurement governance.",
    quoteAttribution: "Mohammed Al Alas, adstation",
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    name: "Understand",
    phase: "Discovery",
    produces: "Problem & workflow map",
    body: "We study the business problem, workflow, users, and goals before building anything.",
  },
  {
    n: "02",
    name: "Design",
    phase: "Blueprint",
    produces: "System architecture",
    body: "We shape the solution structure, features, user flows, and technical direction.",
  },
  {
    n: "03",
    name: "Build",
    phase: "Development",
    produces: "Working system",
    body: "We develop the software, AI tool, automation, or platform.",
  },
  {
    n: "04",
    name: "Launch",
    phase: "Deployment",
    produces: "System in production",
    body: "We test, deploy, refine, and prepare the system for real use.",
  },
  {
    n: "05",
    name: "Improve",
    phase: "Iteration",
    produces: "Continuous improvement",
    body: "We keep improving based on feedback, data, and changing business needs.",
  },
] as const;

export const WHY_STATEMENTS = [
  "Business-first thinking — we solve the problem, not just ship the feature.",
  "Practical AI, not hype.",
  "Custom systems, not templates.",
  "Clear communication, reliable execution.",
  "One partner across software, automation, and AI.",
] as const;
