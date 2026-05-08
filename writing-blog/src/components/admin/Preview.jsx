import { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePos from './rehypePos.js';
import TemporalPipeline from '../viz/TemporalPipeline.jsx';
import ReinforcingLoop from '../viz/ReinforcingLoop.jsx';
import ShiftingTheBurden from '../viz/ShiftingTheBurden.jsx';
import CompetingLoops from '../viz/CompetingLoops.jsx';
import Note from '../Note.jsx';

const ALLOWED_COMPONENTS = { TemporalPipeline, ReinforcingLoop, ShiftingTheBurden, CompetingLoops, Note };

export default function Preview({ frontmatter, body, onJumpToSource }) {
  const [Content, setContent] = useState(null);
  const [error, setError] = useState(null);
  const [navMode, setNavMode] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = setTimeout(async () => {
      try {
        const stripped = body.replace(/^\s*import .+$/gm, '');
        const { default: MDXContent } = await evaluate(stripped, {
          ...runtime,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex, rehypePos],
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

  // Track Cmd/Ctrl held state for the nav cursor cue
  useEffect(() => {
    const onDown = (e) => { if (e.metaKey || e.ctrlKey) setNavMode(true); };
    const onUp = (e) => { if (!e.metaKey && !e.ctrlKey) setNavMode(false); };
    const onBlur = () => setNavMode(false);
    document.addEventListener('keydown', onDown);
    document.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      document.removeEventListener('keydown', onDown);
      document.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  function handleClick(e) {
    if (!e.metaKey && !e.ctrlKey) return;
    let el = e.target;
    while (el && !(el.dataset && el.dataset.posStart)) el = el.parentElement;
    if (!el) return;
    e.preventDefault();
    onJumpToSource?.(Number(el.dataset.posStart), Number(el.dataset.posEnd));
  }

  return (
    <article
      onClick={handleClick}
      style={{
        maxWidth: 620,
        margin: '0 auto',
        padding: '40px 24px 120px',
        cursor: navMode ? 'pointer' : 'default',
      }}
    >
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
