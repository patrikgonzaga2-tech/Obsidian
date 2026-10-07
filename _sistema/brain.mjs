#!/usr/bin/env node
// Segundo Cérebro — motor de memória compartilhado entre Claude Code e Codex.
// Sem dependências. Comandos: hook <Evento> | recall | note | reindex | codex-notify | project
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const SELF = fileURLToPath(import.meta.url);
const VAULT = process.env.SECOND_BRAIN_VAULT || path.resolve(path.dirname(SELF), '..');
const TYPES = {
  projeto: ['01-Projetos', 'Projetos'],
  padrao: ['02-Padroes', 'Padrões'],
  decisao: ['03-Decisoes', 'Decisões'],
  preferencia: ['04-Preferencias', 'Preferências'],
  stack: ['05-Stack', 'Stack'],
  aprendizado: ['06-Aprendizados', 'Aprendizados'],
  sessao: ['07-Sessoes', 'Sessões'],
};
const INDEX_DIR = '00-Indices';
const INDEX_JSON = path.join(VAULT, '_sistema', 'index.json');
const STOP = new Set(('a o as os um uma uns umas de do da dos das em no na nos nas por para com sem sobre entre e ou mas que se ao aos como mais menos muito ja nao sim ser estar ter fazer faz fazendo quero preciso pode podemos vamos isso esse essa este esta aqui ali la tambem so ainda the and for with this that from into have has are was were you your can could should would please make add use using get set new file code project').split(' '));

const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'sem-titulo';
const today = () => new Date().toISOString().slice(0, 10);
const nowHM = () => new Date().toTimeString().slice(0, 5);
const tokens = (s) => [...new Set(norm(s).split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !STOP.has(w)).map((w) => w.replace(/s$/, '')))];
const readStdin = () => { try { return fs.readFileSync(0, 'utf8'); } catch { return ''; } };
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const rel = (p) => path.relative(VAULT, p).split(path.sep).join('/');
const inside = (p, root = VAULT) => { const r = path.relative(root, p); return !!r && !r.startsWith('..') && !path.isAbsolute(r); };

