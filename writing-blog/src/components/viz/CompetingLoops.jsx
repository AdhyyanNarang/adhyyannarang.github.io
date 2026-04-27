import { useState, useId, useMemo } from 'react';

const C = {
  bg: 'rgba(10, 10, 15, 0.4)',
  border: 'rgba(201, 169, 110, 0.18)',
  gold: '#c9a96e',
  goldDim: 'rgba(201, 169, 110, 0.35)',
  goldFaint: 'rgba(201, 169, 110, 0.12)',
  red: '#c94e4e',
  redDim: 'rgba(201, 78, 78, 0.35)',
  redFaint: 'rgba(201, 78, 78, 0.10)',
  text: '#e8e4dc',
  textMuted: '#a8a298',
  textFaint: '#888278',
  grid: 'rgba(201, 169, 110, 0.07)',
};

export default function CompetingLoops({
  caption = "Even strong stabilizing forces can't keep up if the destabilizing side has reinforcing momentum. Increase alignment effort: the slope flattens, but the trend is unchanged.",
}) {
  const [effort, setEffort] = useState(0.5);
  const uid = useId().replace(/[:]/g, '');

  // Trajectory: oversight over time
  const trajectory = useMemo(() => {
    const N = 60;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N; // 0 to 1
      // destabilizing momentum (reinforcing — saturates near 1)
      const D = 1 - Math.exp(-t * 4);
      // alignment effort dampens loss
      const oversight = Math.max(0, 1 - Math.max(0, D - effort * 0.6));
      pts.push({ t, y: oversight });
    }
    return pts;
  }, [effort]);

  const finalOversight = trajectory[trajectory.length - 1].y;

  // chart layout
  const chartX = 60, chartY = 180, chartW = 460, chartH = 110;
  const path = trajectory
    .map((p, i) => {
      const px = chartX + p.t * chartW;
      const py = chartY + (1 - p.y) * chartH;
      return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
    })
    .join(' ');

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
      <svg viewBox="0 0 580 340" style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <marker id={`arrG-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.gold} />
          </marker>
          <marker id={`arrR-${uid}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.red} />
          </marker>
        </defs>

        {/* Top: opposing loops sketch */}
        {/* Left node: alignment work (balancing) */}
        <g>
          <circle cx="100" cy="70" r="42" fill={C.goldFaint} stroke={C.gold} strokeWidth="1.5" />
          <text x="100" y="66" textAnchor="middle" fill={C.text} fontSize="11" fontFamily="serif" fontStyle="italic">
            Alignment
          </text>
          <text x="100" y="80" textAnchor="middle" fill={C.text} fontSize="11" fontFamily="serif" fontStyle="italic">
            effort
          </text>
          {/* self-loop — exits node bottom-left, loops out, re-enters from below */}
          <path d="M 75 105 Q 30 130 60 145 Q 95 155 105 118" fill="none" stroke={C.gold} strokeWidth="1" markerEnd={`url(#arrG-${uid})`} opacity="0.7" />
          <text x="35" y="158" fill={C.gold} fontSize="11" fontFamily="serif" fontStyle="italic" opacity="0.85">B</text>
        </g>

        {/* Right node: capability momentum (reinforcing) */}
        <g>
          <circle cx="480" cy="70" r="48" fill={C.redFaint} stroke={C.red} strokeWidth="1.5" />
          <text x="480" y="66" textAnchor="middle" fill={C.text} fontSize="11" fontFamily="serif" fontStyle="italic">
            Capability
          </text>
          <text x="480" y="80" textAnchor="middle" fill={C.text} fontSize="11" fontFamily="serif" fontStyle="italic">
            momentum
          </text>
          {/* self-loop — exits node bottom-right, loops out, re-enters from below */}
          <path d="M 510 110 Q 555 130 525 145 Q 485 158 470 122" fill="none" stroke={C.red} strokeWidth="1" markerEnd={`url(#arrR-${uid})`} opacity="0.7" />
          <text x="555" y="158" fill={C.red} fontSize="11" fontFamily="serif" fontStyle="italic" opacity="0.85">R</text>
        </g>

        {/* Center: opposing arrows pushing on the system */}
        <g>
          <path d="M 295 70 L 165 70" fill="none" stroke={C.gold} strokeWidth="1.5" markerEnd={`url(#arrG-${uid})`} />
          <path d="M 285 70 L 415 70" fill="none" stroke={C.red} strokeWidth="1.5" markerEnd={`url(#arrR-${uid})`} />
          <text x="290" y="50" textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1.5">
            HUMAN OVERSIGHT
          </text>
        </g>

        {/* Chart axes */}
        <line x1={chartX} y1={chartY} x2={chartX} y2={chartY + chartH} stroke={C.border} strokeWidth="1" />
        <line x1={chartX} y1={chartY + chartH} x2={chartX + chartW} y2={chartY + chartH} stroke={C.border} strokeWidth="1" />

        {/* Grid */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line key={g} x1={chartX} y1={chartY + g * chartH} x2={chartX + chartW} y2={chartY + g * chartH} stroke={C.grid} strokeWidth="1" />
        ))}

        {/* Y-axis labels */}
        <text x={chartX - 8} y={chartY + 4} textAnchor="end" fill={C.textFaint} fontSize="10" fontFamily="monospace">
          1.0
        </text>
        <text x={chartX - 8} y={chartY + chartH + 4} textAnchor="end" fill={C.textFaint} fontSize="10" fontFamily="monospace">
          0.0
        </text>
        <text x={chartX - 8} y={chartY + chartH + 18} fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">
          time →
        </text>
        <text
          x={chartX - 30}
          y={chartY + chartH / 2}
          textAnchor="middle"
          fill={C.textFaint}
          fontSize="9"
          fontFamily="monospace"
          letterSpacing="1"
          transform={`rotate(-90, ${chartX - 30}, ${chartY + chartH / 2})`}
        >
          OVERSIGHT
        </text>

        {/* Trajectory line */}
        <path d={path} fill="none" stroke={C.gold} strokeWidth="1.5" />

        {/* Endpoint dot */}
        <circle
          cx={chartX + chartW}
          cy={chartY + (1 - finalOversight) * chartH}
          r="3.5"
          fill={C.gold}
        />
        <text
          x={chartX + chartW + 8}
          y={chartY + (1 - finalOversight) * chartH + 4}
          fill={C.textMuted}
          fontSize="11"
          fontFamily="monospace"
        >
          {finalOversight.toFixed(2)}
        </text>
      </svg>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <label
            style={{
              color: C.textFaint,
              fontFamily: 'monospace',
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              minWidth: 130,
            }}
          >
            Alignment effort
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={effort * 100}
            onChange={(e) => setEffort(Number(e.target.value) / 100)}
            style={{ flex: 1, accentColor: C.gold }}
          />
          <span style={{ color: C.textMuted, fontFamily: 'monospace', fontSize: 11, minWidth: 40, textAlign: 'right' }}>
            {Math.round(effort * 100)}%
          </span>
        </div>
        <figcaption
          style={{
            color: C.textMuted,
            fontFamily: 'serif',
            fontSize: 13,
            fontStyle: 'italic',
            lineHeight: 1.6,
          }}
        >
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}
