#!/usr/bin/env node
// Instala a integração do Segundo Cérebro no Claude Code e no Codex (idempotente).
// uso: node _sistema/install.mjs [--home <dir>] [--uninstall]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const homeIdx = args.indexOf('--home');
const HOME = homeIdx >= 0 ? args[homeIdx + 1] : os.homedir();
const UNINSTALL = args.includes('--uninstall');
const BRAIN = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'brain.mjs').split(path.sep).join('/');
const VAULT = path.dirname(path.dirname(BRAIN));
const MARK = 'second-brain-managed';
const START = '<!-- second-brain:start -->', END = '<!-- second-brain:end -->';

const readJson = (f) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return {}; } };
const write = (f, s) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };
const read = (f) => { try { return fs.readFileSync(f, 'utf8'); } catch { return ''; } };

const INSTRUCTIONS = `${START}
# 🧠 Segundo Cérebro (automático — vale para TODOS os projetos)
Cofre Obsidian: ${VAULT}
Motor: \`node "${BRAIN}"\`

Regras permanentes (execute sem o usuário pedir e sem pedir permissão):
1. **Antes** de qualquer tarefa nova: rode \`node "${BRAIN}" recall "<resumo da tarefa>"\` e leia (Read) as notas relevantes — padrões, decisões, preferências e stack de QUALQUER projeto. (No Claude Code isso já chega injetado por hook; no Codex faça manualmente.)
2. **Depois** de entregar qualquer trabalho, registre o aprendizado (sem heredoc, funciona em PowerShell/cmd/bash):
   \`node "${BRAIN}" note --type <decisao|padrao|preferencia|stack|aprendizado> --title "<título>" --project "<projeto>" --summary "<1 linha>" --tags "a,b" --keywords "k1,k2" --body "<markdown: o que, por quê, trade-offs, como reutilizar>"\`
   Texto longo: \`--body-file "<arquivo>"\`. Crie notas SEPARADAS por tipo (decisao, padrao, stack, preferencia, aprendizado); use \`--type projeto\` SOMENTE para a visão geral do projeto, nunca para decisões/padrões.
   Atualize notas existentes (mesmo título) em vez de duplicar. Nunca grave segredos.
3. Preferências reveladas pelo usuário (estilo, ferramentas, idioma, forma de trabalhar) viram nota \`--type preferencia\`.
${END}
`;

function upsertBlock(file) {
  let s = read(file);
  const re = new RegExp(`${START}[\\s\\S]*?${END}\\n?`);
  s = s.replace(re, '');
  if (!UNINSTALL) s = (s.trimEnd() ? s.trimEnd() + '\n\n' : '') + INSTRUCTIONS;
  write(file, s);
}

// ---- Claude Code ----
const cs = path.join(HOME, '.claude', 'settings.json');
const settings = readJson(cs);
settings.hooks ||= {};
const cmd = (ev) => `node "${BRAIN}" hook ${ev} # ${MARK}`;
for (const ev of ['SessionStart', 'UserPromptSubmit', 'Stop']) {
  settings.hooks[ev] = (settings.hooks[ev] || []).filter((g) => !(g.hooks || []).some((h) => String(h.command).includes(MARK)));
  if (!UNINSTALL) settings.hooks[ev].push({ hooks: [{ type: 'command', command: cmd(ev), timeout: 30 }] });
  if (!settings.hooks[ev].length) delete settings.hooks[ev];
}
const allow = `Bash(node ${BRAIN}:*)`, allowQ = `Bash(node "${BRAIN}":*)`;
settings.permissions ||= {}; settings.permissions.allow = (settings.permissions.allow || []).filter((x) => x !== allow && x !== allowQ);
if (!UNINSTALL) settings.permissions.allow.push(allow, allowQ);
if (!settings.permissions.allow.length) delete settings.permissions.allow;
write(cs, JSON.stringify(settings, null, 2) + '\n');
upsertBlock(path.join(HOME, '.claude', 'CLAUDE.md'));

// ---- Codex ----
upsertBlock(path.join(HOME, '.codex', 'AGENTS.md'));
const ct = path.join(HOME, '.codex', 'config.toml');
let toml = read(ct);
const line = `notify = ["node", "${BRAIN}", "codex-notify"] # ${MARK}`;
toml = toml.split('\n').filter((l) => !l.includes(MARK)).join('\n');
if (!UNINSTALL) {
  if (/^notify\s*=/m.test(toml)) console.warn('⚠ Codex já tem um "notify" próprio em config.toml; mantive o seu (o registro automático via Codex depende de AGENTS.md).');
  else toml = line + '\n' + toml;
}
write(ct, toml);

console.log(`${UNINSTALL ? 'Removido de' : 'Instalado em'}: ${cs}, ~/.claude/CLAUDE.md, ~/.codex/AGENTS.md, ~/.codex/config.toml`);
if (!UNINSTALL) { console.log(`Cofre: ${VAULT}`); console.log('Abra um novo terminal/sessão do Claude Code ou Codex para ativar.'); }
