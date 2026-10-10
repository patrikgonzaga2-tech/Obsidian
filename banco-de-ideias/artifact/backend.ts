// Backend da versão que roda dentro do Claude (artifact).
// Atende as mesmas rotas /api/* do app Next.js, mas:
// - ideias e histórico ficam no banco do próprio artifact (capability `db`);
// - busca, organização e conversa usam o Claude da conta de quem abre (capability `sample`),
//   sem chave de API.
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Conexao, ConexaoId, Ideia, Mensagem, Perfil, RespostaBusca } from '@/lib/tipos'
import { normalizarPerfil } from '@/lib/perfil'
import { novoId } from '@/lib/tipos'
import { aplicarRegras, normalizarIdeia } from '@/lib/regras'
import { buscarLocal } from '@/lib/busca-local'
import { CATEGORIAS, organizarLocal, type IdeiaOrganizada } from '@/lib/organizar-local'
import { systemDaConversa } from '@/lib/contexto'
import type { Config } from '@/components/Hub'

type Sample = ((input: unknown, opts?: Record<string, unknown>) => Promise<{ text: string; truncated: boolean }>) & {
  json: <T>(input: unknown, opts?: Record<string, unknown>) => Promise<T>
}
interface Db {
  doc(path: string): any
  collection(path: string): any
}

let db: Db | null = null
let sample: Sample | null = null
let iaPermitida = true // vira false se a pessoa recusar o uso do Claude
const ideias = new Map<string, Ideia>()
const ouvintes = new Set<(l: Ideia[]) => void>()
const memoriaHistorico = new Map<string, Mensagem[]>() // quando não há db

const lista = () => [...ideias.values()].sort((a, b) => b.atualizado_em.localeCompare(a.atualizado_em))
const avisarOuvintes = () => ouvintes.forEach((f) => f(lista()))
const resposta = (dados: unknown, status = 200) =>
  new Response(dados === null ? null : JSON.stringify(dados), { status, headers: { 'Content-Type': 'application/json' } })

const MSG_ERRO: Record<string, string> = {
  not_granted: 'O uso do Claude não foi permitido neste painel. Recarregue e clique em Permitir para conversar aqui.',
  sampling_disabled: 'O Claude não está disponível para esta conta.',
  rate_limited: 'Limite de uso atingido. Tente de novo daqui a pouco.',
  refused: 'O Claude não respondeu a este pedido. Tente escrever de outro jeito.',
  session_expired: 'Sua sessão expirou. Entre de novo no Claude.',
}
function erroAmigavel(e: any) {
  if (e?.code === 'not_granted' || e?.code === 'sampling_disabled') iaPermitida = false
  return MSG_ERRO[e?.code] ?? 'Falha ao falar com o Claude. Tente de novo.'
}
const iaDisponivel = () => Boolean(sample) && iaPermitida

// ---------- inicialização ----------
export async function iniciarBackend(): Promise<{
  ideias: Ideia[]
  conexoes: Conexao[]
  config: Config
  perfil: Perfil | null
  erro: string
  assinar: (f: (l: Ideia[]) => void) => () => void
}> {
  const claude = (window as any).claude
  const [d, s] = await Promise.all([
    claude?.use?.('db').catch(() => null) ?? null,
    claude?.use?.('sample').catch(() => null) ?? null,
  ])
  db = d
  sample = s
  let erro = ''
  if (db) {
    // uma assinatura só, mantida enquanto a página estiver aberta
    await new Promise<void>((pronto) => {
      let primeira = true
      db!.collection('ideias').onSnapshot(
        (snap: any) => {
          ideias.clear()
          for (const doc of snap.docs) if (doc.exists) ideias.set(doc.id, normalizar({ ...doc.data(), id: doc.id }))
          avisarOuvintes()
          if (primeira) {
            primeira = false
            pronto()
          }
        },
        (e: any) => {
          erro = `Não consegui ler o banco de ideias (${e?.code ?? 'erro'}).`
          pronto()
        }
      )
    })
  } else {
    erro = 'Banco indisponível nesta visualização: as mudanças não serão salvas.'
  }
  let perfil: Perfil | null = null
  if (db) {
    try {
      const snap = await db.doc('perfil/atual').get()
      if (snap.exists) perfil = normalizarPerfil(snap.data())
    } catch {
      /* sem perfil ainda */
    }
  }
  instalarFetch()
  return {
    perfil,
    ideias: lista(),
    conexoes: conexoes(),
    config: { ia: Boolean(sample), transcricaoServidor: false, microfone: false, buscaIAAutomatica: false },
    erro,
    assinar: (f) => {
      ouvintes.add(f)
      return () => ouvintes.delete(f)
    },
  }
}

