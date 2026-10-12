export type ServiceSlug = "web-development" | "mobile-app-development" | "ai-solutions" | "custom-software";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  headline: string;
  intro: string;
  keyCapabilities: string[];
  capabilities: { title: string; description: string }[];
  outcomes: string[];
  idealFor: string[];
  technologies: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web",
    eyebrow: "Websites & web platforms",
    summary:
      "Modern websites, scalable web applications, SaaS platforms, dashboards, and secure backend systems.",
    headline: "Web products that are fast, secure, and built to scale.",
    intro:
      "From a high-converting company website to a multi-tenant SaaS platform, we design and engineer web experiences that load quickly, rank well, and grow with your business.",
    keyCapabilities: ["Marketing websites", "Web applications", "SaaS platforms", "Admin dashboards", "Secure APIs & backends"],
    capabilities: [
      {
        title: "Business websites",
        description: "Fast, SEO-ready websites with a content model your team can update without a developer.",
      },
      {
        title: "Web applications",
        description: "Customer portals, booking systems, marketplaces and internal tools with thoughtful UX.",
      },
      {
        title: "SaaS platforms",
        description: "Multi-tenant architecture, subscriptions, role-based access and usage analytics.",
      },
      {
        title: "Dashboards & analytics",
        description: "Clear, real-time views of the numbers that matter, built on reliable data pipelines.",
      },
      {
        title: "Backend systems & APIs",
        description: "Secure, well-documented services with authentication, caching and observability.",
      },
      {
        title: "Performance & modernization",
        description: "Audits and rebuilds that improve Core Web Vitals, accessibility and maintainability.",
      },
    ],
    outcomes: [
      "Faster page loads and better search visibility",
      "Interfaces customers find easy to use",
      "Architecture that handles growth without rewrites",
    ],
    idealFor: ["Startups launching an MVP", "Businesses replacing an outdated site", "Teams building a SaaS product"],
    technologies: ["React", "Next.js", "Angular", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    faqs: [
      {
        question: "Can you redesign our existing website without losing search rankings?",
        answer:
          "Yes. We map existing URLs, preserve or redirect them, carry over metadata and measure performance before and after launch.",
      },
      {
        question: "Will our team be able to edit content?",
        answer:
          "We structure content so it is easy to update, and can integrate a headless CMS when your team needs regular publishing.",
      },
      {
        question: "Do you build only the frontend, or the backend too?",
        answer: "Both. We deliver complete products — interface, APIs, database, authentication, hosting and monitoring.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Application Development",
    shortTitle: "Mobile",
    eyebrow: "iOS & Android",
    summary:
      "Intuitive, high-performance mobile applications for iOS and Android using modern development technologies.",
    headline: "Mobile apps people enjoy using every day.",
    intro:
      "We build cross-platform and native-quality mobile applications with smooth interactions, offline support and the integrations your business depends on.",
    keyCapabilities: ["Cross-platform apps", "Native-quality UX", "Offline-first data", "Push notifications", "App store launch"],
    capabilities: [
      {
        title: "Cross-platform development",
        description: "One codebase for iOS and Android with React Native or Flutter — faster delivery, lower cost.",
      },
      {
        title: "Product & interface design",
        description: "Flows designed around real user tasks, platform conventions and accessibility.",
      },
      {
        title: "Offline & real-time",
        description: "Local storage, background sync and live updates for apps used on the move.",
      },
      {
        title: "Device capabilities",
        description: "Camera, location, biometrics, payments and notifications integrated securely.",
      },
      {
        title: "Backend & integrations",
        description: "APIs, authentication and admin panels that power the app behind the scenes.",
      },
      {
        title: "Release & growth",
        description: "App Store and Play Store submission, analytics, crash reporting and iterative releases.",
      },
    ],
    outcomes: [
      "A single codebase serving both major platforms",
      "Reliable performance on everyday devices",
      "A release process that supports continuous improvement",
    ],
    idealFor: ["Consumer apps", "Field and operations teams", "Companion apps for existing platforms"],
    technologies: ["React Native", "Flutter", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "MongoDB", "AWS"],
    faqs: [
      {
        question: "Should we build native or cross-platform?",
        answer:
          "For most products, cross-platform frameworks deliver native-quality results with one codebase. We recommend native only when a feature genuinely needs it.",
      },
      {
        question: "Do you handle App Store and Play Store publishing?",
        answer: "Yes — we prepare store listings, handle review requirements and set up release pipelines.",
      },
      {
        question: "Can the app work without an internet connection?",
        answer: "Yes. We design offline-first data flows that sync safely when connectivity returns.",
      },
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI Solutions",
    shortTitle: "AI",
    eyebrow: "Applied artificial intelligence",
    summary:
      "AI agents, intelligent assistants, business automation, RAG applications, and AI integrations that improve productivity and decision-making.",
    headline: "Practical AI that saves time and supports better decisions.",
    intro:
      "We help you identify where AI creates real value, then build secure, reliable systems — assistants that answer from your own knowledge, agents that complete routine work, and integrations that fit into the tools you already use.",
    keyCapabilities: ["AI agents & workflows", "Intelligent assistants", "RAG knowledge systems", "Document intelligence", "AI integrations"],
    capabilities: [
      {
        title: "AI agents & multi-agent workflows",
        description: "Agents that plan and complete multi-step tasks, with human approval where it matters.",
      },
      {
        title: "Intelligent chatbots & assistants",
        description: "Assistants for customers or staff that give accurate answers in your brand's voice.",
      },
      {
        title: "RAG & knowledge retrieval",
        description: "Search and answer across your documents, wikis and databases — with sources cited.",
      },
      {
        title: "Document intelligence",
        description: "Extract, classify and summarise information from contracts, invoices and forms.",
      },
      {
        title: "Business process automation",
        description: "Hand repetitive, rules-heavy work to AI so your team can focus on higher-value tasks.",
      },
      {
        title: "AI integration",
        description: "Add AI features to existing applications through secure, well-monitored APIs.",
      },
    ],
    outcomes: [
      "Less time spent on repetitive tasks",
      "Faster, more consistent answers for customers and staff",
      "Decisions informed by information that was previously hard to find",
    ],
    idealFor: ["Teams drowning in documents", "Support and operations teams", "Products adding AI features"],
    technologies: ["OpenAI APIs", "LangChain", "LangGraph", "RAG", "AI agents", "Python", "FastAPI", "PostgreSQL"],
    faqs: [
      {
        question: "Is our data safe if we use AI?",
        answer:
          "We design with data protection first: access controls, minimal data sharing, provider settings that prevent training on your data, and audit logging.",
      },
      {
        question: "How do you stop an AI assistant from making things up?",
        answer:
          "We ground answers in your approved sources, show citations, add guardrails and evaluate responses against real test cases before launch.",
      },
      {
        question: "Where should we start with AI?",
        answer:
          "Usually with one well-defined, high-volume task. We run a short discovery to find the opportunity with the clearest return, then build a focused pilot.",
      },
    ],
  },
  {
    slug: "custom-software",
    title: "Custom Software Development",
    shortTitle: "Custom Software",
    eyebrow: "Tailored business systems",
    summary:
      "Tailored business applications, workflow automation, enterprise systems, APIs, and integrations designed around specific business requirements.",
    headline: "Software shaped around the way your business works.",
    intro:
      "When off-the-shelf tools force workarounds, we build software that fits — connecting your systems, automating your workflows and giving your team one reliable place to work.",
    keyCapabilities: ["Business applications", "Workflow automation", "Enterprise systems", "APIs & integrations", "Legacy modernization"],
    capabilities: [
      {
        title: "Business applications",
        description: "CRMs, ERPs, inventory, scheduling and operations tools designed around your processes.",
      },
      {
        title: "Workflow automation",
        description: "Approvals, notifications and hand-offs that run automatically and leave an audit trail.",
      },
      {
        title: "Enterprise systems",
        description: "Secure, role-based platforms with reporting, compliance and high availability in mind.",
      },
      {
        title: "APIs & integrations",
        description: "Connect payment providers, ERPs, CRMs and third-party services into one data flow.",
      },
      {
        title: "Legacy modernization",
        description: "Incrementally move ageing systems to modern, maintainable architecture without disruption.",
      },
      {
        title: "Cloud & DevOps",
        description: "Containerised deployments, CI/CD pipelines and monitoring for dependable releases.",
      },
    ],
    outcomes: [
      "Fewer manual steps and spreadsheets",
      "One source of truth across departments",
      "Systems your team can extend for years",
    ],
    idealFor: ["Growing operations teams", "Enterprises with legacy systems", "Businesses with unique workflows"],
    technologies: ["Java", "Spring Boot", "Node.js", "Python", "TypeScript", "PostgreSQL", "Docker", "CI/CD"],
    faqs: [
      {
        question: "Why build custom instead of buying an off-the-shelf tool?",
        answer:
          "Custom software makes sense when your process is a competitive advantage or when existing tools require costly workarounds. We'll tell you honestly if an existing product fits better.",
      },
      {
        question: "Can you integrate with the systems we already use?",
        answer: "Yes. We regularly connect to existing databases, ERPs, CRMs and third-party APIs.",
      },
      {
        question: "Who owns the code?",
        answer: "You do. Source code, documentation and infrastructure access are handed over as part of delivery.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
