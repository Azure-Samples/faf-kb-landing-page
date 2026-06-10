import type { Icon } from "@phosphor-icons/react";
import {
  Tree,
  Cube,
  Lightning,
  Code,
  Brain,
  Fingerprint,
  Flask,
  ShieldCheck,
  Rocket,
  GearSix,
  Terminal,
  CloudArrowUp,
  TestTube,
  Gauge,
  Lock,
  ChatCircleDots,
  MagnifyingGlass,
  GitBranch,
  Robot,
  UsersThree,
  Wrench,
  ShareNetwork,
  Cpu,
  ArrowsSplit,
  UserCircleCheck,
  Chats,
} from "@phosphor-icons/react";

export const REPO_URL =
  "https://github.com/Azure-Samples/FAF-knowledge-bases";

// ── Stats ──────────────────────────────────────────────────────
export interface Stat {
  icon: Icon;
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { icon: Tree, value: "9", label: "Knowledge Bases" },
  { icon: Cube, value: "15+", label: "Plugins" },
  { icon: Lightning, value: "30+", label: "Skills" },
  { icon: Code, value: "5", label: "Languages" },
];

// ── What is FAF ────────────────────────────────────────────────
export interface Feature {
  icon: Icon;
  title: string;
  description: string;
}

export const whatFeatures: Feature[] = [
  {
    icon: Flask,
    title: "Tested Patterns",
    description:
      "Production-ready code templates that AI agents adapt to your context — not generated from scratch. Each pattern embodies team standards, framework conventions, and best practices.",
  },
  {
    icon: Fingerprint,
    title: "Progressive Disclosure",
    description:
      "The T0→T1→T2 loading model keeps token budgets tight. Agents discover skills via frontmatter (~100 tokens), understand via SKILL.md (<5K), then load code templates only during generation.",
  },
  {
    icon: Code,
    title: "Multi-Language & Multi-Discipline",
    description:
      "Covers Python, TypeScript, Java, C#, and IaC (Bicep/Terraform). Spans GenAI patterns, DevOps, infrastructure, testing, performance, and security.",
  },
];

// ── Knowledge Bases Catalog ────────────────────────────────────
export type KBStatus = "active" | "development" | "planned";

export interface KnowledgeBase {
  icon: Icon;
  name: string;
  slug: string;
  description: string;
  plugins: number;
  status: KBStatus;
  languages: string[];
}

export const knowledgeBases: KnowledgeBase[] = [
  {
    icon: Brain,
    name: "GenAI · Python",
    slug: "dev-genai-python",
    description:
      "Agent runtime, chat server, RAG indexing, workflow server, MCP server, and multi-agent patterns with Microsoft Agent Framework.",
    plugins: 7,
    status: "active",
    languages: ["Python"],
  },
  {
    icon: Terminal,
    name: "GenAI · JavaScript",
    slug: "dev-genai-javascript",
    description:
      "React/TypeScript frontends: streaming chat UI, RAG admin dashboard, and workflow console.",
    plugins: 3,
    status: "active",
    languages: ["TypeScript"],
  },
  {
    icon: GearSix,
    name: "GenAI · Java",
    slug: "dev-genai-java",
    description:
      "Backend patterns for Spring AI and LangChain4j frameworks.",
    plugins: 2,
    status: "development",
    languages: ["Java"],
  },
  {
    icon: Cube,
    name: "GenAI · .NET",
    slug: "dev-genai-dotnet",
    description:
      "Backend patterns using Microsoft Agent Framework for C#/.NET.",
    plugins: 1,
    status: "development",
    languages: ["C#"],
  },
  {
    icon: GitBranch,
    name: "DevOps",
    slug: "devops",
    description:
      "CI/CD pipeline patterns for GitHub Actions and Azure DevOps.",
    plugins: 2,
    status: "planned",
    languages: ["YAML"],
  },
  {
    icon: CloudArrowUp,
    name: "Infrastructure",
    slug: "infra",
    description:
      "Infrastructure as Code with Bicep and Terraform for Azure deployments.",
    plugins: 2,
    status: "development",
    languages: ["Bicep", "HCL"],
  },
  {
    icon: TestTube,
    name: "Testing",
    slug: "test-genai",
    description:
      "Testing patterns for GenAI apps with pytest and Playwright.",
    plugins: 2,
    status: "planned",
    languages: ["Python", "TypeScript"],
  },
  {
    icon: Gauge,
    name: "Performance",
    slug: "perf-genai",
    description:
      "Load and performance testing with Locust and k6.",
    plugins: 2,
    status: "planned",
    languages: ["Python", "JavaScript"],
  },
  {
    icon: Lock,
    name: "Security",
    slug: "sec-genai",
    description:
      "Security scanning and policy-as-code for GenAI applications.",
    plugins: 2,
    status: "planned",
    languages: ["Python", "Rego"],
  },
];

// ── MAF Patterns ───────────────────────────────────────────────
export interface MAFPattern {
  icon: Icon;
  title: string;
  description: string;
}

