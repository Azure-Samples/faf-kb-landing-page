import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  GithubLogo,
  Rocket,
  Sparkle,
  Check,
  CaretLeft,
  CaretRight,
  Key,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  REPO_URL,
  REQUEST_ACCESS_MAILTO,
  stats,
  whatFeatures,
  knowledgeBases,
  howItWorks,
  appsBuilt,
  gettingStartedPaths,
} from "./data";
import {
  SingleAgentViz,
  ToolIntegrationViz,
  AgenticWorkflowsViz,
  ContextEngineeringViz,
  HumanInTheLoopViz,
  LLMOrchestrationViz,
} from "@/components/MAFPatternVisualizations";

/* ================================================================
   NAV
   ================================================================ */
function Nav() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1200px]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-background/30 backdrop-blur-md border border-border rounded-full px-6 lg:px-8 h-16 flex items-center justify-between shadow-lg shadow-black/10"
      >
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
            <Rocket weight="fill" className="text-white" size={18} />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-foreground">
            Factory Agents Forge - Knowledge Bases
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {["What", "Knowledge Bases", "MAF Patterns", "How It Works", "Apps", "Get Started"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary/60"
              >
                {item}
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <GithubLogo weight="fill" size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          <Button variant="accent" size="sm" asChild>
            <a href={REQUEST_ACCESS_MAILTO} className="flex items-center gap-2">
              <Key weight="bold" size={16} />
              <span className="hidden sm:inline">Get Access</span>
            </a>
          </Button>
        </div>
      </motion.div>
    </nav>
  );
}

/* ================================================================
   HERO
   ================================================================ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center pt-24 px-6"
    >
      <motion.div
        style={{ opacity, scale }}
        className="max-w-[1000px] mx-auto text-center space-y-8 py-20 md:py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-[52px] sm:text-[68px] md:text-[84px] lg:text-[100px] font-semibold tracking-[-0.04em] leading-[0.95]">
            Teach AI agents
            <br />
            to write{" "}
            <span className="bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              your code
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-[720px] mx-auto leading-relaxed font-light"
        >
          A curated library of production-ready code patterns that transform
          general-purpose AI coding agents into opinionated, architecture-consistent
          assistants.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Button size="lg" asChild>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              View repository
              <ArrowRight weight="bold" size={20} />
            </a>
          </Button>
          <Button variant="accent" size="lg" asChild>
            <a href={REQUEST_ACCESS_MAILTO} className="flex items-center gap-2">
              <Key weight="bold" size={20} />
              Get access
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#get-started" className="flex items-center gap-2">
              Get started
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ================================================================
   STATS
   ================================================================ */
function Stats() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center space-y-3"
            >
              <div className="inline-flex p-3 rounded-2xl bg-background border border-border">
                <stat.icon weight="duotone" size={28} className="text-accent" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   WHAT IS FAF
   ================================================================ */
