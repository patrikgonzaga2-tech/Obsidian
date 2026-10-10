// "Meu trabalho": perfil do que está sendo montado + texto para a Personalização do Claude.
import type { Funcao, Ideia, Perfil } from './tipos'
import { PRIORIDADE_LABEL } from './tipos'

const texto = (v: unknown) => (typeof v === 'string' ? v : v == null ? '' : String(v))
const PESO = { alta: 0, media: 1, baixa: 2 }

export function normalizarPerfil(v: unknown): Perfil | null {
  if (!v || typeof v !== 'object') return null
  const p = v as Record<string, unknown>
  const funcoes: Funcao[] = Array.isArray(p.funcoes)
    ? p.funcoes
        .filter((f) => f && typeof f === 'object')
        .map((f) => ({
          nome: texto(f.nome).trim(),
          descricao: texto(f.descricao).trim(),
          ideias: Array.isArray(f.ideias) ? f.ideias.map(texto).filter(Boolean) : [],
        }))
        .filter((f) => f.nome)
    : []
  return {
    montando: texto(p.montando).trim(),
    meta: texto(p.meta).trim(),
    funcoes,
    preciso: Array.isArray(p.preciso) ? p.preciso.map(texto).map((x) => x.trim()).filter(Boolean) : [],
    atualizado_em: texto(p.atualizado_em) || new Date().toISOString(),
  }
}

/** Ideias em andamento, da mais importante para a menos, com o próximo passo. */
export function trabalhandoAgora(ideias: Ideia[], max = 4) {
  return ideias
    .filter((i) => i.status === 'em_andamento')
    .sort((a, b) => PESO[a.prioridade] - PESO[b.prioridade] || b.progresso - a.progresso)
    .slice(0, max)
    .map((i) => ({ ideia: i, proximo: i.tarefas.find((t) => !t.feito)?.texto ?? 'definir o próximo passo' }))
}

/** O que está travando: coisas fora do Claude ainda não resolvidas, por ideia. */
export function pendenciasForaDoClaude(ideias: Ideia[]) {
  return ideias
    .filter((i) => i.status !== 'arquivado')
    .flatMap((i) => (i.preparos ?? []).filter((p) => !p.feito).map((p) => ({ ideia: i, texto: p.texto })))
}

/** Texto para colar na Personalização do Claude (ou nas instruções de um Projeto). */
export function instrucoesParaClaude(perfil: Perfil, ideias: Ideia[], linkPainel?: string): string {
  const porId = new Map(ideias.map((i) => [i.id, i]))
  const funcoes = perfil.funcoes
    .map((f) => {
      const nomes = f.ideias.map((id) => porId.get(id)).filter((i): i is Ideia => Boolean(i && i.status !== 'arquivado')).map((i) => i.titulo)
      return `- ${f.nome}: ${f.descricao}${nomes.length ? ` (${nomes.join('; ')})` : ''}`
    })
    .join('\n')
  const agora = trabalhandoAgora(ideias, 5)
    .map(({ ideia, proximo }, n) => `${n + 1}. ${ideia.titulo} — ${ideia.progresso}%, prioridade ${PRIORIDADE_LABEL[ideia.prioridade].toLowerCase()}. Próximo passo: ${proximo}`)
    .join('\n')
  const noAr = ideias.filter((i) => i.status === 'no_ar').map((i) => i.titulo).join('; ')
  return `Sou o Patrik. ${perfil.montando}

Meta de agora: ${perfil.meta}

Minhas funções:
${funcoes}

No que estou trabalhando agora (por prioridade):
${agora || '- nada em andamento'}

Já no ar: ${noAr || 'nada ainda'}.

O que preciso resolver:
${perfil.preciso.map((p) => `- ${p}`).join('\n') || '- nada pendente'}

Como prefiro trabalhar:
- Português do Brasil, frases curtas e diretas, sem jargão.
- Um item por vez, passo a passo: uma pergunta ou uma proposta com antes e depois, e espere minha resposta.
- Se algo depende de mim fora do Claude (conector, chave, permissão, clique em outro site), diga exatamente onde clicar.
- Pagamento, checkout, preço, oferta, anúncios no Meta e mensagens para clientes: só com minha aprovação explícita. Nada de deploy, merge ou push na main sem eu pedir.
- Conversas longas ficam caras: numere as respostas e, na resposta 20, me entregue um "RESUMO PARA NOVA CONVERSA".
${linkPainel ? `\nMeu centro de comando (ideias, agentes, comandos e próximos passos): ${linkPainel}` : ''}`.trim()
}

export function perfilInicial(): Perfil {
  return {
    montando:
      'Estou montando a operação digital da Laura Rosa (Comunidade Corpo Feliz): vendas diárias do Efeito Lipo (low ticket, R$ 27 a 67) pelo quiz "De Volta ao Eixo" com tráfego do Meta, a Comunidade Corpo Feliz (R$ 479) vendida no WhatsApp pela vendedora Aline, a entrega para quem comprou (Desafio 7D) e agentes de IA no Claude que cuidam de anúncios, comercial, vídeos e organização.',
    meta: 'Vender todo dia com custo por venda até R$ 37 e alinhar anúncio → quiz → oferta (hoje só 8% passam da 1ª tela do quiz; a régua é 32%).',
    funcoes: [
      { nome: 'Tráfego e vendas', descricao: 'anúncios no Meta, quiz, oferta e recuperação de vendas', ideias: ['seed-gestor-trafego', 'seed-quiz', 'seed-recuperar-checkout', 'seed-uma-promessa'] },
      { nome: 'Comercial', descricao: 'leads do Instagram, WhatsApp com a Aline, CRM, relatórios e candidatura da Comunidade', ideias: ['seed-painel-leads', 'seed-team-corpo-feliz'] },
      { nome: 'Conteúdo e vídeo', descricao: 'criativos e aulas com a Laura (avatar, voz e montagem)', ideias: ['seed-estudio-video', 'seed-agente-corpo-feliz'] },
      { nome: 'Entrega', descricao: 'experiência de quem comprou', ideias: ['seed-7-dias'] },
      { nome: 'Organização e IA', descricao: 'Banco de Ideias, segundo cérebro e as rotinas do Claude', ideias: ['seed-banco-ideias', 'seed-segundo-cerebro'] },
    ],
    preciso: [
      'Aprovar ou recusar as propostas pendentes do painel de anúncios',
      'Reconectar o Instagram no UMCLIQUE',
      'Preencher a planilha da Aline (VENDAS OUTUBRO, 01 a 06/10) e exportar as vendas de outubro da Greenn',
      'Testar os webhooks da Greenn que faltam (Semestral, Efeito Lipo 21D, Vitalício, Pix Simbólico)',
      'Decidir: Supabase separado para o Banco de Ideias ou ficar no banco do Claude',
      'Escolher quais repositórios e pastas do computador entram no Banco de Ideias',
    ],
    atualizado_em: new Date().toISOString(),
  }
}
