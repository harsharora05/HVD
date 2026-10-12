/**
 * Supporting homepage and page content: values, AI capabilities, process,
 * technology stack and solutions. Edit freely — components render whatever is listed.
 */

export const principles = [
  {
    icon: "users",
    title: "Human-centered problem solving",
    description: "We start with the people who will use what we build, so the result solves real problems and gets adopted.",
  },
  {
    icon: "lightbulb",
    title: "Purposeful innovation",
    description: "We adopt new technology when it creates measurable value — not because it is fashionable.",
  },
  {
    icon: "layers",
    title: "Scalable software architecture",
    description: "Clean, modular foundations that support new features, more users and future integrations.",
  },
  {
    icon: "shield-check",
    title: "Quality-focused engineering",
    description: "Code reviews, automated testing, security practices and performance budgets on every project.",
  },
  {
    icon: "messages",
    title: "Transparent collaboration",
    description: "Clear estimates, regular demos and direct access to the engineers building your product.",
  },
  {
    icon: "handshake",
    title: "Long-term technical partnership",
    description: "We stay after launch to maintain, improve and evolve your product as your business grows.",
  },
] as const;

export const aiCapabilities = [
  {
    icon: "bot",
    title: "AI agents & multi-agent workflows",
    benefit: "Let software complete routine multi-step tasks — research, updates, follow-ups — while people approve the important decisions.",
  },
  {
    icon: "message",
    title: "Intelligent chatbots",
    benefit: "Answer customer and employee questions instantly, any time of day, in a consistent and on-brand way.",
  },
  {
    icon: "search",
    title: "RAG & knowledge retrieval",
    benefit: "Find the right answer across thousands of documents in seconds, with links back to the original source.",
  },
  {
    icon: "file",
    title: "Document intelligence",
    benefit: "Turn invoices, contracts and forms into structured data without manual typing.",
  },
  {
    icon: "workflow",
    title: "Business process automation",
    benefit: "Remove repetitive steps from everyday operations so your team spends time where it matters.",
  },
  {
    icon: "plug",
    title: "AI in your existing apps",
    benefit: "Add summarisation, smart search or recommendations to the software you already use.",
  },
] as const;

export const processSteps = [
  {
    title: "Discover",
    description: "We learn your business, users and goals through workshops and research, and identify what success looks like.",
  },
  {
    title: "Define",
    description: "We turn insight into a clear scope, technical approach, milestones and estimate — so everyone knows the plan.",
  },
  {
    title: "Design",
    description: "We map user journeys and design interfaces, validating ideas with prototypes before code is written.",
  },
  {
    title: "Develop",
    description: "We build in short iterations with regular demos, so you see working software early and often.",
  },
  {
    title: "Test",
    description: "Automated and manual testing covers functionality, performance, accessibility and security.",
  },
  {
    title: "Deploy & Evolve",
    description: "We launch with monitoring in place, then keep improving the product based on real usage.",
  },
] as const;

export const techStack = [
  { category: "Frontend", items: ["React", "Next.js", "Angular", "TypeScript"] },
  { category: "Mobile", items: ["React Native", "Flutter"] },
  { category: "Backend", items: ["Node.js", "Java", "Spring Boot", "Python", "FastAPI"] },
  { category: "AI", items: ["OpenAI APIs", "LangChain", "LangGraph", "RAG", "AI agents"] },
  { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis"] },
  { category: "Cloud & DevOps", items: ["AWS", "Docker", "CI/CD"] },
] as const;

/** Business-need framing used on the Solutions page. */
export const solutions = [
  {
    icon: "rocket",
    title: "Launch a new digital product",
    problem: "You have a validated idea and need a reliable team to turn it into a working product.",
    approach: "We shape a focused MVP, design the core experience and build on architecture that can grow with traction.",
    services: ["web-development", "mobile-app-development"],
  },
  {
    icon: "workflow",
    title: "Automate operations",
    problem: "Spreadsheets, email chains and manual hand-offs are slowing your team down.",
    approach: "We map the workflow, remove unnecessary steps and build software that handles the routine automatically.",
    services: ["custom-software", "ai-solutions"],
  },
  {
    icon: "bot",
    title: "Put AI to work",
    problem: "You see AI's potential but need a practical, secure way to apply it to your business.",
    approach: "We identify high-value use cases and build grounded assistants, agents and automations with clear safeguards.",
    services: ["ai-solutions"],
  },
  {
    icon: "refresh",
    title: "Modernize legacy systems",
    problem: "Ageing software is costly to maintain, hard to change and difficult to integrate.",
    approach: "We modernize incrementally — new interfaces, APIs and cloud infrastructure — without disrupting daily work.",
    services: ["custom-software", "web-development"],
  },
  {
    icon: "link",
    title: "Connect your systems",
    problem: "Data lives in disconnected tools, so nobody has a complete picture.",
    approach: "We integrate your platforms through secure APIs to create one reliable source of truth.",
    services: ["custom-software"],
  },
  {
    icon: "smartphone",
    title: "Reach customers on mobile",
    problem: "Your customers or field teams need a fast, dependable experience on their phones.",
    approach: "We design and build cross-platform apps with offline support, notifications and integrated backends.",
    services: ["mobile-app-development"],
  },
] as const;

export const serviceOptions = [
  "Web Development",
  "Mobile Application Development",
  "AI Solutions",
  "Custom Software Development",
  "Not sure yet",
] as const;

export const budgetOptions = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
] as const;
