import { useState } from 'react';
import { setToken } from './githubClient.js';

export default function TokenModal({ onSaved, onCancel }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setToken(value.trim());
    onSaved();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <form onSubmit={submit} style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-strong)',
        borderRadius: 6,
        padding: 32,
        maxWidth: 520,
        width: '90%',
      }}>
        <h2 className="label" style={{ marginBottom: 16, color: 'var(--gold)' }}>
          GitHub Token Required
        </h2>
        <p style={{ marginBottom: 16, color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
          To save changes, paste a GitHub Personal Access Token. Create one at{' '}
          <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noreferrer">
            github.com/settings/personal-access-tokens
          </a>{' '}
          with <strong>Contents: Read and write</strong> access on the{' '}
          <code style={{ fontFamily: 'var(--font-mono)' }}>adhyyannarang.github.io</code> repo.
        </p>
        <p style={{ marginBottom: 20, color: 'var(--text-dim)', fontSize: 12 }}>
          The token is stored only in your browser's localStorage and sent only to api.github.com.
        </p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="github_pat_…"
          autoFocus
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'var(--bg)',
            border: '1px solid var(--border-strong)',
            borderRadius: 4,
            color: 'var(--text)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            marginBottom: 20,
          }}
        />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button type="button" onClick={onCancel} className="admin-btn-ghost">Cancel</button>
          <button type="submit" className="admin-btn-primary">Save token</button>
        </div>
      </form>
    </div>
  );
}
