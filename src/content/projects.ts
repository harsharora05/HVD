import type { ServiceSlug } from "./services";

/**
 * Portfolio content.
 *
 * - `kind: "client"` — genuine delivered work. Only add these with the client's permission,
 *   and only publish outcomes you can substantiate.
 * - `kind: "demo"` — a demonstration / concept project that shows how HVD approaches a problem.
 *   Demo projects are labelled on the site and their results are framed as *target* outcomes,
 *   never as achieved business results.
 *
 * `mockup` selects the illustrative interface rendered for the project. To use a real
 * screenshot instead, place it in /public/work and set `image`.
 */
export type Project = {
  slug: string;
  kind: "client" | "demo";
  title: string;
  client?: string;
  industry: string;
  services: ServiceSlug[];
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  outcomes: string[];
  technologies: string[];
  mockup: "dashboard" | "mobile" | "assistant" | "workflow";
  image?: { src: string; alt: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "knowledge-assistant",
    kind: "demo",
    title: "AI Knowledge Assistant",
    industry: "Professional services",
    services: ["ai-solutions", "web-development"],
    summary:
      "A secure assistant that answers staff questions from internal policies, proposals and project documents — with every answer linked to its source.",
    challenge:
      "Knowledge spread across shared drives, wikis and inboxes means employees spend time searching for answers and senior staff repeatedly field the same questions.",
    solution:
      "A retrieval-augmented generation (RAG) assistant that indexes approved documents, respects existing access permissions and cites the exact passages behind every answer. An admin console manages sources and reviews answer quality.",
    features: [
      "Permission-aware document retrieval",
      "Answers with inline source citations",
      "Feedback loop and answer evaluation dashboard",
      "Single sign-on and audit logging",
    ],
    outcomes: [
      "Reduce time spent searching for internal information",
      "Give new hires self-serve access to institutional knowledge",
      "Keep answers traceable to approved sources",
    ],
    technologies: ["Next.js", "Python", "FastAPI", "LangChain", "OpenAI APIs", "PostgreSQL"],
    mockup: "assistant",
    featured: true,
  },
  {
    slug: "field-service-app",
    kind: "demo",
    title: "Field Service Mobile App",
    industry: "Operations & maintenance",
    services: ["mobile-app-development", "custom-software"],
    summary:
      "A cross-platform app that gives field technicians their schedule, job details, checklists and customer sign-off — even without a signal.",
    challenge:
      "Paper job sheets and phone calls make it hard to know which jobs are complete, create re-work from missing information, and delay invoicing.",
    solution:
      "An offline-first React Native app for technicians, synced to a web dispatch console. Jobs, photos and signatures sync automatically when connectivity returns, and completed jobs trigger invoicing workflows.",
    features: [
      "Offline-first job data with background sync",
      "Photo capture, checklists and digital signatures",
      "Live dispatch board for coordinators",
      "Automatic job-complete notifications",
    ],
    outcomes: [
      "Replace paper job sheets with structured digital records",
      "Give coordinators real-time visibility of job status",
      "Shorten the time between job completion and invoicing",
    ],
    technologies: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    mockup: "mobile",
    featured: true,
  },
  {
    slug: "saas-operations-dashboard",
    kind: "demo",
    title: "SaaS Operations Dashboard",
    industry: "B2B software",
    services: ["web-development"],
    summary:
      "A multi-tenant analytics dashboard that turns product and billing data into clear, real-time insight for customer success teams.",
    challenge:
      "Customer health signals live in separate billing, support and product-usage tools, so at-risk accounts are often noticed too late.",
    solution:
      "A Next.js dashboard backed by an event pipeline that unifies usage, billing and support data per account, with configurable health scores, alerts and role-based access.",
    features: [
      "Unified account health scoring",
      "Configurable alerts and weekly digests",
      "Role-based, multi-tenant access",
      "Exportable reports and API access",
    ],
    outcomes: [
      "Surface at-risk accounts earlier",
      "Replace manual spreadsheet reporting",
      "Give every team the same view of each customer",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    mockup: "dashboard",
    featured: true,
  },
  {
    slug: "invoice-automation",
    kind: "demo",
    title: "Invoice Processing Automation",
    industry: "Finance operations",
    services: ["ai-solutions", "custom-software"],
    summary:
      "A document-intelligence workflow that reads supplier invoices, validates them against purchase orders and routes exceptions for approval.",
    challenge:
      "Finance teams manually key invoice data from PDFs and emails, check it against purchase orders and chase approvals by email.",
    solution:
      "An AI pipeline extracts invoice fields, matches them to purchase orders through ERP APIs and sends only mismatches to a reviewer. Approved invoices post automatically, with a full audit trail.",
    features: [
      "AI field extraction from PDFs and email attachments",
      "Automatic purchase-order matching",
      "Exception queue with approval workflow",
      "ERP integration and audit trail",
    ],
    outcomes: [
      "Reduce manual data entry for finance teams",
      "Focus reviewers on genuine exceptions",
      "Keep a complete, auditable approval history",
    ],
    technologies: ["Python", "FastAPI", "LangGraph", "OpenAI APIs", "Spring Boot", "PostgreSQL"],
    mockup: "workflow",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
