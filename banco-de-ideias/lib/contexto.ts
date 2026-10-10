// Monta o "pacote de contexto" de uma ideia: vai como system prompt da conversa
// e também é o texto copiado/enviado para o Claude no navegador.
import type { Ideia, Mensagem } from './tipos'
import { FASE_LABEL, PRIORIDADE_LABEL, STATUS_LABEL } from './tipos'

export function contextoDaIdeia(i: Ideia, historico: Mensagem[] = []): string {
  const feitas = i.tarefas.filter((t) => t.feito)
  const pendentes = i.tarefas.filter((t) => !t.feito)
  const linhas = [
    `# Ideia: ${i.titulo}`,
    `- Categoria: ${i.categoria}`,
    `- Status: ${STATUS_LABEL[i.status]} · Fase: ${FASE_LABEL[i.fase]} · Progresso: ${i.progresso}% · Prioridade: ${PRIORIDADE_LABEL[i.prioridade]}`,
    i.repo ? `- Repositório: github.com/${i.repo}` : '',
    i.url_produto ? `- No ar em: ${i.url_produto}` : '',
    '',
    '## Onde parei',
    i.resumo,
    '',
    i.resumo_detalhado ? `## Detalhes\n${i.resumo_detalhado}\n` : '',
    i.como_usar ? `## Como usar\n${i.como_usar}\n` : '',
    i.passos_uso?.length ? `## Passo a passo de uso\n${i.passos_uso.map((p, n) => `${n + 1}. ${p}`).join('\n')}\n` : '',
    i.links?.length ? `## Links\n${i.links.map((l) => `- ${l.rotulo}: ${l.url}`).join('\n')}\n` : '',
    i.comandos?.length
      ? `## Comandos que este agente entende\n${i.comandos.map((c) => `- ${c.titulo} (${c.onde}): ${c.texto}`).join('\n')}\n`
      : '',
    feitas.length ? `## Já feito\n${feitas.map((t) => `- [x] ${t.texto}`).join('\n')}\n` : '',
    pendentes.length
      ? `## Passo a passo pendente\n${pendentes.map((t, n) => `${n + 1}. ${t.texto}`).join('\n')}\n`
      : '## Passo a passo pendente\n(nenhuma tarefa pendente cadastrada)\n',
  ]
  const recentes = historico.slice(-8)
  if (recentes.length) {
    linhas.push(
      '## Últimas mensagens da conversa anterior',
      ...recentes.map((m) => `${m.papel === 'user' ? 'Eu' : 'IA'}: ${m.conteudo.slice(0, 600)}`),
      ''
    )
  }
  return linhas.filter((l) => l !== '').join('\n')
}

export function promptRetomada(i: Ideia, historico: Mensagem[] = []): string {
  return `${contextoDaIdeia(i, historico)}

---
Retome este projeto de onde parei. Comece pelo próximo passo pendente, me diga em 2–3 linhas o que vamos fazer agora e já me dê o primeiro movimento concreto.`
}

export function systemDaConversa(i: Ideia, historico: Mensagem[]): string {
  return `Você é o copiloto do Patrik no "Banco de Ideias", o painel onde ele guarda e retoma os projetos dele.
Responda sempre em português do Brasil, direto e prático. Frases curtas, sem jargão.
Seu trabalho: ajudar a avançar ESTA ideia a partir do ponto atual — sugerir o próximo passo, destravar, quebrar tarefas grandes.
Quando ele concluir algo ou decidir algo novo, lembre-o de marcar a tarefa no checklist do painel.

Contexto atual da ideia:

${contextoDaIdeia(i, historico)}`
}

// ---------- conversa de verdade no Claude (Claude Code ou chat) ----------

/** Limite de respostas antes de pedir o resumo e trocar de conversa (conversas longas ficam caras). */
export const LIMITE_RESPOSTAS = 20

export function destinoConversa(i: Ideia): { url: string; nome: string; instrucao: string } {
  if (i.onde_conversa === 'chat') {
    return { url: 'https://claude.ai/new', nome: 'chat do Claude', instrucao: 'Abre uma conversa nova no claude.ai.' }
  }
  const repo = i.repo ? i.repo.split('/').pop() : null
  return {
    url: 'https://claude.ai/code',
    nome: 'Claude Code',
    instrucao: repo
      ? `Abre o Claude Code: clique em "Novo", escolha o repositório ${repo} e cole o prompt (já copiado).`
      : 'Abre o Claude Code: clique em "Novo" e cole o prompt (já copiado).',
  }
}

