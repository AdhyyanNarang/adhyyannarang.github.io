import { useState, useId, useMemo } from 'react';

const C = {
  bg: 'rgba(10, 10, 15, 0.4)',
  border: 'rgba(201, 169, 110, 0.18)',
  gold: '#c9a96e',
  goldDim: 'rgba(201, 169, 110, 0.35)',
  goldFaint: 'rgba(201, 169, 110, 0.12)',
  red: '#c94e4e',
  redDim: 'rgba(201, 78, 78, 0.45)',
  redFaint: 'rgba(201, 78, 78, 0.10)',
  text: '#e8e4dc',
  textMuted: '#a8a298',
  textFaint: '#888278',
  grid: 'rgba(201, 169, 110, 0.07)',
};

function trajectoryAt(t) {
  const trueMis = 1 - Math.exp(-2.6 * t);
  const visiblePatched = 0.32 * Math.exp(-3.2 * t);
  const visibleSpike = 1 / (1 + Math.exp(-30 * (trueMis - 0.93)));
  const visible = Math.min(1, visiblePatched + visibleSpike);
  return { trueMis, visible };
}

export default function ShiftingTheBurden({
  caption = "Patches keep visible misalignment low — even declining — while true misalignment quietly grows. Low visible misalignment reduces perceived urgency, starving the genuine fixes that would address the root cause. By the time symptoms break through, the underlying problem is past containing.",
}) {
  const [t, setT] = useState(0.55);
  const uid = useId().replace(/[:]/g, '');

  const { visible, trueMis } = trajectoryAt(t);
  // Diagram intensities tied to the same dynamics
  const patchUse = Math.min(1, 0.4 + t * 0.6);          // patches accumulating
  const fixesActivity = Math.max(0.12, 1 - t * 0.85);   // genuine fixes atrophying

  const N = 100;
  const points = useMemo(
    () => Array.from({ length: N + 1 }, (_, i) => {
      const tt = i / N;
      const { visible, trueMis } = trajectoryAt(tt);
      return { t: tt, V: visible, T: trueMis };
    }),
    []
  );

  const catIdx = points.findIndex((p, i) => i > 0 && p.V > 0.5 && points[i - 1].V <= 0.5);
  const catT = catIdx >= 0 ? points[catIdx].t : 1;

  // ─── SVG geometry ───
  const W = 580;
  const diagramH = 320;
  const chartTop = 360;
  const chartH = 165;
  const totalH = chartTop + chartH + 30;

  // 2×2 grid
  const boxW = 150, boxH = 56;
  const TL = { x: 35, y: 30 };          // Patches
  const TR = { x: 395, y: 30 };         // Visible misalignment
  const BL = { x: 35, y: 240 };         // Genuine fixes
  const BR = { x: 395, y: 240 };        // True misalignment

  // Arrow markers
  const aGold = `url(#aG-${uid})`;
  const aRed  = `url(#aR-${uid})`;
  const aMuted = `url(#aM-${uid})`;

  // Chart layout
  const chartX = 60, chartW = 470;
  const visiblePath = points.map((p, i) => {
    const px = chartX + p.t * chartW;
    const py = chartTop + (1 - p.V) * chartH;
    return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
  }).join(' ');
  const truePath = points.map((p, i) => {
    const px = chartX + p.t * chartW;
    const py = chartTop + (1 - p.T) * chartH;
    return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
  }).join(' ');
  const scrubX = chartX + t * chartW;

  return (
    <figure
      style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: '32px 24px 20px',
        margin: '36px 0',
      }}
    >
      <svg viewBox={`0 0 ${W} ${totalH}`} style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <marker id={`aG-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.gold} />
          </marker>
          <marker id={`aR-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.red} />
          </marker>
          <marker id={`aM-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.textFaint} />
          </marker>
        </defs>

        {/* ─── Top row: Patches  ↔  Visible misalignment ─── */}
        <rect x={TL.x} y={TL.y} width={boxW} height={boxH} rx="3"
              fill={C.goldFaint} stroke={C.gold} strokeWidth="1.5" opacity={0.4 + patchUse * 0.6} />
        <text x={TL.x + boxW/2} y={TL.y + 24} textAnchor="middle" fill={C.text} fontSize="13" fontFamily="serif" fontStyle="italic">Short-term patches</text>
        <text x={TL.x + boxW/2} y={TL.y + 42} textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">QUICK FIX</text>

        <rect x={TR.x} y={TR.y} width={boxW} height={boxH} rx="3"
              fill={C.redFaint} stroke={C.red} strokeWidth="1.5" opacity={0.4 + visible * 0.6} />
        <text x={TR.x + boxW/2} y={TR.y + 22} textAnchor="middle" fill={C.text} fontSize="13" fontFamily="serif" fontStyle="italic">Visible misalignment</text>
        <text x={TR.x + boxW/2} y={TR.y + 38} textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">SYMPTOM</text>
        <text x={TR.x + boxW - 8} y={TR.y + 50} textAnchor="end" fill={C.textFaint} fontSize="9" fontFamily="monospace">{visible.toFixed(2)}</text>

        {/* B1 loop arrows: Visible drives Patches (top); Patches reduce Visible (bottom) */}
        <path d={`M ${TR.x} ${TR.y + 18} Q 270 -10 ${TL.x + boxW} ${TL.y + 18}`}
              fill="none" stroke={C.gold} strokeWidth="1.2" markerEnd={aGold} />
        <text x="270" y="6" textAnchor="middle" fill={C.gold} fontSize="10" fontFamily="serif" fontStyle="italic">drives</text>
        <path d={`M ${TL.x + boxW} ${TL.y + 38} Q 270 130 ${TR.x} ${TR.y + 38}`}
              fill="none" stroke={C.gold} strokeWidth="1.2" markerEnd={aGold} />
        <text x="270" y="120" textAnchor="middle" fill={C.gold} fontSize="10" fontFamily="serif" fontStyle="italic">reduces (−)</text>

        {/* B1 indicator */}
        <circle cx="270" cy="58" r="14" fill="none" stroke={C.goldDim} strokeDasharray="2 2" />
        <text x="270" y="62" textAnchor="middle" fill={C.gold} fontSize="13" fontFamily="serif" fontStyle="italic">B1</text>

        {/* ─── Bottom row: Genuine fixes  ↔  True misalignment ─── */}
        <rect x={BL.x} y={BL.y} width={boxW} height={boxH} rx="3"
              fill={C.goldFaint} stroke={C.gold} strokeWidth="1.5" opacity={0.25 + fixesActivity * 0.7} />
        <text x={BL.x + boxW/2} y={BL.y + 24} textAnchor="middle" fill={C.text} fontSize="13" fontFamily="serif" fontStyle="italic" opacity={0.4 + fixesActivity * 0.6}>Genuine fixes</text>
        <text x={BL.x + boxW/2} y={BL.y + 42} textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1" opacity={0.4 + fixesActivity * 0.6}>FUNDAMENTAL</text>

        <rect x={BR.x} y={BR.y} width={boxW} height={boxH} rx="3"
              fill={C.redFaint} stroke={C.red} strokeWidth="1.5" opacity={0.4 + trueMis * 0.6} />
        <text x={BR.x + boxW/2} y={BR.y + 22} textAnchor="middle" fill={C.text} fontSize="13" fontFamily="serif" fontStyle="italic">True misalignment</text>
        <text x={BR.x + boxW/2} y={BR.y + 38} textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">ROOT CAUSE</text>
        <text x={BR.x + boxW - 8} y={BR.y + 50} textAnchor="end" fill={C.textFaint} fontSize="9" fontFamily="monospace">{trueMis.toFixed(2)}</text>

        {/* Diagonal: Visible drives Genuine fixes (in theory — but signal weakened by Patches suppressing Visible) */}
        <path
          d={`M ${TR.x + 30} ${TR.y + boxH} Q 280 170 ${BL.x + boxW - 30} ${BL.y}`}
          fill="none" stroke={C.gold} strokeWidth="1.2" markerEnd={aGold} opacity={0.35 + fixesActivity * 0.65}
        />
        <text x="320" y="158" textAnchor="middle" fill={C.gold} fontSize="10" fontFamily="serif" fontStyle="italic" opacity={0.35 + fixesActivity * 0.65}>
          drives (in theory)
        </text>

        {/* Bottom: Genuine fixes reduces True misalignment — open chain, no return */}
        <path
          d={`M ${BL.x + boxW} ${BL.y + boxH/2} L ${BR.x} ${BR.y + boxH/2}`}
          fill="none" stroke={C.gold} strokeWidth="1.2" markerEnd={aGold} opacity={0.35 + fixesActivity * 0.65}
        />
        <text x="270" y={BL.y + boxH/2 - 8} textAnchor="middle" fill={C.gold} fontSize="10" fontFamily="serif" fontStyle="italic" opacity={0.35 + fixesActivity * 0.65}>
          reduces (−)
        </text>

        {/* "No feedback" annotation — the archetype's central asymmetry */}
        <text x={BR.x + boxW/2} y={BR.y + boxH + 22} textAnchor="middle" fill={C.textFaint} fontSize="10" fontFamily="serif" fontStyle="italic" opacity="0.75">
          no return arrow — True is unobserved
        </text>

        {/* ─── Section divider ─── */}
        <line x1={chartX} y1={chartTop - 30} x2={chartX + chartW} y2={chartTop - 30} stroke={C.border} strokeWidth="1" opacity="0.5" />
        <text x={chartX} y={chartTop - 12} fill={C.textFaint} fontSize="10" fontFamily="monospace" letterSpacing="1.5">DYNAMICS OVER TIME</text>

        {/* ─── Chart ─── */}
        <line x1={chartX} y1={chartTop} x2={chartX} y2={chartTop + chartH} stroke={C.border} strokeWidth="1" />
        <line x1={chartX} y1={chartTop + chartH} x2={chartX + chartW} y2={chartTop + chartH} stroke={C.border} strokeWidth="1" />
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={chartX} y1={chartTop + g * chartH} x2={chartX + chartW} y2={chartTop + g * chartH} stroke={C.grid} strokeWidth="1" />
        ))}

        {/* Catastrophe vertical marker */}
        <line
          x1={chartX + catT * chartW} y1={chartTop}
          x2={chartX + catT * chartW} y2={chartTop + chartH}
          stroke={C.red} strokeDasharray="3 3" strokeWidth="1" opacity="0.7"
        />
        <text x={chartX + catT * chartW - 6} y={chartTop + 14} textAnchor="end"
              fill={C.red} fontSize="10" fontFamily="monospace" letterSpacing="1" opacity="0.85">TOO LATE</text>

        {/* Lines */}
        <path d={truePath} fill="none" stroke={C.red} strokeWidth="1.5" />
        <path d={visiblePath} fill="none" stroke={C.gold} strokeWidth="1.5" />

        {/* Scrubber */}
        <line x1={scrubX} y1={chartTop} x2={scrubX} y2={chartTop + chartH} stroke={C.textFaint} strokeWidth="1" opacity="0.5" />
        <circle cx={scrubX} cy={chartTop + (1 - visible) * chartH} r="3.5" fill={C.gold} />
        <circle cx={scrubX} cy={chartTop + (1 - trueMis) * chartH} r="3.5" fill={C.red} />

        {/* Y-axis labels */}
        <text x={chartX - 8} y={chartTop + 4} textAnchor="end" fill={C.textFaint} fontSize="10" fontFamily="monospace">1.0</text>
        <text x={chartX - 8} y={chartTop + chartH + 4} textAnchor="end" fill={C.textFaint} fontSize="10" fontFamily="monospace">0.0</text>
        <text x={chartX} y={chartTop + chartH + 22} fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">time →</text>

        {/* Legend */}
        <g transform={`translate(${chartX + chartW - 200}, ${chartTop - 14})`}>
          <line x1="0" y1="4" x2="22" y2="4" stroke={C.gold} strokeWidth="1.5" />
          <text x="28" y="8" fill={C.textMuted} fontSize="10" fontFamily="monospace">visible</text>
          <line x1="100" y1="4" x2="122" y2="4" stroke={C.red} strokeWidth="1.5" />
          <text x="128" y="8" fill={C.textMuted} fontSize="10" fontFamily="monospace">true</text>
        </g>
      </svg>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <label style={{ color: C.textFaint, fontFamily: 'monospace', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase', minWidth: 130 }}>
            Time
          </label>
          <input
            type="range" min="0" max="100" value={t * 100}
            onChange={(e) => setT(Number(e.target.value) / 100)}
            style={{ flex: 1, accentColor: C.gold }}
          />
          <span style={{ color: C.textMuted, fontFamily: 'monospace', fontSize: 11, minWidth: 40, textAlign: 'right' }}>
            {(t * 100).toFixed(0)}%
          </span>
        </div>
        <figcaption style={{ color: C.textMuted, fontFamily: 'serif', fontSize: 13, fontStyle: 'italic', lineHeight: 1.6 }}>
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