const normalizar = (d: any): Ideia => normalizarIdeia({ ...d, id: d?.id })

// ---------- roteador /api/* ----------
function instalarFetch() {
  const original = window.fetch.bind(window)
  window.fetch = async (entrada: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof entrada === 'string' ? entrada : entrada instanceof URL ? entrada.href : entrada.url
    const caminho = url.startsWith('/api/') ? url : null
    if (!caminho) return original(entrada, init)
    const metodo = (init?.method || 'GET').toUpperCase()
    let corpo: any = null
    if (typeof init?.body === 'string') {
      try {
        corpo = JSON.parse(init.body)
      } catch {}
    }
    try {
      return await rotear(metodo, caminho.split('?')[0], corpo)
    } catch (e) {
      return resposta({ erro: String((e as any)?.message ?? e) }, 500)
    }
  }
}

async function rotear(metodo: string, caminho: string, corpo: any): Promise<Response> {
  const p = caminho.split('/').filter(Boolean) // ['api', ...]
  const [, rota, id, sub] = p
  if (rota === 'ideias' && !id && metodo === 'GET') return resposta(lista())
  if (rota === 'ideias' && !id && metodo === 'POST') return resposta(await criar(corpo), 201)
  if (rota === 'ideias' && id && sub === 'historico') return resposta(await historico(id))
  if (rota === 'ideias' && id && metodo === 'PATCH') {
    const nova = await atualizar(id, corpo)
    return nova ? resposta(nova) : resposta({ erro: 'Ideia não encontrada' }, 404)
  }
  if (rota === 'ideias' && id && metodo === 'DELETE') return excluir(id)
  if (rota === 'busca') return resposta(await buscar(String(corpo?.q ?? '')))
  if (rota === 'organizar') return organizar(String(corpo?.transcricao ?? ''))
  if (rota === 'chat') return conversar(String(corpo?.ideiaId ?? ''), String(corpo?.mensagem ?? ''))
  if (rota === 'transcrever') return resposta({ erro: 'Sem transcrição de áudio no Claude.', usarNavegador: true }, 501)
  if (rota === 'conexoes' && !id) return resposta(conexoes())
  if (rota === 'conexoes' && id && metodo === 'POST') return resposta(await iniciarConexao(id as ConexaoId))
  if (rota === 'perfil' && metodo === 'GET') {
    const snap = db ? await db.doc('perfil/atual').get() : null
    return resposta(snap?.exists ? normalizarPerfil(snap.data()) : null)
  }
  if (rota === 'perfil' && metodo === 'PUT') {
    const p = normalizarPerfil(corpo)
    if (!p) return resposta({ erro: 'Perfil inválido' }, 400)
    p.atualizado_em = new Date().toISOString()
    if (db) await db.doc('perfil/atual').set(JSON.parse(JSON.stringify(p)))
    return resposta(p)
  }
  if (rota === 'config') return resposta({ ia: Boolean(sample), transcricaoServidor: false })
  return resposta({ erro: 'Rota desconhecida' }, 404)
}

// ---------- ideias ----------
async function gravar(i: Ideia) {
  if (db) await db.collection('ideias').doc(i.id).set(JSON.parse(JSON.stringify(i)))
  ideias.set(i.id, i) // só depois de salvo no banco
}