function WhatSection() {
  return (
    <section id="what" className="py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          title="What is this?"
          subtitle="A knowledge base platform that teaches AI coding agents opinionated patterns, conventions, and architecture — so every generated file looks like your best engineer wrote it."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatFeatures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-card border border-border text-center space-y-6"
            >
              <div className="inline-flex p-4 rounded-2xl bg-accent-muted">
                <f.icon weight="duotone" size={40} className="text-accent" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold tracking-tight">
                  {f.title}
                </h3>
                <p className="text-[17px] text-muted-foreground leading-relaxed font-light">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   KNOWLEDGE BASES CATALOG
   ================================================================ */
function KnowledgeBasesSection() {
  return (
    <section id="knowledge-bases" className="py-32 md:py-40 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Knowledge Bases"
          subtitle="Nine discipline-specific collections covering the full stack — from GenAI agents to infrastructure, testing, and security."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeBases.map((kb, i) => (
            <motion.a
              key={kb.slug}
              href={`${REPO_URL}/tree/main/${kb.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-accent-muted group-hover:bg-accent/20 transition-colors duration-300">
                  <kb.icon
                    weight="duotone"
                    size={28}
                    className="text-accent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={kb.status}>
                    {kb.status === "active"
                      ? "Active"
                      : kb.status === "development"
                        ? "In Dev"
                        : "Planned"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
                  {kb.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {kb.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-1.5 flex-wrap">
                  {kb.languages.map((l) => (
                    <Badge key={l} variant="outline">
                      {l}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {kb.plugins} plugin{kb.plugins !== 1 ? "s" : ""}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAF PATTERNS — Animated Visualizations
   ================================================================ */
const mafVizEntries = [
  {
    viz: SingleAgentViz,
    title: "Single Agent",
    description:
      "Custom @tool-decorated function tools for a single agent with structured outputs and error handling.",
  },
  {
    viz: ToolIntegrationViz,
    title: "Tool Integration",
    description:
      "MCP tool connections and agent-as-tool delegation for composable, reusable capabilities.",
  },
  {
    viz: AgenticWorkflowsViz,
    title: "Agentic Workflows",
    description:
      "Sequential agent chains and executor-based data pipelines for complex multi-step operations.",
  },
  {
    viz: ContextEngineeringViz,
    title: "Context Engineering",
    description:
      "RAG grounding, memory, dynamic instructions, cross-agent context sharing, and compaction strategies.",
  },
  {
    viz: HumanInTheLoopViz,
    title: "Human-in-the-Loop",
    description:
      "Pause workflows for human approval or input with state persistence and resumption.",
  },
  {
    viz: LLMOrchestrationViz,
    title: "LLM Orchestration",
    description:
      "Multi-agent orchestration patterns — Sequential, Concurrent, Handoff, Group Chat, and Magentic.",
  },
];

function MAFPatternsSection() {
  return (
    <section id="maf-patterns" className="py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Microsoft Agent Framework Patterns"
          subtitle="Production-ready best practices and code patterns for building AI agents with the Microsoft Agent Framework."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mafVizEntries.map((entry, i) => (
            <motion.a
              key={entry.title}
              href={`${REPO_URL}/tree/main/dev-genai-python/maf-patterns`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Animated visualization */}
              <div className="relative h-52 bg-gradient-to-br from-accent/[0.03] via-background to-accent/[0.06] border-b border-border/50 overflow-hidden flex items-center justify-center maf-viz-container">
                <entry.viz />
              </div>

              {/* Text content */}
              <div className="p-6 space-y-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                  {entry.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href={`${REPO_URL}/tree/main/dev-genai-python/maf-patterns`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              Explore MAF Patterns
              <ArrowRight weight="bold" size={16} />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   HOW IT WORKS (T0 / T1 / T2)
   ================================================================ */
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          title="How It Works"
          subtitle={<>Progressive disclosure — based on the <a href="https://agentskills.io/home" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Agent Skills spec</a> — keeps token budgets tight while giving agents exactly the context they need at each stage.</>}
        />
        <div className="max-w-[1000px] mx-auto space-y-6">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.tier}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex gap-6 md:gap-8"
            >
              {/* Connector line */}
              {i < howItWorks.length - 1 && (
                <div className="absolute left-[27px] top-[76px] w-px h-[calc(100%-40px)] bg-gradient-to-b from-accent/40 to-transparent" />
              )}

              {/* Tier badge */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-accent/20">
                {step.tier}
              </div>

              {/* Content card */}
              <div className="flex-1 p-8 rounded-3xl bg-card border border-border space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <Badge variant="default">{step.tokens}</Badge>
                </div>
                <p className="text-sm font-medium text-accent">
                  {step.description}
                </p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   APPS BUILT WITH FAF (Carousel)
   ================================================================ */
function AppsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="apps" className="py-32 md:py-40 bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Apps Built with FAF"
          subtitle="From conversational agents to agentic business processes — see what teams are building with FAF knowledge bases."
        />

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {appsBuilt.map((app) => (
                <div
                  key={app.title}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_50%]"
                >
                  <div className="group h-full p-8 rounded-3xl bg-card border border-border hover:border-accent/30 transition-all duration-500 space-y-6">
                    {/* Stylized UI illustration */}
                    <div className="relative h-80 rounded-2xl bg-gradient-to-br from-accent/5 via-background to-accent/10 border border-border/50 overflow-hidden flex items-center justify-center">
                      {app.image ? (
                        <img
                          src={`${import.meta.env.BASE_URL}${app.image.replace(/^\//, "")}`}
                          alt={app.title}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-3 left-3 right-3 h-2 rounded-full bg-accent/20" />
                            <div className="absolute top-8 left-3 w-1/3 h-1.5 rounded-full bg-accent/15" />
                            <div className="absolute top-12 left-3 w-2/3 h-1.5 rounded-full bg-accent/10" />
                            <div className="absolute bottom-3 left-3 right-3 h-8 rounded-lg bg-accent/10" />
                          </div>
                          <app.icon
                            weight="duotone"
                            size={48}
                            className="text-accent relative z-10"
                          />
                        </>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold tracking-tight group-hover:text-accent transition-colors duration-300">
                        {app.link ? (
                          <a
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {app.title}
                          </a>
                        ) : (
                          app.title
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {app.description}
                      </p>
                    </div>

                    <div className="flex gap-1.5 flex-wrap">
                      {app.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-default cursor-pointer hidden md:flex"
          >
            <CaretLeft weight="bold" size={18} />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-default cursor-pointer hidden md:flex"
          >
            <CaretRight weight="bold" size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {appsBuilt.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === selectedIndex
                  ? "bg-accent w-6"
                  : "bg-border hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   GETTING STARTED
   ================================================================ */
function GettingStartedSection() {
  return (
    <section id="get-started" className="py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Get Started"
          subtitle="Two ways to start using FAF knowledge bases with your AI coding agent."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
          {gettingStartedPaths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-accent-muted">
                  <path.icon
                    weight="duotone"
                    size={24}
                    className="text-accent"
                  />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {path.title}
                </h3>
              </div>

              <div className="space-y-4">
                {path.steps.map((step, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-accent">
                        {j + 1}
                      </span>
                    </div>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <Button variant="accent" size="default" asChild>
                <a
                  href={path.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {path.cta}
                  <ArrowRight weight="bold" size={16} />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CTA
   ================================================================ */
function CTASection() {
  return (
    <section className="py-32 md:py-40 bg-foreground text-background overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[900px] mx-auto px-6 text-center space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex p-4 rounded-2xl bg-accent/20 backdrop-blur-sm">
            <Sparkle weight="duotone" size={40} className="text-background" />
          </div>

          <h2 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.03em] leading-tight">
            Transform your
            <br />
            AI coding workflow
          </h2>

          <p className="text-xl md:text-2xl text-background/70 leading-relaxed font-light max-w-[650px] mx-auto">
            Stop generating generic code. Start teaching agents your team's
            patterns, conventions, and architecture.
          </p>

          <p className="text-base md:text-lg text-background/50 leading-relaxed max-w-[700px] mx-auto">
            Don't stop at your coding inner loop — apply agentic engineering and
            spec-driven development practices end-to-end, from first customer
            call to deploy in the cloud.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button
            size="lg"
            className="bg-background hover:bg-background/90 text-foreground px-8 h-14 text-[17px] font-medium rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            asChild
          >
            <a
              href="https://azure-samples.github.io/faf-kb-landing-page"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Rocket weight="fill" size={22} />
              Factory Agents Forge
            </a>
          </Button>
         
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
   ================================================================ */
function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
              <Sparkle weight="fill" className="text-white" size={14} />
            </div>
            <span>Factory Agents Forge — Knowledge Bases</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            {[
              { label: "License", path: "LICENSE" },
              { label: "Contributing", path: "CONTRIBUTING.md" },
              { label: "Design", path: "DESIGN.md" },
            ].map((link) => (
              <a
                key={link.label}
                href={`${REPO_URL}/blob/main/${link.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   SHARED: Section Header
   ================================================================ */
function SectionHeader({
  title,
  subtitle,
  showAccess = true,
}: {
  title: string;
  subtitle: React.ReactNode;
  showAccess?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center space-y-6 mb-20 md:mb-28 max-w-[800px] mx-auto"
    >
      <h2 className="text-[48px] md:text-[64px] font-semibold tracking-[-0.03em] leading-tight">
        {title}
      </h2>
      <p className="text-lg md:text-[22px] text-muted-foreground leading-relaxed font-light">
        {subtitle}
      </p>
      {showAccess && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href={REQUEST_ACCESS_MAILTO}
              className="flex items-center gap-2"
            >
              <Key weight="bold" size={16} />
              Get Access
            </a>
          </Button>
        </div>
      )}
    </motion.div>
  );
}

/* ================================================================
   APP
   ================================================================ */
export default function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Stats />
        <WhatSection />
        <KnowledgeBasesSection />
        <MAFPatternsSection />
        <AppsSection />
        <HowItWorksSection />
        <GettingStartedSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
