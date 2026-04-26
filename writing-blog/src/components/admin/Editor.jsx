import { useState, useMemo, useRef } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Preview from './Preview.jsx';
import TokenModal from './TokenModal.jsx';
import { getToken, getFileSha, putFile, deleteFile, clearToken } from './githubClient.js';
import './styles.css';

const publishedGlob = import.meta.glob('../../pages/posts/*.mdx', {
  query: '?raw', import: 'default', eager: true,
});
const draftsGlob = import.meta.glob('../../drafts/*.mdx', {
  query: '?raw', import: 'default', eager: true,
});

const PUBLISHED_DIR = 'writing-blog/src/pages/posts';
const DRAFTS_DIR = 'writing-blog/src/drafts';
const LAYOUT_PATH = '../../layouts/PostLayout.astro';
const CATEGORY_OPTIONS = ['AI SAFETY', 'GAME THEORY', 'SYSTEMS'];

const COMPONENT_IMPORTS = {
  TemporalPipeline: "import TemporalPipeline from '../../components/viz/TemporalPipeline.jsx';",
};

function slugify(title) {
  return (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'untitled';
}

function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: text };
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const lm = line.match(/^(\w+):\s*(.*)$/);
    if (!lm) continue;
    let [, key, val] = lm;
    val = val.trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    } else if (val === 'true') val = true;
    else if (val === 'false') val = false;
    else if (/^-?\d+(\.\d+)?$/.test(val)) val = Number(val);
    fm[key] = val;
  }
  return { frontmatter: fm, body: m[2] };
}

function stringifyFrontmatter(fm, body) {
  const lines = ['---'];
  for (const [k, v] of Object.entries(fm)) {
    if (v === undefined || v === null || v === '') continue;
    if (typeof v === 'boolean' || typeof v === 'number') {
      lines.push(`${k}: ${v}`);
    } else {
      const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      lines.push(`${k}: "${escaped}"`);
    }
  }
  lines.push('---', '', body.replace(/^\n+/, ''));
  return lines.join('\n');
}

function stripImports(body) {
  return body.replace(/^\s*import\s+.+$/gm, '').replace(/^\n+/, '');
}

function injectImports(body) {
  const used = new Set();
  for (const name of Object.keys(COMPONENT_IMPORTS)) {
    if (new RegExp(`<${name}\\b`).test(body)) used.add(name);
  }
  if (used.size === 0) return body;
  const importLines = Array.from(used).map((n) => COMPONENT_IMPORTS[n]).join('\n');
  return `${importLines}\n\n${body}`;
}

function buildInitialFiles() {
  const files = [];
  for (const [path, content] of Object.entries(publishedGlob)) {
    const slug = path.split('/').pop().replace(/\.mdx$/, '');
    files.push({ slug, location: 'published', content });
  }
  for (const [path, content] of Object.entries(draftsGlob)) {
    const slug = path.split('/').pop().replace(/\.mdx$/, '');
    files.push({ slug, location: 'draft', content });
  }
  return files;
}

