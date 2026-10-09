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
