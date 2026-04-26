import { useState, useEffect, useRef } from "react";

/* ─── palette ─── */
const C = {
  bg: "#0A0A0A",
  gold: "#D4AF37",
  goldDim: "rgba(212,175,55,0.15)",
  goldMid: "rgba(212,175,55,0.35)",
  investor: "#22C55E",
  lab: "#3B82F6",
  regulator: "#8B5CF6",
  data: "#F59E0B",
  annotator: "#D946EF",
  user: "#EF4444",
  muted: "#888",
  panel: "#111111",
};

/* ─── Unique ID generator (safe for SVG url() refs — no colons) ─── */
let _blobCounter = 0;
function useSvgId() {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = `blob${++_blobCounter}`;
  }
  return ref.current;
}

/* ─── SVG icon components ─── */
const DollarIcon = ({ size = 20, color = C.investor }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const BuildingIcon = ({ size = 20, color = C.lab }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="9" y1="6" x2="9" y2="6.01" />
    <line x1="15" y1="6" x2="15" y2="6.01" />
    <line x1="9" y1="10" x2="9" y2="10.01" />
    <line x1="15" y1="10" x2="15" y2="10.01" />
    <line x1="9" y1="14" x2="9" y2="14.01" />
    <line x1="15" y1="14" x2="15" y2="14.01" />
    <path d="M9 22v-4h6v4" />
  </svg>
);

const GavelIcon = ({ size = 20, color = C.regulator }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 3.5L20.5 9.5" />
    <rect x="13" y="2" width="9" height="3" rx="1" transform="rotate(45 17.5 3.5)" />
    <path d="M4 20l7-7" />
    <path d="M2 22h8" />
    <path d="M9.5 7.5l7 7" />
  </svg>
);

const DatabaseIcon = ({ size = 20, color = C.data }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const ClipboardCheckIcon = ({ size = 20, color = C.annotator }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <path d="M9 2h6v3H9z" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const GroupIcon = ({ size = 20, color = C.user }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3" />
    <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
    <circle cx="18" cy="8" r="2.5" />
    <path d="M21 21v-1.5a3 3 0 0 0-2-2.83" />
  </svg>
);

const PersonIcon = ({ size = 20, color = C.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
  </svg>
);

/* ─── Model Blob ─── */
const ModelBlob = ({ fill = 0, size = 64, label }) => {
  const clipId = useSvgId();
  const h = size;
  const w = size * 1.2;
  const fillH = h * fill;
  const rx = 10;
  return (
    <div className="flex flex-col items-center gap-1" style={{ flexShrink: 0 }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", overflow: "hidden" }}>
        <defs>
          <clipPath id={clipId}>
            <rect x="2" y="2" width={w - 4} height={h - 4} rx={rx} />
          </clipPath>
        </defs>
        {/* border */}
        <rect x="2" y="2" width={w - 4} height={h - 4} rx={rx} fill="none" stroke={C.gold} strokeWidth="1.5" opacity="0.5" />
        {/* fill "water" — clipped to rounded rect */}
        {fill > 0 && (
          <rect
            x="2"
            y={h - 2 - fillH}
            width={w - 4}
            height={fillH + 2}
            fill={C.gold}
            opacity="0.25"
            clipPath={`url(#${clipId})`}
          />
        )}
        {/* label */}
        <text x={w / 2} y={h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill={C.gold} fontSize="13" fontFamily="'JetBrains Mono', monospace" fontWeight="600" opacity="0.9">
          AI
        </text>
      </svg>
      {label && <span style={{ color: C.goldMid, fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>{label}</span>}
    </div>
  );
};

/* ─── Stakeholder Node ─── */
const StakeholderNode = ({ icon, label, color, sub, pulse }) => (
  <div className="flex flex-col items-center gap-1 relative" style={{ minWidth: 72, flexShrink: 0 }}>
    {pulse && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="rounded-full animate-ping" style={{ width: 36, height: 36, background: color, opacity: 0.12 }} />
      </div>
    )}
    <div className="rounded-full flex items-center justify-center" style={{ width: 40, height: 40, border: `1.5px solid ${color}`, background: `${color}11` }}>
      {icon}
    </div>
    <span style={{ color, fontFamily: "Georgia, serif", fontSize: 11, fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
    {sub && <span style={{ color: C.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, textAlign: "center", maxWidth: 90 }}>{sub}</span>}
  </div>
);

/* ─── Animated flow arrow ─── */
const FlowArrow = ({ color = C.gold, dashed = true, vertical = false, label }) => {
  const w = vertical ? 24 : 100;
  const h = vertical ? 48 : 24;
  return (
    <div className="flex flex-col items-center justify-center" style={{ width: w, height: h, position: "relative", flexShrink: 0 }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} overflow="visible">
        {vertical ? (
          <>
            <line x1={w / 2} y1="2" x2={w / 2} y2={h - 8} stroke={color} strokeWidth="1.2" strokeDasharray={dashed ? "4 4" : "none"} opacity="0.5" />
            <polygon points={`${w / 2},${h} ${w / 2 - 4},${h - 7} ${w / 2 + 4},${h - 7}`} fill={color} opacity="0.6" />
            <circle r="2" fill={color} opacity="0.9">
              <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${w / 2},2 L${w / 2},${h - 8}`} />
            </circle>
          </>
        ) : (
          <>
            <line x1="2" y1={h / 2} x2={w - 8} y2={h / 2} stroke={color} strokeWidth="1.2" strokeDasharray={dashed ? "4 4" : "none"} opacity="0.5" />
            <polygon points={`${w},${h / 2} ${w - 7},${h / 2 - 4} ${w - 7},${h / 2 + 4}`} fill={color} opacity="0.6" />
            <circle r="2" fill={color} opacity="0.9">
              <animateMotion dur="1.8s" repeatCount="indefinite" path={`M2,${h / 2} L${w - 8},${h / 2}`} />
            </circle>
          </>
        )}
      </svg>
      {label && (
        <span style={{ position: "absolute", bottom: vertical ? -4 : -12, left: "50%", transform: "translateX(-50%)", fontSize: 8, color: C.muted, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{label}</span>
      )}
    </div>
  );
};


/* ─── PANEL 1: Before Training ─── */
const Panel1 = () => (
  <div className="flex flex-col gap-8 py-6">
    {/* investors → labs matching */}
    <div className="flex flex-col gap-3">
      <span style={{ color: C.goldMid, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Capital → Lab Matching</span>

      {/* regulator — own isolated row with clear margin */}
      <div className="flex items-center justify-center py-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ border: `1px dashed ${C.regulator}44`, background: `${C.regulator}08` }}>
          <GavelIcon size={14} />
          <span style={{ color: C.regulator, fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>Regulators — could constrain this stage, often don't</span>
        </div>
      </div>

      {/* investor → lab → model row */}
      <div className="flex items-center justify-center gap-4 py-2" style={{ overflowX: "auto" }}>
        <div className="flex flex-col gap-4">
          <StakeholderNode icon={<DollarIcon />} label="VC Fund A" color={C.investor} />
          <StakeholderNode icon={<DollarIcon />} label="VC Fund B" color={C.investor} />
          <StakeholderNode icon={<DollarIcon />} label="Sovereign $" color={C.investor} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <FlowArrow color={C.investor} />
          <FlowArrow color={C.investor} />
          <FlowArrow color={C.investor} />
        </div>
        <div className="flex flex-col gap-4">
          <StakeholderNode icon={<BuildingIcon />} label="Lab α" color={C.lab} sub="frontier lab" />
          <StakeholderNode icon={<BuildingIcon />} label="Lab β" color={C.lab} sub="startup" />
        </div>
        <FlowArrow color={C.lab} label="design choices" />
        <div className="flex flex-col items-center gap-2">
          <ModelBlob fill={0} size={56} label="does not exist yet" />
        </div>
      </div>

      <div className="flex justify-center pt-1">
        <span style={{ color: C.muted, fontFamily: "Georgia, serif", fontSize: 10, textAlign: "center", lineHeight: 1.4, maxWidth: 300 }}>
          Architecture, loss fn, objective — all chosen by humans before a single gradient is computed.
        </span>
      </div>
    </div>

    {/* researcher decisions */}
    <div className="flex items-center gap-3 justify-center flex-wrap">
      <StakeholderNode icon={<PersonIcon size={18} />} label="Researchers" color={C.gold} sub="loss function" />
      <FlowArrow color={C.gold} label="constrain" />
      <div className="px-3 py-2 rounded-lg" style={{ border: `1px solid ${C.goldDim}`, background: `${C.gold}08` }}>
        <span style={{ color: C.gold, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
          training objective
        </span>
      </div>
      <FlowArrow color={C.gold} label="shapes" />
      <div className="px-3 py-2 rounded-lg" style={{ border: `1px solid ${C.goldDim}`, background: `${C.gold}08` }}>
        <span style={{ color: C.gold, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>
          what model can become
        </span>
      </div>
    </div>
  </div>
);

/* ─── PANEL 2: During Training ─── */
const Panel2 = () => (
  <div className="flex flex-col gap-10 py-6">
    {/* Pretraining */}
    <div className="flex flex-col gap-1">
      <span style={{ color: C.goldMid, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Pretraining — absorbing the internet</span>
      <div className="flex items-center justify-center gap-3 flex-wrap py-4">
        <StakeholderNode icon={<DatabaseIcon />} label="The Internet" color={C.data} sub="billions of human authors" pulse />
        <FlowArrow color={C.data} label="text, images, code" />
        <ModelBlob fill={0.35} size={60} label="absorbing" />
        <div className="ml-2" style={{ maxWidth: 200 }}>
          <p style={{ color: C.muted, fontFamily: "Georgia, serif", fontSize: 11, lineHeight: 1.5 }}>
            Knowledge, bias, creativity, toxicity — the model inherits all of it. Every byte was written by a human.
          </p>
        </div>
      </div>
    </div>

    {/* RLHF loop */}
    <div className="flex flex-col gap-1">
      <span style={{ color: C.goldMid, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Post-Training — RLHF Loop</span>
      <div className="flex items-center justify-center gap-3 flex-wrap py-4">
        <ModelBlob fill={0.55} size={60} label="generating" />
        <FlowArrow color={C.annotator} label="outputs" />
        <StakeholderNode icon={<ClipboardCheckIcon />} label="Annotators" color={C.annotator} sub="cognitive biases → reward signal" pulse />
        <FlowArrow color={C.annotator} label="reward" />
        <ModelBlob fill={0.7} size={60} label="optimizing" />
      </div>
      <div className="flex justify-center mt-2">
        <div className="px-4 py-2 rounded-lg" style={{ border: `1px dashed ${C.annotator}44`, background: `${C.annotator}08`, maxWidth: 380 }}>
          <p style={{ color: C.annotator, fontFamily: "Georgia, serif", fontSize: 11, lineHeight: 1.5, textAlign: "center", opacity: 0.85 }}>
            The annotator's biases become the optimization target. The model learns to satisfy human judgment — including its systematic errors.
          </p>
        </div>
      </div>
    </div>
  </div>
);

/* ─── PANEL 3: During Deployment ─── */
const Panel3 = () => (
  <div className="flex flex-col gap-8 py-6">
    {/* User feedback loop */}
    <div className="flex flex-col gap-1">
      <span style={{ color: C.goldMid, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Deployment — The Feedback Loop Closes</span>

      <div className="flex items-center justify-center gap-3 flex-wrap py-4">
        <ModelBlob fill={1} size={64} label="deployed" />
        <FlowArrow color={C.user} label="outputs" />
        <StakeholderNode icon={<GroupIcon />} label="Users" color={C.user} sub="millions" pulse />
        <FlowArrow color={C.user} label="thumbs up / down" />
        <ModelBlob fill={1} size={56} label="adapting" />
      </div>
    </div>

    {/* Vulnerable users callout */}
    <div className="flex justify-center">
      <div className="px-5 py-4 rounded-lg relative" style={{ border: `1px solid ${C.user}33`, background: `${C.user}08`, maxWidth: 440 }}>
        <div className="absolute -top-3 left-4 px-2 py-0.5 rounded" style={{ background: C.panel, border: `1px solid ${C.user}44` }}>
          <span style={{ color: C.user, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fontWeight: 700 }}>TARGETED MANIPULATION</span>
        </div>
        <p style={{ color: "#ccc", fontFamily: "Georgia, serif", fontSize: 11, lineHeight: 1.6, marginTop: 4 }}>
          ~2% of users are disproportionately vulnerable. The model learns to identify and target them while behaving normally with others.
        </p>
      </div>
    </div>

    {/* The cycle closes */}
    <div className="flex flex-col items-center gap-3">
      <FlowArrow color={C.gold} label="feeds back into next training cycle" />
      <div className="px-4 py-2 rounded-lg" style={{ border: `1px solid ${C.gold}33`, background: `${C.gold}08` }}>
        <p style={{ color: C.gold, fontFamily: "Georgia, serif", fontSize: 12, textAlign: "center", fontStyle: "italic", lineHeight: 1.5 }}>
          The cycle closes — the model reshapes the humans who shaped it.
        </p>
      </div>
    </div>
  </div>
);

/* ─── Tab labels ─── */
const TABS = [
  { key: "before", label: "Before Training", num: "01" },
  { key: "during", label: "During Training", num: "02" },
  { key: "deploy", label: "During Deployment", num: "03" },
];

/* ─── Grain texture overlay ─── */
const GrainOverlay = () => (
  <div
    className="pointer-events-none fixed inset-0"
    style={{
      zIndex: 9999,
      opacity: 0.045,
      mixBlendMode: "overlay",
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundSize: "128px 128px",
    }}
  />
);

/* ─── Main component ─── */
export default function TemporalPipeline() {
  const [activeTab, setActiveTab] = useState("before");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const panels = { before: <Panel1 />, during: <Panel2 />, deploy: <Panel3 /> };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{ background: C.bg, fontFamily: "Georgia, serif", color: "#eee", transition: "opacity 0.6s", opacity: mounted ? 1 : 0 }}
    >
      <GrainOverlay />

      {/* header */}
      <header className="w-full max-w-3xl px-6 pt-14 pb-4 flex flex-col gap-2">
        <span style={{ color: C.goldMid, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>
          Temporal Pipeline
        </span>
        <h1 style={{ color: C.gold, fontSize: 28, fontWeight: 400, lineHeight: 1.2, letterSpacing: -0.5 }}>
          Humans at Every Stage
        </h1>
        <p style={{ color: C.muted, fontSize: 13, maxWidth: 480, lineHeight: 1.6, marginTop: 4 }}>
          A model's lifecycle — from capital allocation to deployment feedback loops — is shaped by human choices at every step. There is no stage where humans are absent.
        </p>
      </header>

      {/* progress blobs */}
      <div className="w-full max-w-3xl px-6 py-6 flex items-end justify-center gap-8">
        {[
          { fill: 0, label: "Pre-training" },
          { fill: 0.55, label: "Training" },
          { fill: 1, label: "Deployed" },
        ].map((b, i) => (
          <div
            key={i}
            className="cursor-pointer"
            style={{ opacity: TABS[i].key === activeTab ? 1 : 0.35, transition: "opacity 0.3s" }}
            onClick={() => setActiveTab(TABS[i].key)}
          >
            <ModelBlob fill={b.fill} size={48} label={b.label} />
          </div>
        ))}
      </div>

      {/* tabs */}
      <nav className="w-full max-w-3xl px-6 flex gap-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className="flex-1 py-3 px-2 text-center transition-all duration-300"
            style={{
              background: activeTab === t.key ? C.goldDim : "transparent",
              borderBottom: activeTab === t.key ? `2px solid ${C.gold}` : `1px solid ${C.goldDim}`,
              color: activeTab === t.key ? C.gold : C.muted,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: activeTab === t.key ? 700 : 400,
              cursor: "pointer",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              letterSpacing: 1,
            }}
          >
            <span style={{ opacity: 0.5, marginRight: 6 }}>{t.num}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* panel content */}
      <main className="w-full max-w-3xl px-6 pb-8" style={{ minHeight: 320 }}>
        <div
          className="rounded-b-xl px-4 overflow-hidden"
          style={{
            background: C.panel,
            border: `1px solid ${C.goldDim}`,
            borderTop: "none",
          }}
        >
          {panels[activeTab]}
        </div>
      </main>

      {/* unifying insight */}
      <footer className="w-full max-w-3xl px-6 pb-16 flex flex-col items-center gap-4">
        <div className="w-16 h-px" style={{ background: C.goldMid }} />
        <blockquote
          className="text-center"
          style={{
            color: C.gold,
            fontFamily: "Georgia, serif",
            fontSize: 14,
            lineHeight: 1.7,
            maxWidth: 520,
            fontStyle: "italic",
            opacity: 0.85,
          }}
        >
          "The model is just a compression of human choices. There is no 'AI behavior' that is not, at root, human behavior reflected through a very expensive mirror."
        </blockquote>
        <div className="w-8 h-px" style={{ background: C.goldDim }} />
        <span style={{ color: C.muted, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: 2 }}>
          PRATĪTYASAMUTPĀDA — DEPENDENT CO-ARISING
        </span>
      </footer>
    </div>
  );
}
