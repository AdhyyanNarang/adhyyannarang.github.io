import { useState, useEffect, useId } from 'react';

const C = {
  bg: 'rgba(10, 10, 15, 0.4)',
  border: 'rgba(201, 169, 110, 0.18)',
  gold: '#c9a96e',
  goldDim: 'rgba(201, 169, 110, 0.35)',
  goldFaint: 'rgba(201, 169, 110, 0.12)',
  text: '#e8e4dc',
  textMuted: '#a8a298',
  textFaint: '#888278',
};

export default function ReinforcingLoop({
  leftLabel = 'Alignment',
  rightLabel = 'Capability',
  caption = 'A reinforcing loop: each side strengthens the other. Both grow without bound — at least until something else intervenes.',
}) {
  const [running, setRunning] = useState(true);
  const uid = useId().replace(/[:]/g, '');

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
      <svg viewBox="0 0 520 280" style={{ display: 'block', width: '100%', height: 'auto' }}>
        <defs>
          <marker
            id={`arrow-${uid}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.gold} />
          </marker>
        </defs>

        {/* Top arrow: left → right */}
        <path
          d="M 165 95 Q 260 50 355 95"
          fill="none"
          stroke={C.gold}
          strokeWidth="1.5"
          markerEnd={`url(#arrow-${uid})`}
        />
        {/* Bottom arrow: right → left */}
        <path
          d="M 355 185 Q 260 230 165 185"
          fill="none"
          stroke={C.gold}
          strokeWidth="1.5"
          markerEnd={`url(#arrow-${uid})`}
        />

        {/* Animated flow dots */}
        {running && (
          <>
            <circle r="3" fill={C.gold}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 165 95 Q 260 50 355 95" />
            </circle>
            <circle r="3" fill={C.gold}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M 355 185 Q 260 230 165 185" begin="1.5s" />
            </circle>
          </>
        )}

        {/* + signs on arrows */}
        <text x="260" y="55" textAnchor="middle" fill={C.gold} fontSize="20" fontFamily="serif">
          +
        </text>
        <text x="260" y="240" textAnchor="middle" fill={C.gold} fontSize="20" fontFamily="serif">
          +
        </text>

        {/* Left node */}
        <circle cx="115" cy="140" r="55" fill={C.goldFaint} stroke={C.gold} strokeWidth="1.5" />
        <text x="115" y="138" textAnchor="middle" fill={C.text} fontSize="13" fontFamily="serif" fontStyle="italic">
          {leftLabel}
        </text>
        <text x="115" y="156" textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">
          QUALITY
        </text>

        {/* Right node */}
        <circle cx="405" cy="140" r="55" fill={C.goldFaint} stroke={C.gold} strokeWidth="1.5" />
        <text x="405" y="138" textAnchor="middle" fill={C.text} fontSize="13" fontFamily="serif" fontStyle="italic">
          {rightLabel}
        </text>
        <text x="405" y="156" textAnchor="middle" fill={C.textFaint} fontSize="9" fontFamily="monospace" letterSpacing="1">
          QUALITY
        </text>

        {/* Center R indicator */}
        <circle cx="260" cy="140" r="22" fill="none" stroke={C.goldDim} strokeWidth="1" strokeDasharray="3 3" />
        <text x="260" y="146" textAnchor="middle" fill={C.gold} fontSize="18" fontFamily="serif" fontStyle="italic">
          R
        </text>
      </svg>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 20,
          gap: 16,
        }}
      >
        <figcaption
          style={{
            color: C.textMuted,
            fontFamily: 'serif',
            fontSize: 13,
            fontStyle: 'italic',
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {caption}
        </figcaption>
        <button
          onClick={() => setRunning((r) => !r)}
          style={{
            background: 'transparent',
            border: `1px solid ${C.border}`,
            color: C.textFaint,
            padding: '4px 10px',
            borderRadius: 3,
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {running ? 'Pause' : 'Play'}
        </button>
      </div>
    </figure>
  );
}
