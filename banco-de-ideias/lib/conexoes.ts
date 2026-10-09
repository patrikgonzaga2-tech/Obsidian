// Estado das fontes de dados e importação de ideias a partir delas. SOMENTE servidor.
import 'server-only'
import fs from 'node:fs/promises'
import path from 'node:path'
import type { Conexao, ConexaoId, ConexaoStatus, Ideia, Pendencia } from './tipos'
import { faseDoProgresso, novoId } from './tipos'
import { criarIdeia, listarIdeias, registrarConexao, supabaseConfigurado, testarSupabase } from './store'
import { iaConfigurada } from './ia'

const agora = () => new Date().toISOString()
const p = (texto: string, resolvida: boolean, ajuda?: string): Pendencia => ({ texto, resolvida, ajuda })

function statusDe(pendencias: Pendencia[], essencial: boolean): ConexaoStatus {
  if (!essencial) return 'desconectado'
  return pendencias.every((x) => x.resolvida) ? 'conectado' : 'pendente'
}

export function pastaLocal() {
  return process.env.IDEIAS_PASTA_LOCAL || path.resolve(process.cwd(), '..')
}
export function transcricaoServidor() {
  return Boolean(process.env.WHISPER_URL)
}

// ---------- verificações ----------
async function verificarSupabase(): Promise<Conexao> {
  const temEnv = supabaseConfigurado()
  const teste = temEnv ? await testarSupabase() : { ok: false as const }
  const pend = [
    p('Definir SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env.local (ou nas variáveis da Vercel)', temEnv,
      'SUPABASE_URL=https://SEU-PROJETO.supabase.co\nSUPABASE_SERVICE_ROLE_KEY=eyJ... (Project Settings → API → service_role)'),
    p('Criar as tabelas hub_ideias, hub_conexoes e hub_historico', teste.ok,
      'Abra o SQL Editor do Supabase e rode o arquivo supabase/schema.sql deste projeto.'),
  ]
  return {
    id: 'supabase',
    nome: 'Supabase',
    descricao: 'Banco das ideias, conexões e histórico de conversas.',
    status: statusDe(pend, temEnv),
    detalhe: teste.ok ? 'Tabelas ok — ideias salvas na nuvem' : temEnv ? 'Falta criar as tabelas' : 'Usando arquivo local (.data)',
    pendencias: pend,
    pode_sincronizar: false,
    verificado_em: agora(),
  }
}

async function verificarGithub(): Promise<Conexao> {
  const token = process.env.GITHUB_TOKEN
  let login = ''
  let erro = ''
  if (token) {
    try {
      const r = await fetch('https://api.github.com/user', { headers: ghHeaders(), cache: 'no-store' })
      if (r.ok) login = ((await r.json()) as { login: string }).login
      else erro = `GitHub respondeu ${r.status}`
    } catch (e) {
      erro = String(e)
    }
  }
  const pend = [
    p('Criar um token do GitHub com leitura de repositórios e issues', Boolean(token),
      'github.com/settings/tokens → Fine-grained token → Repository access: os repositórios das ideias → Contents: Read, Issues: Read, Metadata: Read'),
    p('Colocar GITHUB_TOKEN no .env.local / Vercel', Boolean(token), 'GITHUB_TOKEN=github_pat_...'),
    p('Token válido (testar acesso à API)', Boolean(login), erro || undefined),
  ]
  return {
    id: 'github',
    nome: 'GitHub',
    descricao: 'Importa repositórios como ideias (descrição, issues abertas como tarefas, site publicado como "No ar").',
    status: statusDe(pend, Boolean(token)),
    detalhe: login ? `Conectado como @${login}` : token ? 'Token inválido' : 'Sem token',
    pendencias: pend,
    pode_sincronizar: Boolean(login),
    verificado_em: agora(),
  }
}

async function verificarDesktop(): Promise<Conexao> {
  const pasta = pastaLocal()
  let notas = 0
  let existe = false
  try {
    notas = (await listarNotas(pasta)).length
    existe = true
  } catch {
    /* pasta não existe aqui (ex.: rodando na Vercel) */
  }
  const pend = [
    p('Rodar o painel no seu computador (npm run dev) para ler arquivos locais', existe,
      'Na Vercel não há acesso ao seu disco. Rode localmente: cd banco-de-ideias && npm install && npm run dev'),
    p('Apontar IDEIAS_PASTA_LOCAL para a pasta com as notas (.md)', existe,
      `IDEIAS_PASTA_LOCAL=/caminho/do/cofre-obsidian  (padrão: ${pasta})\nO painel lê 01-Projetos/*.md ou, se não existir, os .md da raiz.`),
    p('Ter pelo menos uma nota de projeto na pasta', notas > 0),
  ]
  return {
    id: 'desktop',
    nome: 'Desktop',
    descricao: 'Lê suas notas locais (cofre Obsidian) e transforma projetos em ideias.',
    status: statusDe(pend, existe),
    detalhe: existe ? `${notas} nota(s) de projeto encontradas` : 'Pasta local não encontrada',
    pendencias: pend,
    pode_sincronizar: notas > 0,
    verificado_em: agora(),
  }
}