export default function Editor() {
  const [files, setFiles] = useState(buildInitialFiles);
  const [currentSlug, setCurrentSlug] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [frontmatter, setFrontmatter] = useState({});
  const [body, setBody] = useState('');
  const [dirty, setDirty] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const drafts = useMemo(() => files.filter((f) => f.location === 'draft'), [files]);
  const published = useMemo(() => files.filter((f) => f.location === 'published'), [files]);

  function loadFile(file) {
    const { frontmatter: fm, body: rawBody } = parseFrontmatter(file.content);
    delete fm.layout;
    setCurrentSlug(file.slug);
    setCurrentLocation(file.location);
    setFrontmatter(fm);
    setBody(stripImports(rawBody));
    setDirty(false);
    setStatus('');
  }

  function newDraft() {
    setCurrentSlug('untitled');
    setCurrentLocation('new');
    setFrontmatter({ title: '', date: '', category: CATEGORY_OPTIONS[0], description: '', hasViz: false });
    setBody('');
    setDirty(true);
    setStatus('Unsaved');
  }

  function updateFm(key, value) {
    setFrontmatter((fm) => ({ ...fm, [key]: value }));
    setDirty(true);
    if (key === 'title' && currentLocation === 'new') {
      setCurrentSlug(slugify(value));
    }
  }

  function updateBody(value) {
    setBody(value);
    setDirty(true);
  }

  function requireToken(action) {
    if (getToken()) return action();
    setPendingAction(() => action);
    setShowTokenModal(true);
  }

  async function save() {
    requireToken(async () => {
      setBusy(true);
      setStatus('Saving…');
      try {
        const slug = currentSlug || slugify(frontmatter.title);
        const dir = currentLocation === 'published' ? PUBLISHED_DIR : DRAFTS_DIR;
        const path = `${dir}/${slug}.mdx`;
        const fullFm = { layout: LAYOUT_PATH, ...frontmatter };
        const content = stringifyFrontmatter(fullFm, injectImports(body));
        let sha = null;
        if (currentLocation !== 'new') {
          sha = await getFileSha(path);
        }
        const message = currentLocation === 'new'
          ? `Draft: ${frontmatter.title || slug}`
          : `Update ${frontmatter.title || slug}`;
        await putFile({ path, content, message, sha });

        if (currentLocation === 'new') {
          setCurrentLocation('draft');
          setFiles((f) => [...f, { slug, location: 'draft', content }]);
        } else {
          setFiles((f) => f.map((file) =>
            file.slug === slug && file.location === currentLocation
              ? { ...file, content } : file));
        }
        setDirty(false);
        setStatus(`Saved ${new Date().toLocaleTimeString()}`);
      } catch (e) {
        setStatus(`Error: ${e.message}`);
      } finally {
        setBusy(false);
      }
    });
  }

  async function moveFile(fromDir, toDir, fromLocation, toLocation, verb) {
    requireToken(async () => {
      setBusy(true);
      setStatus(`${verb}…`);
      try {
        const slug = currentSlug;
        const fromPath = `${fromDir}/${slug}.mdx`;
        const toPath = `${toDir}/${slug}.mdx`;
        const fullFm = { layout: LAYOUT_PATH, ...frontmatter };
        const content = stringifyFrontmatter(fullFm, injectImports(body));

        await putFile({
          path: toPath,
          content,
          message: `${verb}: ${frontmatter.title || slug}`,
        });

        const fromSha = await getFileSha(fromPath);
        if (fromSha) {
          await deleteFile({
            path: fromPath,
            sha: fromSha,
            message: `Remove ${fromLocation}: ${frontmatter.title || slug}`,
          });
        }

        setCurrentLocation(toLocation);
        setFiles((f) => f.map((file) =>
          file.slug === slug && file.location === fromLocation
            ? { ...file, location: toLocation, content } : file));
        setDirty(false);
        setStatus(`${verb}ed ${new Date().toLocaleTimeString()}`);
      } catch (e) {
        setStatus(`Error: ${e.message}`);
      } finally {
        setBusy(false);
      }
    });
  }

  const publish = () => moveFile(DRAFTS_DIR, PUBLISHED_DIR, 'draft', 'published', 'Publish');
  const unpublish = () => moveFile(PUBLISHED_DIR, DRAFTS_DIR, 'published', 'draft', 'Unpublish');

  function signOut() {
    clearToken();
    setStatus('Signed out');
  }

  const sidebarRef = useRef(null);
  const previewRef = useRef(null);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [previewHidden, setPreviewHidden] = useState(false);

  function toggleSidebar() {
    const p = sidebarRef.current;
    if (!p) return;
    p.isCollapsed() ? p.expand() : p.collapse();
  }
  function togglePreview() {
    const p = previewRef.current;
    if (!p) return;
    p.isCollapsed() ? p.expand() : p.collapse();
  }

  const empty = currentSlug === null;

  return (
    <div className="admin-shell">
      {showTokenModal && (
        <TokenModal
          onSaved={() => {
            const action = pendingAction;
            setShowTokenModal(false);
            setPendingAction(null);
            action?.();
          }}
          onCancel={() => {
            setShowTokenModal(false);
            setPendingAction(null);
          }}
        />
      )}

      <PanelGroup direction="horizontal" autoSaveId="admin-layout">
        <Panel
          ref={sidebarRef}
          defaultSize={20}
          minSize={12}
          maxSize={40}
          collapsible
          collapsedSize={0}
          onCollapse={() => setSidebarHidden(true)}
          onExpand={() => setSidebarHidden(false)}
        >
      <aside className="admin-sidebar">
        <div className="admin-sidebar-head">
          <h2 className="label">Writing</h2>
          <button onClick={newDraft} className="admin-btn-primary">+ New post</button>
        </div>

        <section className="admin-section">
          <h3 className="label">Drafts</h3>
          {drafts.length === 0 && <p className="admin-empty">No drafts</p>}
          <ul>
            {drafts.map((f) => {
              const fm = parseFrontmatter(f.content).frontmatter;
              const active = currentSlug === f.slug && currentLocation === 'draft';
              return (
                <li key={`d-${f.slug}`}>
                  <button
                    className={`admin-post-btn ${active ? 'active' : ''}`}
                    onClick={() => loadFile(f)}
                  >
                    {fm.title || f.slug}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="admin-section">
          <h3 className="label">Published</h3>
          {published.length === 0 && <p className="admin-empty">No posts</p>}
          <ul>
            {published.map((f) => {
              const fm = parseFrontmatter(f.content).frontmatter;
              const active = currentSlug === f.slug && currentLocation === 'published';
              return (
                <li key={`p-${f.slug}`}>
                  <button
                    className={`admin-post-btn ${active ? 'active' : ''}`}
                    onClick={() => loadFile(f)}
                  >
                    {fm.title || f.slug}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="admin-sidebar-foot">
          <button onClick={signOut} className="admin-btn-ghost">Sign out</button>
        </div>
      </aside>
        </Panel>

        <PanelResizeHandle className="admin-resize-handle" />

        <Panel defaultSize={40} minSize={25}>
      <main className="admin-editor">
        {empty ? (
          <div className="admin-placeholder">
            <p>Select a post or create a new draft.</p>
          </div>
        ) : (
          <>
            <div className="admin-topbar">
              <div className="admin-toggles">
                <button
                  className={`admin-toggle ${sidebarHidden ? 'off' : 'on'}`}
                  onClick={toggleSidebar}
                  title="Toggle sidebar"
                >
                  Sidebar
                </button>
                <button
                  className={`admin-toggle ${previewHidden ? 'off' : 'on'}`}
                  onClick={togglePreview}
                  title="Toggle preview"
                >
                  Preview
                </button>
              </div>
              <span className="admin-loc">
                {currentLocation === 'new' ? 'NEW DRAFT' : currentLocation.toUpperCase()} · {currentSlug}
              </span>
              <div className="admin-actions">
                <span className="admin-status">{dirty && currentLocation !== 'new' ? 'Unsaved · ' : ''}{status}</span>
                <button onClick={save} disabled={busy} className="admin-btn-primary">Save</button>
                {currentLocation === 'draft' && (
                  <button onClick={publish} disabled={busy || dirty} className="admin-btn-secondary" title={dirty ? 'Save first' : ''}>Publish</button>
                )}
                {currentLocation === 'published' && (
                  <button onClick={unpublish} disabled={busy || dirty} className="admin-btn-ghost" title={dirty ? 'Save first' : ''}>Unpublish</button>
                )}
              </div>
            </div>

            <div className="admin-form">
              <input
                className="admin-input"
                value={frontmatter.title || ''}
                onChange={(e) => updateFm('title', e.target.value)}
                placeholder="Title"
              />
              <div className="admin-row">
                <input
                  className="admin-input"
                  value={frontmatter.date || ''}
                  onChange={(e) => updateFm('date', e.target.value)}
                  placeholder="Date e.g. April 2026"
                />
                <select
                  className="admin-input"
                  value={frontmatter.category || ''}
                  onChange={(e) => updateFm('category', e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input
                className="admin-input"
                value={frontmatter.description || ''}
                onChange={(e) => updateFm('description', e.target.value)}
                placeholder="Description"
              />
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={!!frontmatter.hasViz}
                  onChange={(e) => updateFm('hasViz', e.target.checked)}
                />
                Has interactive viz
              </label>
            </div>

            <textarea
              className="admin-body"
              value={body}
              onChange={(e) => updateBody(e.target.value)}
              placeholder="Write MDX here. <TemporalPipeline /> is available."
              spellCheck={false}
            />
          </>
        )}
      </main>

        </Panel>

        <PanelResizeHandle className="admin-resize-handle" />

        <Panel
          ref={previewRef}
          defaultSize={40}
          minSize={20}
          collapsible
          collapsedSize={0}
          onCollapse={() => setPreviewHidden(true)}
          onExpand={() => setPreviewHidden(false)}
        >
      <aside className="admin-preview">
        {!empty && <Preview frontmatter={frontmatter} body={body} />}
      </aside>
        </Panel>
      </PanelGroup>
    </div>
  );
}