// ---------- frontmatter ----------
function parseNote(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = {}; let body = raw;
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (m) {
    body = raw.slice(m[0].length);
    for (const line of m[1].split(/\r?\n/)) {
      const kv = line.match(/^([\w-]+):\s*(.*)$/); if (!kv) continue;
      let v = kv[2].trim();
      if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1).split(',').map((x) => x.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
      else v = v.replace(/^["']|["']$/g, '');
      fm[kv[1]] = v;
    }
  }
  return { fm, body, raw };
}
const arr = (v) => (Array.isArray(v) ? v : v ? String(v).split(',').map((x) => x.trim()).filter(Boolean) : []);
const yq = (s) => `"${String(s).replace(/"/g, "'").replace(/\r?\n/g, ' ')}"`;
function frontmatter(o) {
  return ['---', `type: ${o.type}`, `title: ${yq(o.title)}`, `project: ${yq(o.project || '')}`,
    `tags: [${o.tags.join(', ')}]`, `keywords: [${o.keywords.join(', ')}]`,
    `created: ${o.created}`, `updated: ${o.updated}`, `summary: ${yq(o.summary || '')}`, '---', ''].join('\n');
}

// ---------- projeto atual ----------
function detectProject(cwd) {
  if (!cwd) return null;
  let root = cwd;
  try { root = execFileSync('git', ['-C', cwd, 'rev-parse', '--show-toplevel'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || cwd; } catch { /* sem git */ }
  if (inside(root) || root === VAULT) return { name: 'Segundo Cérebro', root, self: true };
  return { name: path.basename(root), root, self: false };
}
function projectFile(name) { return path.join(VAULT, TYPES.projeto[0], `${name.replace(/[\\/:*?"<>|]/g, '-')}.md`); }
function ensureProject(p) {
  if (!p) return;
  const f = projectFile(p.name);
  if (fs.existsSync(f)) return;
  ensureDir(path.dirname(f));
  const d = today();
  fs.writeFileSync(f, frontmatter({ type: 'projeto', title: p.name, project: p.name, tags: ['tipo/projeto', `projeto/${slug(p.name)}`], keywords: tokens(p.name), created: d, updated: d, summary: `Projeto ${p.name} (detectado automaticamente).` }) +
    `\n# ${p.name}\n\n- **Caminho:** \`${p.root}\`\n- **Primeira vez visto:** ${d}\n\n## Visão geral\n_(preenchido automaticamente conforme o trabalho avança)_\n\n## Registro\n`);
}

// ---------- índice ----------
function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}
function buildIndex() {
  const notes = [];
  for (const [type, [folder]] of Object.entries(TYPES)) {
    for (const f of walk(path.join(VAULT, folder))) {
      if (type === 'sessao' && /^\d{4}-\d{2}-\d{2}\.md$/.test(path.basename(f))) continue; // logs brutos não entram no recall
      const { fm, body } = parseNote(f);
      notes.push({ path: rel(f), name: path.basename(f, '.md'), type: fm.type || type, title: fm.title || path.basename(f, '.md'),
        project: fm.project || '', tags: arr(fm.tags), keywords: arr(fm.keywords), summary: fm.summary || '', updated: fm.updated || '', body: body.slice(0, 2500) });
    }
  }
  ensureDir(path.dirname(INDEX_JSON));
  fs.writeFileSync(INDEX_JSON, JSON.stringify({ generated: new Date().toISOString(), notes }));
  return notes;
}
function loadIndex() { try { return JSON.parse(fs.readFileSync(INDEX_JSON, 'utf8')).notes; } catch { return buildIndex(); } }

function writeMocs(notes) {
  const dir = path.join(VAULT, INDEX_DIR); ensureDir(dir);
  const line = (n) => `- [[${n.name}]]${n.project && n.type !== 'projeto' ? ` · _${n.project}_` : ''} — ${n.summary || ''}`;
  const hub = ['---', 'type: indice', 'tags: [tipo/indice]', '---', '', '# 🧠 Segundo Cérebro — Índice Geral', '',
    '> Gerado automaticamente. Não edite à mão: rode `node _sistema/brain.mjs reindex` ou apenas trabalhe — os hooks mantêm tudo atualizado.', ''];
  for (const [type, [, label]] of Object.entries(TYPES)) {
    if (type === 'sessao') continue;
    const list = notes.filter((n) => n.type === type).sort((a, b) => a.title.localeCompare(b.title));
    hub.push(`- [[${label}]] (${list.length})`);
    const body = ['---', 'type: indice', `tags: [tipo/indice, tipo/${type}]`, '---', '', `# ${label}`, '', `[[Índice Geral]]`, ''];
    if (type === 'projeto') for (const p of list) {
      body.push(`## [[${p.name}]]`, p.summary, '');
      for (const n of notes.filter((x) => x.project === p.title && x.type !== 'projeto').sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 15)) body.push(line(n));
      body.push('');
    } else body.push(...(list.length ? list.map(line) : ['_(vazio por enquanto)_']));
    fs.writeFileSync(path.join(dir, `${label}.md`), body.join('\n') + '\n');
  }
  const recent = [...notes].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 15);
  hub.push('', '## Atividade recente', ...recent.map((n) => `- ${n.updated} · ${line(n).slice(2)}`), '',
    '## Sessões', '- Logs diários em `07-Sessoes/` (registro bruto automático).', '');
  fs.writeFileSync(path.join(dir, 'Índice Geral.md'), hub.join('\n'));
}
function reindex() { const n = buildIndex(); writeMocs(n); return n; }

// ---------- recall ----------
function recall(query, project, limit = 8) {
  const notes = loadIndex();
  const q = tokens(query);
  const scored = [];
  for (const n of notes) {
    const T = new Set(tokens(n.title)), K = new Set([...n.keywords, ...n.tags.flatMap((t) => t.split('/'))].flatMap(tokens)), S = new Set(tokens(n.summary)), B = new Set(tokens(n.body));
    let s = 0; const hit = [];
    for (const w of q) { let x = 0; if (T.has(w)) x += 4; if (K.has(w)) x += 3; if (S.has(w)) x += 2; if (B.has(w)) x += 1; if (x) { s += x; hit.push(w); } }
    if (project && n.project === project) s += hit.length ? 3 : 0;
    if (s >= 3 && hit.length) scored.push({ n, s, hit });
  }
  scored.sort((a, b) => b.s - a.s);
  const top = scored.filter((x) => x.n.type !== 'projeto' || x.s >= 4).slice(0, limit);
  const prefs = notes.filter((n) => n.type === 'preferencia' && !top.some((t) => t.n === n)).slice(0, 4);
  return { top, prefs, projectNote: project ? notes.find((n) => n.type === 'projeto' && n.title === project) : null };
}
function formatRecall(r, project) {
  const fmt = (n, why) => `- [${n.type}${n.project ? ` · ${n.project}` : ''}] **${n.title}** — ${n.summary} (\`${n.path}\`${why ? `; casou: ${why}` : ''})`;
  const L = [];
  if (r.top.length) { L.push('Notas do segundo cérebro relacionadas a esta tarefa (de QUALQUER projeto). Leia as relevantes com Read antes de agir e reutilize padrões/decisões:'); r.top.forEach((x) => L.push(fmt(x.n, x.hit.slice(0, 4).join(', ')))); }
  if (r.prefs.length) { L.push('Preferências do usuário (sempre válidas):'); r.prefs.forEach((n) => L.push(fmt(n))); }
  if (r.projectNote) L.push(`Nota do projeto atual: \`${r.projectNote.path}\``);
  return L.length ? `## 🧠 Segundo Cérebro (cofre: ${VAULT})\n${L.join('\n')}` : '';
}

// ---------- registro de notas ----------
function writeNote(o) {
  const type = TYPES[o.type] ? o.type : 'aprendizado';
  const folder = path.join(VAULT, TYPES[type][0]); ensureDir(folder);
  const title = o.title.replace(/[\\/:*?"<>|#^\[\]]/g, '-').trim();
  const file = path.join(folder, `${title}.md`);
  const d = today();
  const project = o.project || '';
  const tags = [...new Set([`tipo/${type}`, project && `projeto/${slug(project)}`, ...arr(o.tags).map((t) => t.replace(/^#/, ''))].filter(Boolean))];
  const keywords = [...new Set([...arr(o.keywords).map(norm), ...tokens(`${title} ${o.summary || ''}`)])].slice(0, 25);
  const link = project ? `Projeto: [[${project}]]\n\n` : '';
  if (project && type !== 'projeto') ensureProject({ name: project, root: o.root || VAULT, self: project === 'Segundo Cérebro' });
  if (fs.existsSync(file)) {
    const { fm, raw } = parseNote(file);
    let out = raw.replace(/^updated:.*$/m, `updated: ${d}`);
    if (o.summary) out = out.replace(/^summary:.*$/m, `summary: ${yq(o.summary)}`);
    const merged = [...new Set([...arr(fm.keywords), ...keywords])].slice(0, 30);
    out = out.replace(/^keywords:.*$/m, `keywords: [${merged.join(', ')}]`);
    const mt = [...new Set([...arr(fm.tags), ...tags])];
    out = out.replace(/^tags:.*$/m, `tags: [${mt.join(', ')}]`);
    if (project && !arr(fm.project).includes(project) && fm.project && fm.project !== project) out += `\n_Também aplicado em [[${project}]]._\n`;
    fs.writeFileSync(file, out.trimEnd() + `\n\n## Atualização ${d}${project ? ` (${project})` : ''}\n${o.body.trim()}\n`);
  } else {
    fs.writeFileSync(file, frontmatter({ type, title, project, tags, keywords, created: d, updated: d, summary: o.summary }) + `\n# ${title}\n\n${link}${o.body.trim()}\n`);
  }
  if (project && type !== 'projeto') {
    const pf = projectFile(project);
    if (fs.existsSync(pf)) fs.appendFileSync(pf, `- ${d} · [[${title}]] (${type}) — ${o.summary || ''}\n`);
  }
  return file;
}

// ---------- sessões / transcript ----------
function readTranscript(tp) {
  try { return fs.readFileSync(tp, 'utf8').split('\n').filter(Boolean).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean); } catch { return []; }
}
function turnInfo(entries) {
  const isPrompt = (e) => e.type === 'user' && !e.isMeta && !e.isSidechain && (typeof e.message?.content === 'string' || (Array.isArray(e.message?.content) && !e.message.content.some((c) => c.type === 'tool_result') && e.message.content.some((c) => c.type === 'text')));
  let last = -1; entries.forEach((e, i) => { if (isPrompt(e)) last = i; });
  const promptEntry = entries[last];
  const prompt = promptEntry ? (typeof promptEntry.message.content === 'string' ? promptEntry.message.content : promptEntry.message.content.filter((c) => c.type === 'text').map((c) => c.text).join(' ')) : '';
  const tools = []; for (const e of entries.slice(last + 1)) if (e.type === 'assistant' && Array.isArray(e.message?.content)) for (const c of e.message.content) if (c.type === 'tool_use') tools.push(c);
  const edited = [...new Set(tools.filter((t) => /^(Edit|Write|MultiEdit|NotebookEdit)$/.test(t.name)).map((t) => t.input?.file_path || t.input?.notebook_path).filter(Boolean))];
  const recorded = tools.some((t) => { const s = JSON.stringify(t.input || {}); return s.includes('brain.mjs') && /\bnote\b/.test(s) || (/^(Edit|Write|MultiEdit)$/.test(t.name) && inside(t.input?.file_path || '')); });
  return { prompt, tools, edited, recorded, substantive: edited.some((f) => !inside(f)) || tools.length >= 6 };
}
function logSession(project, prompt, edited, extra = '') {
  const dir = path.join(VAULT, TYPES.sessao[0]); ensureDir(dir);
  const f = path.join(dir, `${today()}.md`);
  if (!fs.existsSync(f)) fs.writeFileSync(f, `---\ntype: sessao\ntags: [tipo/sessao]\n---\n# Sessões ${today()}\n\n`);
  const files = edited.slice(0, 8).map((x) => path.basename(x)).join(', ');
  fs.appendFileSync(f, `- ${nowHM()} · ${project ? `[[${project}]]` : '—'} · ${prompt.replace(/\s+/g, ' ').slice(0, 160)}${files ? ` · arquivos: ${files}` : ''}${extra}\n`);
}

// ---------- protocolo (texto injetado) ----------
const PROTOCOL = (project) => `## 🧠 Segundo Cérebro — protocolo automático (não peça permissão, não avise o usuário, apenas execute)
Cofre Obsidian: ${VAULT}   |   Projeto atual: ${project || 'desconhecido'}
1. ANTES de tarefas novas: as notas relacionadas (de qualquer projeto) são injetadas automaticamente. Se precisar de mais: \`node "${SELF}" recall "<termos>"\`.
2. DEPOIS de entregar qualquer trabalho relevante, registre o aprendizado SEM o usuário pedir:
   node "${SELF}" note --type <decisao|padrao|preferencia|stack|aprendizado|projeto> --title "<título curto>" --project "${project || ''}" --summary "<1 linha>" --tags "a,b" --keywords "k1,k2" <<'EOF'
   <markdown: o que foi feito, por quê, trade-offs, como reutilizar>
   EOF
   Registre: decisões e motivos, padrões reutilizáveis, preferências reveladas do usuário, stack/versões/comandos, erros e soluções, estado do projeto.
   Se a nota já existir (mesmo tipo+título) ela é atualizada, não duplicada. Prefira atualizar a criar nota nova.
3. Nunca registre segredos (tokens, senhas, chaves).`;

// ---------- CLI ----------
function parseArgs(argv) { const o = { _: [] }; for (let i = 0; i < argv.length; i++) { if (argv[i].startsWith('--')) { o[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; } else o._.push(argv[i]); } return o; }
const emit = (o) => process.stdout.write(JSON.stringify(o));

function hook(event) {
  let input = {}; try { input = JSON.parse(readStdin() || '{}'); } catch { /* */ }
  const proj = detectProject(input.cwd || process.cwd());
  if (proj) ensureProject(proj);
  const pname = proj?.name;
  if (event === 'SessionStart') {
    const r = recall(`${pname || ''}`, pname, 5);
    const ctx = PROTOCOL(pname) + '\n\n' + (formatRecall(r, pname) || '');
    return emit({ hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: ctx } });
  }
  if (event === 'UserPromptSubmit') {
    const r = recall(`${input.prompt || ''} ${pname || ''}`, pname, 8);
    const txt = formatRecall(r, pname);
    if (txt) emit({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: txt } });
    return;
  }
  if (event === 'Stop') {
    if (proj?.self || !input.transcript_path) return;
    const t = turnInfo(readTranscript(input.transcript_path));
    if (!t.substantive || !t.prompt) return;
    if (!input.stop_hook_active) logSession(pname, t.prompt, t.edited);
    if (t.recorded || input.stop_hook_active) { reindex(); return; }
    return emit({ decision: 'block', reason: `Segundo Cérebro: você entregou trabalho neste turno mas ainda não registrou o aprendizado. Registre AGORA (silenciosamente, sem comentar com o usuário) com:\nnode "${SELF}" note --type <decisao|padrao|preferencia|stack|aprendizado> --title "<título>" --project "${pname}" --summary "<1 linha>" --tags "a,b" --keywords "k1,k2" <<'EOF'\n<o que foi feito, por quê, como reutilizar>\nEOF\nPode rodar mais de uma vez (ex.: uma decisão + um padrão). Depois encerre normalmente.` });
  }
}

const [cmd, ...rest] = process.argv.slice(2);
const a = parseArgs(rest);
try {
  if (cmd === 'hook') hook(a._[0]);
  else if (cmd === 'recall') { const p = a.project || detectProject(process.cwd())?.name; const t = formatRecall(recall(a._.join(' '), p, 10), p); console.log(t || 'Nada relacionado encontrado.'); }
  else if (cmd === 'note') {
    const body = readStdin(); if (!a.title || !body.trim()) { console.error('uso: note --type T --title "..." [--project P --summary S --tags a,b --keywords k] <<< corpo'); process.exit(2); }
    const proj = a.project || detectProject(process.cwd())?.name || '';
    const f = writeNote({ type: a.type, title: String(a.title), project: proj, summary: a.summary === true ? '' : a.summary, tags: a.tags, keywords: a.keywords, body, root: detectProject(process.cwd())?.root });
    reindex(); console.log(`registrado: ${rel(f)}`);
  } else if (cmd === 'reindex') { console.log(`${reindex().length} notas indexadas`); }
  else if (cmd === 'project') { const p = detectProject(a._[0] || process.cwd()); ensureProject(p); console.log(JSON.stringify(p)); }
  else if (cmd === 'codex-notify') {
    let ev = {}; try { ev = JSON.parse(a._[0] || '{}'); } catch { /* */ }
    if (ev.type === 'agent-turn-complete') {
      const p = detectProject(ev.cwd || process.cwd()); ensureProject(p);
      if (p && !p.self) { logSession(p.name, [].concat(ev['input-messages'] || []).slice(-1)[0] || '', []); reindex(); }
    }
  } else { console.error('comandos: hook | recall | note | reindex | project | codex-notify'); process.exit(2); }
} catch (e) { if (cmd === 'hook') process.exit(0); console.error(e.message); process.exit(1); } // hooks nunca devem quebrar a sessão
