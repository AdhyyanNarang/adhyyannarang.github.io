import { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import TemporalPipeline from '../viz/TemporalPipeline.jsx';

const ALLOWED_COMPONENTS = { TemporalPipeline };

export default function Preview({ frontmatter, body }) {
  const [Content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(async () => {
      try {
        const stripped = body.replace(/^\s*import .+$/gm, '');
        const { default: MDXContent } = await evaluate(stripped, {
          ...runtime,
          useMDXComponents: () => ALLOWED_COMPONENTS,
        });
        if (!cancelled) {
          setContent(() => MDXContent);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || String(e));
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [body]);

  return (
    <article style={{ maxWidth: 620, margin: '0 auto', padding: '40px 24px 120px' }}>
      <header style={{ marginBottom: 48 }}>
        {frontmatter.category && (
          <p className="label" style={{ marginBottom: 16 }}>{frontmatter.category}</p>
        )}
        <h1 style={{ fontSize: 28, fontWeight: 400, letterSpacing: '0.5px', marginBottom: 16, lineHeight: 1.3 }}>
          {frontmatter.title || 'Untitled'}
        </h1>
        <time style={{ fontSize: 12, color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
          {frontmatter.date}
        </time>
      </header>

      {error && (
        <div style={{
          color: 'var(--red)',
          background: 'var(--red-bg)',
          border: '1px solid var(--red)',
          padding: '12px 16px',
          borderRadius: 4,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          marginBottom: 24,
          whiteSpace: 'pre-wrap',
        }}>
          {error}
        </div>
      )}

      <div className="prose">
        {Content ? <Content /> : <p style={{ color: 'var(--text-dim)' }}>Loading…</p>}
      </div>
    </article>
  );
}