async function criar(b: any): Promise<Ideia> {
  const agora = new Date().toISOString()
  const v = aplicarRegras({ status: 'em_andamento', prioridade: 'media', ...b })
  const progresso = v.progresso ?? 0
  const i: Ideia = {
    id: novoId('id-'),
    titulo: v.titulo || 'Nova ideia',
    categoria: v.categoria || 'Outro',
    status: v.status ?? 'em_andamento',
    fase: v.fase ?? (b?.fase as Ideia['fase']) ?? 'inicio',
    progresso,
    prioridade: v.prioridade ?? 'media',
    resumo: v.resumo ?? '',
    resumo_detalhado: v.resumo_detalhado ?? '',
    tarefas: v.tarefas ?? [],
    url_produto: v.url_produto ?? null,
    repo: v.repo ?? null,
    origem: ['manual', 'audio', 'github', 'desktop', 'chat'].includes(b?.origem) ? b.origem : 'manual',
    origem_ref: typeof b?.origem_ref === 'string' ? b.origem_ref : null,
    como_usar: v.como_usar ?? '',
    comandos: v.comandos ?? [],
    links: v.links ?? [],
    criado_em: agora,
    atualizado_em: agora,
  }
  await gravar(i)
  avisarOuvintes()
  return i
}

async function atualizar(id: string, b: unknown) {
  const atual = ideias.get(id)
  if (!atual) return null
  const patch = { ...aplicarRegras(b), atualizado_em: new Date().toISOString() }
  if (db) await db.collection('ideias').doc(id).update(JSON.parse(JSON.stringify(patch)))
  const nova = { ...(ideias.get(id) ?? atual), ...patch } // só depois de salvo no banco
  ideias.set(id, nova)
  return nova
}

async function excluir(id: string) {
  ideias.delete(id)
  memoriaHistorico.delete(id)
  if (db) {
    await db.collection('ideias').doc(id).delete()
    await db.collection('historico').doc(id).delete()
  }
  avisarOuvintes()
  return new Response(null, { status: 204 })
}

// ---------- histórico (um documento por ideia, últimas 60 mensagens) ----------
async function historico(id: string): Promise<Mensagem[]> {
  if (!db) return memoriaHistorico.get(id) ?? []
  const snap = await db.collection('historico').doc(id).get()
  return snap.exists ? ((snap.data()?.mensagens as Mensagem[]) ?? []) : []
}
async function anexarHistorico(id: string, novas: Mensagem[]) {
  const todas = [...(await historico(id)), ...novas].slice(-60)
  if (db) await db.collection('historico').doc(id).set({ mensagens: todas })
  else memoriaHistorico.set(id, todas)
}

// ---------- busca ----------
async function buscar(q: string): Promise<RespostaBusca> {
  const visiveis = lista().filter((i) => i.status !== 'arquivado')
  const local = buscarLocal(q, visiveis)
  if (!q.trim() || !iaDisponivel()) return local
  const catalogo = visiveis.map((i) => ({
    id: i.id,
    titulo: i.titulo,
    categoria: i.categoria,
    status: i.status,
    fase: i.fase,
    progresso: i.progresso,
    prioridade: i.prioridade,
    resumo: i.resumo,
    proximas_tarefas: i.tarefas.filter((t) => !t.feito).slice(0, 4).map((t) => t.texto),
  }))
  try {
    const r = await sample!.json<{ intencao?: unknown; resultados?: unknown }>(
      'Você é o buscador do "Banco de Ideias". Recebe um pedido em português e o catálogo de ideias (JSON).\n' +
        'Entenda a intenção (ex.: "quero terminar hoje" = priorizar ideias em andamento mais perto do fim; "usar" = ideias no ar) ' +
        'e o assunto (ex.: "edição de vídeo" casa com vídeo, montagem, criativos).\n' +
        'Responda só com JSON: {"intencao": "frase curta", "resultados": [{"id": "id exato do catálogo", "motivo": "1 frase, cite o próximo passo quando ajudar"}]}. ' +
        'Inclua só ideias que combinam, da mais para a menos relevante; lista vazia se nada combinar.\n\n' +
        `Pedido: ${q}\n\nCatálogo:\n${JSON.stringify(catalogo)}`,
      { modelTier: 'quick' }
    )
    const validos = new Set(visiveis.map((i) => i.id))
    const resultados = (Array.isArray(r?.resultados) ? r.resultados : [])
      .map((x: any) => ({ id: String(x?.id ?? ''), motivo: String(x?.motivo ?? '') }))
      .filter((x) => validos.has(x.id))
    return { modo: 'ia', intencao: String(r?.intencao ?? ''), resultados }
  } catch (e) {
    erroAmigavel(e)
    return local
  }
}