export const mafPatterns: MAFPattern[] = [
  {
    icon: Robot,
    title: "Single Agent",
    description:
      "Custom @tool-decorated function tools for a single agent with structured outputs and error handling.",
  },
  {
    icon: Wrench,
    title: "Tool Integration",
    description:
      "MCP tool connections and agent-as-tool delegation for composable, reusable capabilities.",
  },
  {
    icon: ArrowsSplit,
    title: "Agentic Workflows",
    description:
      "Sequential agent chains and executor-based data pipelines for complex multi-step operations.",
  },
  {
    icon: Cpu,
    title: "Context Engineering",
    description:
      "RAG grounding, memory, dynamic instructions, cross-agent context sharing, and compaction strategies.",
  },
  {
    icon: UserCircleCheck,
    title: "Human-in-the-Loop",
    description:
      "Pause workflows for human approval or input with state persistence and resumption.",
  },
  {
    icon: Chats,
    title: "LLM Orchestration",
    description:
      "Multi-agent orchestration patterns — Sequential, Concurrent, Handoff, Group Chat, and Magentic.",
  },
];

// ── How It Works (T0/T1/T2) ───────────────────────────────────
export interface Step {
  tier: string;
  title: string;
  tokens: string;
  description: string;
  detail: string;
}

export const howItWorks: Step[] = [
  {
    tier: "T0",
    title: "Discover",
    tokens: "~100 tokens",
    description: "Agent reads YAML frontmatter",
    detail:
      "The agent scans skill frontmatter to decide if a skill matches the user's request. Only metadata is loaded — name, description, framework, language.",
  },
  {
    tier: "T1",
    title: "Understand",
    tokens: "<5K tokens",
    description: "Agent reads full SKILL.md",
    detail:
      "On match, the agent loads the complete SKILL.md: capabilities, key APIs, generation contract, prerequisites, and design notes. It now knows what to ask the user.",
  },
  {
    tier: "T2",
    title: "Generate",
    tokens: "Unbounded",
    description: "Agent loads code templates",
    detail:
      "During implementation, the agent reads sample code and test files from assets/. It adapts these tested templates to the user's project context, producing architecture-consistent output.",
  },
];

// ── Apps Built with FAF ────────────────────────────────────────
export interface AppCard {
  icon: Icon;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
}

export const appsBuilt: AppCard[] = [
  {
    icon: ChatCircleDots,
    title: "Multi-Agent Customer Support Chatbots",
    description:
      "Orchestrate multiple specialized agents for customer support, internal help desks, and conversational AI workflows with built-in handoffs and context sharing.",
    tags: ["MAF", "Python", "Chat UI"],
    image: "/images/chat-server-ui.gif",
    link: `${REPO_URL}/tree/main/dev-genai-python/chat-server`,
  },
  {
    icon: MagnifyingGlass,
    title: "RAG Agents with Foundry IQ",
    description:
      "Unstructured documents indexing pipeline and knowledge-grounded agents that retrieve, reason, and respond using agentic retrieval across multiple enterprise data sources with citation support.",
    tags: ["RAG", "Foundry IQ", "AI Search"],
    image: "/images/indexing-server-ui.gif",
    link: `${REPO_URL}/tree/main/dev-genai-python/rag-indexing-server`,
  },
  {
    icon: ShieldCheck,
    title: "Agentic Business Processes",
    description:
      "Long-running, multi-step business workflows with built-in human-in-the-loop approval gates, state persistence, and automatic retry/recovery.",
    tags: ["HITL", "Workflows", "Python"],
    image: "/images/workflow-server-ui.gif",
    link: `${REPO_URL}/tree/main/dev-genai-python/workflow-server`,
  },
  {
    icon: Rocket,
    title: "Domain MCP Servers",
    description:
      "Model Context Protocol servers that expose domain-specific tools and data to AI agents, enabling deep enterprise integration and function calling.",
    tags: ["MCP", "Tools", "Python"],
    image: "/images/domain-mcp-tools.png",
    link: `${REPO_URL}/tree/main/dev-genai-python/mcp-server`,
  },
  {
    icon: UsersThree,
    title: "Multi-Agent Virtual Assistants",
    description:
      "Build virtual assistants with domain-specific agents, LLM hand-off orchestration, and domain API integration through MCP tools — across Teams, Copilot, and web channels.",
    tags: ["MAF", "Python", "Chat UI"],
    image: "/images/virtual-assistant.gif",
  },
];

// ── Getting Started paths ──────────────────────────────────────
export interface GettingStartedPath {
  title: string;
  icon: Icon;
  steps: string[];
  cta: string;
  ctaLink: string;
}

export const gettingStartedPaths: GettingStartedPath[] = [
  {
    title: "KB Manager Skill",
    icon: Terminal,
    steps: [
      "Install the FAF KB Manager plugin via the VS Code marketplace",
      "Open Copilot Chat and invoke /faf-kb-manager",
      "Browse, install, update, or remove plugins directly from chat",
    ],
    cta: "View KB Manager Guide",
    ctaLink: `https://github.com/Azure-Samples/factory-agents-forge/blob/main/docs/skills/README-faf-kb-manager.md`,
  },
  {
    title: "GitHub CLI",
    icon: GitBranch,
    steps: [
      "Install GitHub CLI v2.90.0+ and authenticate",
      "Run: gh skill install Azure-Samples/FAF-knowledge-bases",
      "Works with Copilot, Claude Code, Cursor, Codex, and Gemini CLI",
    ],
    cta: "View CLI Guide",
    ctaLink: `${REPO_URL}/blob/main/docs/marketplace/INSTALL-GITHUB-CLI.md`,
  },
];