/** Prompt completo para começar uma conversa nova que configura/ajusta esta ideia, item a item. */
export function promptConversaNova(i: Ideia): string {
  const objetivo =
    i.objetivo_conversa?.trim() ||
    'Revisar como este projeto está hoje e ajustá-lo para funcionar do jeito que eu preciso na nossa base (Laura Rosa / Corpo Feliz).'
  const resumo = i.conversa_claude?.resumo?.trim()
  return `Você vai me ajudar a configurar e ajustar "${i.titulo}" para a nossa base (Laura Rosa / Comunidade Corpo Feliz). Responda sempre em português do Brasil, com frases curtas e sem jargão.

OBJETIVO DESTA CONVERSA
${objetivo}

CONTEXTO (vem do Banco de Ideias)
${contextoDaIdeia(i)}
${
  resumo
    ? `
RESUMO DA CONVERSA ANTERIOR — continue a partir daqui, sem refazer o que já foi decidido
${resumo}
`
    : ''
}
COMO VAMOS TRABALHAR
1. Primeiro leia o que precisar${i.repo ? ` no repositório ${i.repo}` : ''} (o CLAUDE.md e os docs citados acima) e confira o que já existe. Não altere nada ainda.
2. Me mostre em até 5 linhas como está hoje e uma lista numerada dos itens que vamos ajustar, do mais importante para o menos importante.
3. Depois trabalhe UM item por vez: explique em 2 ou 3 linhas, faça UMA pergunta ou proponha UMA mudança com antes e depois, e espere a minha resposta antes de seguir.
4. Se um item depender de algo fora do Claude (conector, chave, permissão, clique em outro site), pare e me diga exatamente onde clicar.
5. Pagamento, checkout, preço, oferta, anúncios no Meta e mensagens para clientes: só com a minha aprovação explícita. Nada de deploy, merge ou push na main sem eu pedir.
6. Ao fechar cada item, diga em 1 linha o que mudou e qual tarefa eu marco no Banco de Ideias.

CUSTO DA CONVERSA
- Comece cada resposta com o número dela entre colchetes, por exemplo [3].
- Na resposta ${LIMITE_RESPOSTAS} (ou antes, se a conversa ficar pesada), pare e me entregue um bloco "RESUMO PARA NOVA CONVERSA" com: o que já foi decidido, o que mudou, o que falta (numerado) e o próximo passo. Eu colo esse resumo no Banco de Ideias e abro uma conversa nova, que sai mais barata.

Comece pelo passo 1.`
}

/** Mensagem curta para retomar a conversa que já existe. */
export function promptRetomarConversa(i: Ideia): string {
  return `Continuando o ajuste de "${i.titulo}". Releia o fim desta conversa, diga em 2 linhas onde paramos e siga o próximo item, um por vez. Continue numerando as respostas [n] e, na resposta ${LIMITE_RESPOSTAS}, me entregue o "RESUMO PARA NOVA CONVERSA".`
}

/** Recomendação: continuar a conversa atual ou começar outra (com o resumo). */
export function recomendarConversa(i: Ideia): { acao: 'nova' | 'continuar' | 'perguntar'; motivo: string } {
  const c = i.conversa_claude
  if (!c) return { acao: 'nova', motivo: 'Ainda não há conversa no Claude para esta ideia: comece uma nova.' }
  if (c.tamanho === 'grande')
    return {
      acao: 'nova',
      motivo: `A conversa atual passou de ~${LIMITE_RESPOSTAS} mensagens. Cada mensagem nova relê tudo, então fica caro: peça o resumo, cole abaixo e comece outra.`,
    }
  if (!c.url) return { acao: 'nova', motivo: 'Não guardei o link da conversa anterior: comece uma nova (ou cole o link abaixo para continuar).' }
  if (!c.tamanho) return { acao: 'perguntar', motivo: 'Já existe uma conversa. Quantas mensagens ela tem? Com isso eu digo se vale continuar ou começar outra.' }
  return {
    acao: 'continuar',
    motivo:
      c.tamanho === 'media'
        ? `A conversa tem entre 10 e ${LIMITE_RESPOSTAS} mensagens: dá para continuar, mas logo vai valer pedir o resumo e trocar.`
        : 'A conversa ainda é curta: continue nela.',
  }
}
