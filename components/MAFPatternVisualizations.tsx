import { motion } from "framer-motion";

/* ================================================================
   Shared constants & helpers
   ================================================================ */
const ACCENT = "#2b88d8";
const ACCENT_LIGHT = "#4da3e8";
const ACCENT_DIM = "rgba(43, 136, 216, 0.3)";
const GLOW_FILTER = "url(#glow)";
const GREEN = "rgba(100, 220, 100, 0.8)";
const GREEN_DIM = "rgba(100, 220, 100, 0.3)";
const AMBER = "rgba(255, 180, 50, 0.8)";

function GlowDefs() {
  return (
    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/* ================================================================
   1. SINGLE AGENT — Sequential narrative
   Task arrives → agent receives → calls tool1 → tool1 executes →
   calls tool2 → tool2 runs code → returns result → output
   Full cycle ~8s, continuous loop with color status changes.
   ================================================================ */
export function SingleAgentViz() {
  const agentX = 140, agentY = 120;
  const tool1X = 260, tool1Y = 70;
  const tool2X = 260, tool2Y = 170;
  const cycle = 8;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <GlowDefs />

      {/* Task input flowing to agent */}
      <path d="M 20 120 L 110 120" stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} fill="none" />
      <motion.circle
        r={4}
        fill={ACCENT_LIGHT}
        filter={GLOW_FILTER}
        animate={{ cx: [20, 110], cy: [120, 120], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: cycle - 1.5, ease: "easeInOut" }}
      />
      <text x={55} y={108} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="Inter, sans-serif">task</text>

      {/* Agent node — pulses during execution */}
      <motion.circle
        cx={agentX} cy={agentY} r={30}
        fill="rgba(43, 136, 216, 0.08)"
        stroke={ACCENT}
        strokeWidth={2}
        filter={GLOW_FILTER}
        animate={{ strokeWidth: [2, 2.5, 2.5, 2.5, 2.5, 2], scale: [1, 1.05, 1.05, 1.05, 1.05, 1] }}
        transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${agentX}px ${agentY}px` }}
      />
      <text x={agentX} y={agentY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">Agent</text>

      {/* Static connection lines */}
      <path d={`M ${agentX + 30} ${agentY - 15} L ${tool1X - 20} ${tool1Y}`} stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} fill="none" />
      <path d={`M ${agentX + 30} ${agentY + 15} L ${tool2X - 20} ${tool2Y}`} stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} fill="none" />

      {/* Dot: agent → tool1 */}
      <motion.circle
        r={3} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
        animate={{ cx: [agentX + 30, tool1X - 20], cy: [agentY - 15, tool1Y], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatDelay: cycle - 1, ease: "easeInOut" }}
      />

      {/* Tool 1 — lights up green on execution */}
      <motion.circle
        cx={tool1X} cy={tool1Y} r={18}
        fill="rgba(43, 136, 216, 0.05)"
        strokeWidth={1.5}
        animate={{
          stroke: [ACCENT_DIM, ACCENT_DIM, GREEN, GREEN, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM],
          fill: ["rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(100,220,100,0.08)", "rgba(100,220,100,0.08)", "rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)"],
        }}
        transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={tool1X} y={tool1Y + 3} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="monospace">@tool_1</text>

      {/* Dot: agent → tool2 */}
      <motion.circle
        r={3} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
        animate={{ cx: [agentX + 30, tool2X - 20], cy: [agentY + 15, tool2Y], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, delay: 3.5, repeat: Infinity, repeatDelay: cycle - 1, ease: "easeInOut" }}
      />

      {/* Tool 2 — lights up green, shows code execution */}
      <motion.circle
        cx={tool2X} cy={tool2Y} r={18}
        fill="rgba(43, 136, 216, 0.05)"
        strokeWidth={1.5}
        animate={{
          stroke: [ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, GREEN, GREEN, ACCENT_DIM],
          fill: ["rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(43,136,216,0.05)", "rgba(100,220,100,0.08)", "rgba(100,220,100,0.08)", "rgba(43,136,216,0.05)"],
        }}
        transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={tool2X} y={tool2Y - 3} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="8" fontFamily="monospace">@tool_2</text>

      {/* Code block connected to tool2 */}
      <line x1={tool2X + 18} y1={tool2Y} x2={tool2X + 45} y2={tool2Y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      <motion.rect
        x={tool2X + 45} y={tool2Y - 11} width={38} height={22} rx={4}
        fill="rgba(43, 136, 216, 0.04)" strokeWidth={1}
        animate={{
          stroke: [ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, GREEN, GREEN, ACCENT_DIM],
        }}
        transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={tool2X + 64} y={tool2Y + 3} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace">code</text>

      {/* Return dot: tool2 → agent */}
      <motion.circle
        r={3} fill={GREEN} filter={GLOW_FILTER}
        animate={{ cx: [tool2X - 20, agentX + 30], cy: [tool2Y, agentY + 15], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1, delay: 5.5, repeat: Infinity, repeatDelay: cycle - 1, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ================================================================
   2. TOOL INTEGRATION
   Agent calls OUT to MCP tools and delegates to sub-agent.
   ================================================================ */
export function ToolIntegrationViz() {
  const mcpTools = [
    { x: 340, y: 50 },
    { x: 340, y: 120 },
    { x: 340, y: 190 },
  ];
  const agentX = 120, agentY = 120;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <GlowDefs />

      {/* Primary agent */}
      <motion.circle
        cx={agentX} cy={agentY} r={28}
        fill="rgba(43, 136, 216, 0.12)" stroke={ACCENT} strokeWidth={2} filter={GLOW_FILTER}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${agentX}px ${agentY}px` }}
      />
      <text x={agentX} y={agentY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">Agent</text>

      {/* Static lines: agent → MCP tools */}
      {mcpTools.map((t, i) => (
        <g key={i}>
          <path d={`M ${agentX + 28} ${agentY} Q ${230} ${(agentY + t.y) / 2} ${t.x - 20} ${t.y}`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} />

          {/* MCP tool node */}
          <rect x={t.x - 28} y={t.y - 16} width={56} height={32} rx={6} fill="rgba(43, 136, 216, 0.08)" stroke={ACCENT} strokeWidth={1} />
          <text x={t.x} y={t.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="monospace">{i === 1 ? "Sub Agent" : "MCP"}</text>

          {/* Outbound flowing dot: agent → tool */}
          <motion.circle
            r={3} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
            animate={{
              cx: [agentX + 28, (agentX + 28 + t.x - 20) / 2, t.x - 20],
              cy: [agentY, (agentY + t.y) / 2, t.y],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 2.5, delay: i * 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      ))}

      {/* Labels */}
      <text x={agentX} y={228} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter, sans-serif">agent</text>
      <text x={340} y={228} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Inter, sans-serif">tools + delegation</text>
    </svg>
  );
}

/* ================================================================
   3. AGENTIC WORKFLOWS
   Single dot traversing the full sequential pipeline.
   Dot renders BEFORE nodes so labels remain readable.
   ================================================================ */
export function AgenticWorkflowsViz() {
  const nodes = [
    { x: 70, label: "A₁" },
    { x: 160, label: "A₂" },
    { x: 250, label: "A₃" },
    { x: 340, label: "A₄" },
  ];
  const y = 120;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <GlowDefs />

      {/* Pipeline base line */}
      <line x1={30} y1={y} x2={380} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={2} />

      {/* Single flowing dot — rendered BEFORE nodes so it goes behind them */}
      <motion.circle
        r={4} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
        animate={{
          cx: [30, 70, 70, 160, 160, 250, 250, 340, 340, 380],
          cy: [y, y, y, y, y, y, y, y, y, y],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.08, 0.2, 0.3, 0.42, 0.52, 0.64, 0.74, 0.86, 1],
        }}
      />

      {/* Nodes (rendered after dot so they appear on top) */}
      {nodes.map((node, i) => (
        <g key={node.label}>
          <motion.circle
            cx={node.x} cy={y} r={22}
            fill="rgba(43, 136, 216, 0.06)"
            strokeWidth={1.5}
            animate={{ stroke: [ACCENT_DIM, ACCENT_DIM, ACCENT, ACCENT, ACCENT_DIM] }}
            transition={{
              duration: 6,
              delay: i * 0.72,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.15, 0.25, 0.45, 0.6],
            }}
          />
          <text x={node.x} y={y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="500" fontFamily="Inter, sans-serif">{node.label}</text>

          {i < nodes.length - 1 && (
            <polygon points={`${node.x + 28},${y - 4} ${node.x + 36},${y} ${node.x + 28},${y + 4}`} fill={ACCENT_DIM} />
          )}
        </g>
      ))}

      {/* Labels */}
      <text x={115} y={y + 48} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">data</text>
      <text x={205} y={y + 48} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">transform</text>
      <text x={295} y={y + 48} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">output</text>
      <text x={200} y={40} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="Inter, sans-serif">sequential chain</text>
    </svg>
  );
}