async function verificarChats(): Promise<Conexao> {
  const ia = iaConfigurada()
  const whisper = transcricaoServidor()
  const pend = [
    p('Definir ANTHROPIC_API_KEY (conversa, busca semântica e organização das ideias)', ia,
      'console.anthropic.com → API Keys → crie uma chave\nANTHROPIC_API_KEY=sk-ant-...'),
    p('Transcrição Whisper no servidor (opcional — sem isso usa o reconhecimento de voz do navegador)', whisper,
      'WHISPER_URL=https://api.openai.com/v1/audio/transcriptions\nWHISPER_API_KEY=sk-...\n— ou um servidor local compatível (faster-whisper-server).'),
    p('Rodar supabase/schema.sql para guardar o histórico das conversas na nuvem', supabaseConfigurado()),
  ]
  return {
    id: 'chats',
    nome: 'Chats no cloud',
    descricao: 'Conversa com a IA com o contexto da ideia e guarda o histórico para retomar depois.',
    status: statusDe(pend, ia),
    detalhe: ia ? (whisper ? 'IA e transcrição prontas' : 'IA pronta · voz pelo navegador') : 'Sem chave — use "Abrir no Claude"',
    pendencias: pend,
    pode_sincronizar: false,
    verificado_em: agora(),
  }
}

const VERIFICADORES: Record<ConexaoId, () => Promise<Conexao>> = {
  supabase: verificarSupabase,
  github: verificarGithub,
  desktop: verificarDesktop,
  chats: verificarChats,
}

export async function verificarConexoes(): Promise<Conexao[]> {
  return Promise.all((Object.keys(VERIFICADORES) as ConexaoId[]).map((id) => verificar(id)))
}

export async function verificar(id: ConexaoId): Promise<Conexao> {
  const c = await VERIFICADORES[id]()
  await registrarConexao(c.id, c.status, c.detalhe)
  return c
}

// ---------- importação ----------
function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

interface Repo {
  full_name: string
  name: string
  description: string | null
  homepage: string | null
  archived: boolean
  fork: boolean
  pushed_at: string
  language: string | null
  open_issues_count: number
}

const titulo = (s: string) =>
  s
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase())

async function importarGithub(existentes: Ideia[]): Promise<string[]> {
  const log: string[] = []
  const r = await fetch('https://api.github.com/user/repos?per_page=50&sort=pushed&affiliation=owner,collaborator', {
    headers: ghHeaders(),
    cache: 'no-store',
  })
  if (!r.ok) throw new Error(`GitHub respondeu ${r.status}`)
  const repos = ((await r.json()) as Repo[]).filter((x) => !x.fork)
  const ja = new Set(existentes.map((i) => i.repo).filter(Boolean))
  const novos = repos.filter((x) => !ja.has(x.full_name))
  log.push(`${repos.length} repositórios encontrados, ${novos.length} ainda não estão no banco.`)
  for (const repo of novos.slice(0, 15)) {
    let tarefas: Ideia['tarefas'] = []
    if (repo.open_issues_count > 0) {
      const ri = await fetch(`https://api.github.com/repos/${repo.full_name}/issues?state=open&per_page=8`, {
        headers: ghHeaders(),
        cache: 'no-store',
      })
      if (ri.ok) {
        const issues = (await ri.json()) as { title: string; pull_request?: unknown }[]
        tarefas = issues.filter((x) => !x.pull_request).map((x) => ({ id: novoId(), texto: x.title, feito: false }))
      }
    }
    const noAr = Boolean(repo.homepage)
    const parado = Date.now() - new Date(repo.pushed_at).getTime() > 1000 * 60 * 60 * 24 * 60
    const status = repo.archived ? 'pausado' : noAr ? 'no_ar' : parado ? 'pausado' : 'em_andamento'
    const progresso = noAr ? 100 : 40
    const ideia: Ideia = {
      id: novoId('gh-'),
      titulo: titulo(repo.name),
      categoria: 'Código',
      status,
      fase: faseDoProgresso(progresso),
      progresso,
      prioridade: 'media',
      resumo: repo.description || `Repositório ${repo.full_name}${repo.language ? ` (${repo.language})` : ''}.`,
      resumo_detalhado: `Importado do GitHub. Último push em ${new Date(repo.pushed_at).toLocaleDateString('pt-BR')}.${
        tarefas.length ? ` ${tarefas.length} issue(s) aberta(s) viraram tarefas.` : ''
      }`,
      tarefas,
      url_produto: repo.homepage || null,
      repo: repo.full_name,
      origem: 'github',
      origem_ref: repo.full_name,
      criado_em: agora(),
      atualizado_em: repo.pushed_at,
    }
    await criarIdeia(ideia)
    log.push(`+ ${ideia.titulo} (${repo.full_name})`)
  }
  if (novos.length > 15) log.push(`… mais ${novos.length - 15} ficam para a próxima sincronização.`)
  return log
}