// ---------- organizar ideia ditada ----------
async function organizar(transcricao: string) {
  const texto = transcricao.trim()
  if (texto.length < 5) return resposta({ erro: 'Não entendi a ideia — escreva ou dite de novo.' }, 400)
  let org: IdeiaOrganizada = organizarLocal(texto)
  let modo: 'ia' | 'local' = 'local'
  if (iaDisponivel()) {
    try {
      const r = await sample!.json<any>(
        'Organize esta ideia (ditada, com vícios de fala) em um card de projeto. Português do Brasil, simples e direto.\n' +
          `Categoria: uma de ${JSON.stringify(CATEGORIAS)}. Prioridade "alta" só com urgência ou dinheiro em jogo; "baixa" se for para o futuro; senão "media".\n` +
          'Responda só com JSON: {"titulo": "até 6 palavras", "categoria": "...", "resumo": "ponto atual em 1-2 frases", ' +
          '"resumo_detalhado": "um parágrafo: o que é, para quem, por quê", "prioridade": "alta|media|baixa", ' +
          '"tarefas": ["4 a 7 passos concretos, na ordem, começando por verbo"]}\n\n' +
          `Ideia:\n"""${texto}"""`,
        { modelTier: 'quick', cache: false }
      )
      if (r && typeof r.titulo === 'string' && Array.isArray(r.tarefas) && r.tarefas.length) {
        org = {
          titulo: r.titulo,
          categoria: (CATEGORIAS as readonly string[]).includes(r.categoria) ? r.categoria : org.categoria,
          resumo: String(r.resumo || org.resumo),
          resumo_detalhado: `${String(r.resumo_detalhado || '')}\n\nO que você disse: "${texto}"`.trim(),
          prioridade: ['alta', 'media', 'baixa'].includes(r.prioridade) ? r.prioridade : org.prioridade,
          tarefas: r.tarefas.map(String).filter(Boolean).slice(0, 8),
        }
        modo = 'ia'
      }
    } catch (e) {
      erroAmigavel(e)
    }
  }
  const ideia = await criar({
    titulo: org.titulo,
    categoria: org.categoria,
    status: 'em_andamento',
    fase: 'inicio',
    progresso: 0,
    prioridade: org.prioridade,
    resumo: org.resumo,
    resumo_detalhado: org.resumo_detalhado,
    tarefas: org.tarefas as any,
    origem: 'audio',
  })
  return resposta({ ideia, modo }, 201)
}

