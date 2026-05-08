const PRESETS = {
  todo:    { color: '#e08555', prefix: 'TODO' },
  thought: { color: '#c9a96e', prefix: 'thought' },
  rewrite: { color: '#e08555', prefix: 'rewrite' },
  warning: { color: '#c94e4e', prefix: 'warning' },
  aside:   { color: '#7a9cc6', prefix: 'aside' },
  cite:    { color: '#7aab8b', prefix: 'cite' },
};

export default function Note({ color, type, prefix, children }) {
  const preset = type && PRESETS[type] ? PRESETS[type] : null;
  const finalColor = color || (preset && preset.color) || '#c9a96e';
  const finalPrefix = prefix !== undefined ? prefix : (preset && preset.prefix);

  return (
    <span
      style={{
        color: finalColor,
        fontStyle: 'italic',
        fontSize: '0.94em',
        opacity: 0.92,
        borderLeft: `2px solid ${finalColor}`,
        paddingLeft: '10px',
        marginLeft: '2px',
        display: 'inline',
      }}
    >
      {finalPrefix && (
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.78em',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            opacity: 0.7,
            marginRight: '8px',
          }}
        >
          [ {finalPrefix} ]
        </span>
      )}
      {children}
    </span>
  );
}