async function listarNotas(pasta: string): Promise<string[]> {
  const projetos = path.join(pasta, '01-Projetos')
  const base = await fs
    .stat(projetos)
    .then((s) => (s.isDirectory() ? projetos : pasta))
    .catch(() => pasta)
  const arquivos = await fs.readdir(base)
  return arquivos.filter((f) => f.endsWith('.md') && !f.startsWith('_')).map((f) => path.join(base, f))
}

function frontmatter(raw: string) {
  const fm: Record<string, string> = {}
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (m) {
    for (const linha of m[1].split(/\r?\n/)) {
      const kv = linha.match(/^([\w-]+):\s*(.*)$/)
      if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
    }
  }
  return { fm, corpo: m ? raw.slice(m[0].length) : raw }
}

async function importarDesktop(existentes: Ideia[]): Promise<string[]> {
  const log: string[] = []
  const notas = await listarNotas(pastaLocal())
  const ja = new Set(existentes.filter((i) => i.origem === 'desktop').map((i) => i.origem_ref))
  const titulos = new Set(existentes.map((i) => i.titulo.toLowerCase()))
  let novas = 0
  for (const arq of notas) {
    const ref = path.basename(arq)
    if (ja.has(ref)) continue
    const { fm, corpo } = frontmatter(await fs.readFile(arq, 'utf8'))
    const nome = fm.title || path.basename(arq, '.md')
    if (titulos.has(nome.toLowerCase())) continue
    // tarefas: checkboxes "- [ ]" / "- [x]" da nota
    const tarefas = [...corpo.matchAll(/^\s*[-*] \[( |x|X)\] (.+)$/gm)].map((m) => ({
      id: novoId(),
      texto: m[2].trim(),
      feito: m[1].toLowerCase() === 'x',
    }))
    const feitas = tarefas.filter((t) => t.feito).length
    const progresso = tarefas.length ? Math.round((feitas / tarefas.length) * 100) : 10
    const texto = corpo.replace(/^#.*$/gm, '').replace(/\s+/g, ' ').trim()
    await criarIdeia({
      id: novoId('dk-'),
      titulo: nome,
      categoria: 'Outro',
      status: 'em_andamento',
      fase: faseDoProgresso(progresso),
      progresso,
      prioridade: 'media',
      resumo: fm.summary || texto.slice(0, 160) || 'Importado das notas locais.',
      resumo_detalhado: texto.slice(0, 1200),
      tarefas,
      url_produto: null,
      repo: null,
      origem: 'desktop',
      origem_ref: ref,
      criado_em: agora(),
      atualizado_em: agora(),
    })
    novas++
    log.push(`+ ${nome}`)
  }
  log.unshift(`${notas.length} nota(s) lidas, ${novas} nova(s) ideia(s).`)
  return log
}

/** "Iniciar conexão": verifica e, se a fonte permitir, importa ideias. */
export async function iniciarConexao(id: ConexaoId): Promise<{ conexao: Conexao; log: string[] }> {
  const conexao = await verificar(id)
  const log: string[] = []
  conexao.pendencias.forEach((x, n) => log.push(`${x.resolvida ? '✓' : '✗'} ${n + 1}. ${x.texto}`))
  if (conexao.pode_sincronizar) {
    const existentes = await listarIdeias()
    try {
      if (id === 'github') log.push(...(await importarGithub(existentes)))
      if (id === 'desktop') log.push(...(await importarDesktop(existentes)))
    } catch (e) {
      log.push(`Erro ao importar: ${String(e)}`)
    }
  } else if (conexao.status !== 'conectado') {
    log.push('Resolva as pendências marcadas com ✗ e clique de novo em "Iniciar conexão".')
  } else {
    log.push('Tudo certo com esta conexão.')
  }
  return { conexao, log }
}