// ---------- conversa (stream) ----------
async function conversar(ideiaId: string, mensagem: string) {
  const ideia = ideias.get(ideiaId)
  if (!ideia || !mensagem.trim()) return resposta({ erro: 'Ideia não encontrada' }, 404)
  if (!iaDisponivel()) return resposta({ erro: MSG_ERRO.not_granted, semIA: true }, 503)
  const anteriores = await historico(ideiaId)
  const turnos = [
    { role: 'user', content: systemDaConversa(ideia, anteriores) },
    ...anteriores.slice(-20).map((m) => ({ role: m.papel, content: m.conteudo })),
    { role: 'user', content: mensagem.trim() },
  ]
  const enc = new TextEncoder()
  const corpo = new ReadableStream<Uint8Array>({
    async start(ctl) {
      let texto = ''
      try {
        const r = await sample!(turnos, {
          cache: false,
          onText: ({ delta }: { delta: string }) => {
            texto += delta
            ctl.enqueue(enc.encode(delta))
          },
        })
        texto = r.text
        const agora = new Date().toISOString()
        await anexarHistorico(ideiaId, [
          { id: novoId(), ideia_id: ideiaId, papel: 'user', conteudo: mensagem.trim(), criado_em: agora },
          { id: novoId(), ideia_id: ideiaId, papel: 'assistant', conteudo: texto, criado_em: agora },
        ])
      } catch (e) {
        ctl.enqueue(enc.encode(`${texto ? '\n\n' : ''}⚠️ ${erroAmigavel(e)}`))
      } finally {
        ctl.close()
      }
    },
  })
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

// ---------- conexões (o que vale dentro do Claude) ----------
function conexoes(): Conexao[] {
  const agora = new Date().toISOString()
  const temDb = Boolean(db)
  const temIa = iaDisponivel()
  return [
    {
      id: 'supabase',
      nome: 'Supabase',
      descricao: 'Nesta versão as ideias ficam guardadas no banco do próprio painel, dentro do Claude.',
      status: temDb ? 'pendente' : 'desconectado',
      detalhe: temDb ? 'Ideias salvas no Claude' : 'Sem banco nesta visualização',
      pendencias: [
        { texto: 'Guardar as ideias no banco do painel (Claude)', resolvida: temDb },
        {
          texto: 'Projeto Supabase separado "Banco de Ideias" — opcional, aguardando sua decisão',
          resolvida: false,
          ajuda: 'Sua organização no Supabase já tem 2 projetos. Um 3º pode ter custo mensal.\nResponda no chat se quer criar mesmo assim.',
        },
      ],
      pode_sincronizar: false,
      verificado_em: agora,
    },
    {
      id: 'github',
      nome: 'GitHub',
      descricao: 'Repositórios viram ideias (descrição, issues abertas como tarefas, site no ar).',
      status: 'pendente',
      detalhe: 'Importação pelo Claude Code',
      pendencias: [
        { texto: 'Claude Code com acesso aos seus repositórios', resolvida: true },
        {
          texto: 'Pedir a importação na conversa com o Claude Code',
          resolvida: false,
          ajuda: 'Escreva: "importe meus repositórios para o Banco de Ideias"',
        },
      ],
      pode_sincronizar: false,
      verificado_em: agora,
    },
    {
      id: 'desktop',
      nome: 'Desktop',
      descricao: 'Pastas e notas que estão só no seu computador.',
      status: 'desconectado',
      detalhe: 'Precisa do seu computador',
      pendencias: [
        {
          texto: 'Opção grátis: publicar as pastas pelo GitHub Desktop',
          resolvida: false,
          ajuda: 'GitHub Desktop → Repository → Push (ou "Publish repository").\nDepois elas entram pela conexão GitHub.',
        },
        {
          texto: 'Opção completa: abrir uma sessão do Claude Code no computador',
          resolvida: false,
          ajuda: 'App Claude Desktop (aba Code) na pasta do projeto\n— ou no terminal, dentro da pasta: claude remote-control',
        },
      ],
      pode_sincronizar: false,
      verificado_em: agora,
    },
    {
      id: 'chats',
      nome: 'Chats no cloud',
      descricao: 'Conversa, busca e organização usam o Claude da sua conta, sem chave de API.',
      status: temIa ? 'conectado' : 'desconectado',
      detalhe: temIa ? 'Claude da sua conta' : 'Claude não liberado',
      pendencias: [
        {
          texto: 'Permitir que o painel use o Claude (ele pergunta no primeiro uso)',
          resolvida: temIa,
          ajuda: temIa ? undefined : 'Recarregue o painel e clique em Permitir quando o Claude perguntar.',
        },
      ],
      pode_sincronizar: false,
      verificado_em: agora,
    },
  ]
}

async function iniciarConexao(id: ConexaoId) {
  const log: string[] = []
  if (id === 'chats' && sample && iaPermitida) {
    log.push('Testando o Claude da sua conta…')
    try {
      await sample('Responda apenas: ok', { modelTier: 'quick', cache: false })
      log.push('✓ Claude respondeu. Busca com IA, organização e conversa liberadas.')
    } catch (e) {
      log.push(`✗ ${erroAmigavel(e)}`)
    }
  }
  const c = conexoes().find((x) => x.id === id)!
  c.pendencias.forEach((x, n) => log.push(`${x.resolvida ? '✓' : '✗'} ${n + 1}. ${x.texto}`))
  if (c.pendencias.some((x) => !x.resolvida)) log.push('As pendências marcadas com ✗ dependem de você — veja o passo a passo acima.')
  return { conexao: c, log }
}