/* ================================================================
   4. CONTEXT ENGINEERING
   RAG docs feeding into a context window, memory layers.
   ================================================================ */
export function ContextEngineeringViz() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <GlowDefs />

      {[0, 1, 2].map((i) => {
        const y = 60 + i * 50;
        // Compute points along quadratic bezier: M 68,y Q 110,y 140,120
        const p0 = { x: 68, y };
        const p1 = { x: 110, y };
        const p2 = { x: 140, y: 120 };
        const bezier = (t: number) => ({
          x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
          y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y,
        });
        const pts = [0, 0.25, 0.5, 0.75, 1].map(bezier);

        return (
          <g key={i}>
            <rect x={30} y={y - 12} width={36} height={24} rx={4} fill="none" stroke={ACCENT_DIM} strokeWidth={1} />
            <line x1={35} y1={y - 4} x2={58} y2={y - 4} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
            <line x1={35} y1={y + 2} x2={52} y2={y + 2} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

            <path d={`M 68 ${y} Q 110 ${y} 140 120`} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            <motion.circle
              r={2.5} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
              animate={{
                cx: pts.map(p => p.x),
                cy: pts.map(p => p.y),
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{ duration: 2.5, delay: i * 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </g>
        );
      })}

      {/* Context window */}
      <motion.rect
        x={140} y={70} width={120} height={100} rx={12}
        fill="rgba(43, 136, 216, 0.06)" stroke={ACCENT} strokeWidth={1.5}
        animate={{ strokeOpacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {["RAG", "memory", "instruct"].map((label, i) => (
        <g key={label}>
          <rect x={152} y={82 + i * 28} width={96} height={22} rx={4} fill={`rgba(43, 136, 216, ${0.12 - i * 0.03})`} stroke={ACCENT_DIM} strokeWidth={0.5} />
          <text x={200} y={96 + i * 28} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="monospace">{label}</text>
        </g>
      ))}

      {/* Compaction — smooth pulse */}
      <motion.g animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <path d="M 200 175 L 192 184 L 208 184 Z" fill={ACCENT} opacity={0.6} />
        <text x={200} y={198} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Inter, sans-serif">compact</text>
      </motion.g>

      {/* Output to agent */}
      <path d="M 260 120 L 340 120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} />
      <motion.circle
        r={3} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
        animate={{ cx: [260, 340], cy: [120, 120], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
      />

      <motion.circle
        cx={355} cy={120} r={16}
        fill="rgba(43, 136, 216, 0.1)" stroke={ACCENT} strokeWidth={1.5} filter={GLOW_FILTER}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "355px 120px" }}
      />
      <text x={355} y={124} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Inter, sans-serif">Agent</text>

      <text x={48} y={225} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="Inter, sans-serif">sources</text>
      <text x={200} y={225} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="Inter, sans-serif">context window</text>
    </svg>
  );
}

/* ================================================================
   5. HUMAN-IN-THE-LOOP
   Workflow runs → hits gate → PAUSES → human approval drops
   down to the GATE (not into agent) → gate opens → resumes.
   ================================================================ */
export function HumanInTheLoopViz() {
  const y = 140;
  const gateX = 200;
  const cycle = 7;

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <GlowDefs />

      {/* Full pipeline track */}
      <line x1={50} y1={y} x2={350} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={2} />

      {/* Agent 1 */}
      <circle cx={80} cy={y} r={18} fill="rgba(43, 136, 216, 0.06)" stroke={ACCENT} strokeWidth={1.5} />
      <text x={80} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif">A₁</text>

      {/* Dot: A1 → gate (arrives and stops) */}
      <motion.circle
        r={4} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
        animate={{ cx: [100, gateX - 22, gateX - 22], cy: [y, y, y], opacity: [1, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: cycle - 2, ease: "easeOut", times: [0, 0.7, 1] }}
      />

      {/* Gate (pause → checkmark) */}
      <motion.rect
        x={gateX - 18} y={y - 18} width={36} height={36} rx={8}
        fill="rgba(255, 180, 50, 0.06)" strokeWidth={1.5}
        animate={{ stroke: [AMBER, AMBER, AMBER, GREEN, GREEN, AMBER, AMBER] }}
        transition={{ duration: cycle, repeat: Infinity, ease: "easeInOut", times: [0, 0.28, 0.55, 0.6, 0.72, 0.77, 1] }}
      />
      {/* Pause bars */}
      <motion.g animate={{ opacity: [1, 1, 1, 0, 0, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.28, 0.55, 0.6, 0.72, 0.77, 1] }}>
        <rect x={gateX - 7} y={y - 9} width={4.5} height={18} rx={1.5} fill={AMBER} />
        <rect x={gateX + 3} y={y - 9} width={4.5} height={18} rx={1.5} fill={AMBER} />
      </motion.g>
      {/* Checkmark (appears when approved) */}
      <motion.path
        d={`M ${gateX - 6} ${y} L ${gateX - 1} ${y + 5} L ${gateX + 8} ${y - 5}`}
        fill="none" stroke={GREEN} strokeWidth={2.5} strokeLinecap="round"
        animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.28, 0.55, 0.6, 0.72, 0.77, 1] }}
      />

      {/* Human icon above gate — person silhouette */}
      <motion.g
        animate={{ opacity: [0.5, 0.5, 1, 1, 0.5, 0.5] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.5, 0.65, 0.75, 1] }}
      >
        {/* Head */}
        <circle cx={gateX} cy={34} r={6} fill={GREEN_DIM} />
        {/* Body */}
        <path d={`M ${gateX} 40 L ${gateX} 54`} stroke={GREEN_DIM} strokeWidth={2} strokeLinecap="round" />
        {/* Arms */}
        <path d={`M ${gateX - 8} 46 L ${gateX} 43 L ${gateX + 8} 46`} fill="none" stroke={GREEN_DIM} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        {/* Legs */}
        <path d={`M ${gateX} 54 L ${gateX - 6} 64`} stroke={GREEN_DIM} strokeWidth={1.8} strokeLinecap="round" />
        <path d={`M ${gateX} 54 L ${gateX + 6} 64`} stroke={GREEN_DIM} strokeWidth={1.8} strokeLinecap="round" />
      </motion.g>
      <text x={gateX} y={18} textAnchor="middle" fill="rgba(100,220,100,0.5)" fontSize="9" fontFamily="Inter, sans-serif">human</text>

      {/* Approval line: human → gate (visual connection, no dot) */}
      <motion.line
        x1={gateX} y1={66} x2={gateX} y2={y - 20}
        strokeWidth={1.5} strokeDasharray="4 3"
        animate={{ stroke: ["rgba(100,220,100,0.08)", "rgba(100,220,100,0.08)", "rgba(100,220,100,0.5)", "rgba(100,220,100,0.5)", "rgba(100,220,100,0.08)", "rgba(100,220,100,0.08)"] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.5, 0.65, 0.75, 1] }}
      />

      {/* State persistence box */}
      <rect x={gateX - 22} y={y + 28} width={44} height={18} rx={4} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      <text x={gateX} y={y + 40} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="monospace">state</text>

      {/* Dot: gate → A2 (after approval, starts at gate edge) */}
      <motion.circle
        r={4} fill={GREEN} filter={GLOW_FILTER}
        animate={{ cx: [gateX + 18, gateX + 18, gateX + 18, gateX + 18, gateX + 18, 300, 300], cy: [y, y, y, y, y, y, y], opacity: [0, 0, 0, 0, 1, 1, 0] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.6, 0.62, 0.64, 0.84, 0.9], ease: "easeInOut" }}
      />

      {/* Agent 2 — lights up after approval */}
      <motion.circle
        cx={320} cy={y} r={18}
        fill="rgba(43, 136, 216, 0.06)" strokeWidth={1.5}
        animate={{ stroke: [ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT_DIM, ACCENT, ACCENT, ACCENT_DIM] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.62, 0.72, 0.78, 0.9, 1] }}
      />
      <text x={320} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif">A₂</text>

      {/* Final arrow */}
      <polygon points="345,136 355,140 345,144" fill={ACCENT_DIM} />
    </svg>
  );
}

/* ================================================================
   6. LLM ORCHESTRATION
   Clean fan-out from orchestrator to agents. No dotted circles.
   Smooth flowing dots from orchestrator to each agent.
   ================================================================ */
export function LLMOrchestrationViz() {
  const orchX = 200, orchY = 55;
  const agents = [
    { x: 80, y: 170, label: "A1" },
    { x: 160, y: 185, label: "A2" },
    { x: 240, y: 185, label: "A3" },
    { x: 320, y: 170, label: "A4" },
  ];

  return (
    <svg viewBox="0 0 400 240" className="w-full h-full">
      <GlowDefs />

      {/* Orchestrator */}
      <motion.circle
        cx={orchX} cy={orchY} r={26}
        fill="rgba(43, 136, 216, 0.1)" stroke={ACCENT} strokeWidth={2} filter={GLOW_FILTER}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${orchX}px ${orchY}px` }}
      />
      <text x={orchX} y={orchY + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif">Orch</text>

      {/* Fan-out lines and agents */}
      {agents.map((agent, i) => (
        <g key={agent.label}>
          {/* Static line */}
          <line x1={orchX} y1={orchY + 26} x2={agent.x} y2={agent.y - 18} stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} />

          {/* Flowing dot — staggered, continuous */}
          <motion.circle
            r={3} fill={ACCENT_LIGHT} filter={GLOW_FILTER}
            animate={{ cx: [orchX, agent.x], cy: [orchY + 26, agent.y - 18], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.6, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
          />

          {/* Agent node — lights up when dot arrives */}
          <motion.circle
            cx={agent.x} cy={agent.y} r={18}
            fill="rgba(43, 136, 216, 0.06)" strokeWidth={1.5}
            animate={{ stroke: [ACCENT_DIM, ACCENT_DIM, ACCENT, ACCENT, ACCENT_DIM] }}
            transition={{ duration: 3.5, delay: i * 0.6 + 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut", times: [0, 0.1, 0.25, 0.6, 1] }}
          />
          <text x={agent.x} y={agent.y + 4} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Inter, sans-serif">{agent.label}</text>
        </g>
      ))}

      {/* Pattern labels */}
    </svg>
  );
}
