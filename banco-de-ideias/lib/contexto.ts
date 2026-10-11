// Monta o "pacote de contexto" de uma ideia: vai como system prompt da conversa
// e também é o texto copiado/enviado para o Claude no navegador.
import type { Ideia, Mensagem, Sessao, Tarefa } from './tipos'
import { diasDesde, FASE_LABEL, PRIORIDADE_LABEL, STATUS_LABEL } from './tipos'

/** Banco oficial das ideias: o Claude Code grava nele pelo conector do Supabase. */
export const BANCO_OFICIAL =
  'Supabase pelo conector (projeto "Corpo Feliz – CRM e Ideias", id ysgsyhmkixvlxpgbyqkl, tabela public.hub_ideias; nunca mexa nas outras tabelas, que são do CRM)'

const dataCurta = (iso?: string) => {
  const t = iso ? Date.parse(iso) : NaN
  return Number.isFinite(t) ? new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : ''
}

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
    i.analise?.situacao
      ? `## Como está hoje (revisão de ${dataCurta(i.analise.revisado_em)})\n${i.analise.situacao}\nÚltimo avanço: ${dataCurta(i.analise.ultimo_avanco)}${
          diasDesde(i.analise.ultimo_avanco) != null ? ` (há ${diasDesde(i.analise.ultimo_avanco)} dias)` : ''
        }${i.analise.fonte ? `, ${i.analise.fonte}` : ''}.\n`
      : '',
    i.analise?.sugestao ? `## Sugestão do Claude\n${i.analise.sugestao}\n` : '',
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

/** Instruções para a sessão avisar o painel ("Mexendo agora") pelo Supabase. */
function painelAoVivo(i: Ideia, foco: string): string {
  const sql = (campos: string) =>
    `update public.hub_ideias set conversa_claude = coalesce(conversa_claude, '{}'::jsonb) || jsonb_build_object(${campos}) where id = '${i.id}';`
  return `PAINEL AO VIVO (Banco de Ideias)
O painel mostra em "Mexendo agora" as sessões abertas. Grave no ${BANCO_OFICIAL}, sem mudar os outros campos:
- Antes do passo 1: ${sql(`'ativa', true, 'ultima_em', now(), 'foco', '${foco.replace(/'/g, "''").slice(0, 80)}'`)}
- A cada item fechado: ${sql(`'ultima_em', now()`)}
- Ao terminar ou ao entregar o "RESUMO PARA NOVA CONVERSA": ${sql(`'ativa', false, 'ultima_em', now()`)} (e grave o resumo em conversa_claude.resumo).
- Registre também esta sessão: chame get_session (conector claude-code-remote, sem session_id) e grave em public.hub_sessoes:
  insert into public.hub_sessoes (id, titulo, url, situacao, detalhe, ideias, atividade_em) values ('<id da sessão>', '<título da sessão>', 'https://claude.ai/code/<id da sessão>', 'trabalhando', '<o que vamos fazer>', array['${i.id}'], now()) on conflict (id) do update set titulo = excluded.titulo, situacao = 'trabalhando', detalhe = excluded.detalhe, acompanhar = true, atividade_em = now(), ideias = array(select distinct unnest(hub_sessoes.ideias || excluded.ideias));
  A cada item fechado, atualize titulo (releia com get_session), detalhe e atividade_em. Ao terminar, situacao = 'parada'.
`
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
6. Ao fechar cada item, diga em 1 linha o que mudou e marque a tarefa como feita no Banco de Ideias: ${BANCO_OFICIAL}, linha id "${i.id}", campo tarefas (feito = true), e atualize atualizado_em e analise.ultimo_avanco para agora. Se não conseguir, me diga qual tarefa eu marco.

CUSTO DA CONVERSA
- Comece cada resposta com o número dela entre colchetes, por exemplo [3].
- Na resposta ${LIMITE_RESPOSTAS} (ou antes, se a conversa ficar pesada), pare e me entregue um bloco "RESUMO PARA NOVA CONVERSA" com: o que já foi decidido, o que mudou, o que falta (numerado) e o próximo passo. Eu colo esse resumo no Banco de Ideias e abro uma conversa nova, que sai mais barata.

${painelAoVivo(i, 'Ajustes gerais')}
Comece pelo passo 1.`
}

/** Mensagem curta para retomar a conversa que já existe. */
export function promptRetomarConversa(i: Ideia): string {
  return `Continuando o ajuste de "${i.titulo}". Releia o fim desta conversa, diga em 2 linhas onde paramos e siga o próximo item, um por vez. Continue numerando as respostas [n] e, na resposta ${LIMITE_RESPOSTAS}, me entregue o "RESUMO PARA NOVA CONVERSA". Antes de seguir, avise o painel: no ${BANCO_OFICIAL}, linha id "${i.id}", grave conversa_claude.ativa = true e conversa_claude.ultima_em = agora (mantendo os outros campos); ao terminar, ativa = false.`
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

/** Prompt para resolver UMA pendência numa conversa nova, passo a passo. */
export function promptPendencia(i: Ideia, t: Tarefa): string {
  return `Vamos resolver UMA pendência do projeto "${i.titulo}" (Laura Rosa / Comunidade Corpo Feliz). Responda sempre em português do Brasil, com frases curtas e sem jargão.

PENDÊNCIA
${t.texto}

CONTEXTO (vem do Banco de Ideias)
${contextoDaIdeia(i)}

COMO VAMOS TRABALHAR
1. Leia o que precisar${i.repo ? ` no repositório ${i.repo}` : ''} (CLAUDE.md e docs) e confira como essa pendência está hoje. Não altere nada ainda.
2. Me diga em até 3 linhas como está e o plano em passos numerados.
3. Faça UM passo por vez, com detalhes: onde clicar, o que escrever, o que eu devo ver na tela. Espere a minha resposta antes do próximo passo.
4. Se o passo depender de algo fora do Claude (conector, chave, permissão, clique em outro site), pare e me diga exatamente onde clicar.
5. Pagamento, checkout, preço, oferta, anúncios no Meta e mensagens para clientes: só com a minha aprovação explícita. Nada de deploy, merge ou push na main sem eu pedir.
6. Quando a pendência estiver resolvida, marque a tarefa como feita no Banco de Ideias: ${BANCO_OFICIAL}, linha id "${i.id}", no campo tarefas a tarefa id "${t.id}" (feito = true), e atualize atualizado_em e analise.ultimo_avanco para agora. Se não conseguir, me diga qual tarefa eu marco.

CUSTO DA CONVERSA
- Comece cada resposta com o número dela entre colchetes, por exemplo [3].
- Na resposta ${LIMITE_RESPOSTAS} (ou antes, se a conversa ficar pesada), pare e me entregue um bloco "RESUMO PARA NOVA CONVERSA" com o que foi decidido, o que mudou, o que falta e o próximo passo.

${painelAoVivo(i, t.texto)}
Comece pelo passo 1.`
}

// ---------- botões "Atualizar agora" e "Atualizar tudo" ----------
// O site não roda o Claude sozinho: cada botão copia um prompt pronto para colar no Claude Code.

const listaIdeias = (ideias: Ideia[]) =>
  ideias.length ? ideias.map((i) => `"${i.titulo}" (id ${i.id})`).join(', ') : 'nenhuma ainda (se for uma ideia nova, crie o card em hub_ideias e ligue aqui)'

/** Colado DENTRO da sessão: ela mesma grava resumo, progresso e situação no painel. */
export function promptAtualizarSessao(s: Sessao, ideias: Ideia[]): string {
  return `Atualize o Banco de Ideias com o andamento desta conversa e depois siga de onde paramos. Grave no ${BANCO_OFICIAL.replace('tabela public.hub_ideias', 'tabelas public.hub_sessoes e public.hub_ideias')}:

1. Em public.hub_sessoes, linha id '${s.id}': titulo (releia o nome desta sessão com get_session), resumo (3 a 5 linhas: o que já foi feito e o que falta), progresso (0 a 100, pelo plano desta conversa), situacao ('trabalhando', 'esperando' ou 'parada'), detalhe (o que você espera de mim agora, em 1 frase), atividade_em = now() e sincronizado_em = now().
2. Nas ideias ligadas, em public.hub_ideias: ${listaIdeias(ideias)}. Marque as tarefas concluídas, acrescente as tarefas novas que surgiram, e atualize resumo, analise.situacao, analise.sugestao, analise.ultimo_avanco e atualizado_em. Se o trabalho ligou outra ideia, acrescente o id dela em hub_sessoes.ideias.
3. Responda em 1 linha: "Banco de Ideias atualizado: N%" e continue o trabalho.`
}

/** Para continuar o trabalho de uma sessão numa conversa nova. */
export function promptNovaConversaSessao(s: Sessao, ideias: Ideia[]): string {
  const principal = ideias[0]
  return `Vamos continuar, numa conversa nova, um trabalho que começou na sessão "${s.titulo}" (${s.url}). Responda sempre em português do Brasil, com frases curtas e sem jargão.

ONDE PARAMOS${s.progresso != null ? ` (${s.progresso}%)` : ''}
${s.resumo?.trim() || s.detalhe || 'Sem resumo gravado: leia a sessão anterior (get_session e list_events) para saber onde paramos.'}
${s.detalhe ? `\nO que estava esperando de mim: ${s.detalhe}\n` : ''}${s.ultimo_pedido ? `\nMeu último pedido: ${s.ultimo_pedido}\n` : ''}${s.ultima_resposta ? `\nÚLTIMA RESPOSTA DA CONVERSA ANTERIOR\n${s.ultima_resposta}\n` : ''}
${ideias.map((i) => `CONTEXTO DA IDEIA (Banco de Ideias)\n${contextoDaIdeia(i)}\n`).join('\n')}
COMO VAMOS TRABALHAR
1. Confira o estado atual (repositório, CLAUDE.md e docs) antes de mexer. Não altere nada ainda.
2. Me diga em até 5 linhas onde estamos e uma lista numerada do que falta.
3. Trabalhe UM item por vez: explique em 2 ou 3 linhas, faça UMA pergunta ou proponha UMA mudança com antes e depois, e espere a minha resposta.
4. Se depender de algo fora do Claude, me diga exatamente onde clicar.
5. Pagamento, checkout, preço, oferta, anúncios no Meta e mensagens para clientes: só com a minha aprovação explícita. Nada de deploy, merge ou push na main sem eu pedir.
6. Ao fechar cada item, atualize o Banco de Ideias (${BANCO_OFICIAL}): tarefas, resumo e analise.ultimo_avanco das ideias ligadas.

${principal ? painelAoVivo(principal, s.titulo) : ''}
Comece pelo passo 1.`
}

/** Colado numa sessão nova: varre toda a base e atualiza o painel inteiro. */
export function promptAtualizarTudo(): string {
  return `Atualize o Banco de Ideias com tudo o que está acontecendo na nossa base (Laura Rosa / Comunidade Corpo Feliz). Responda em português do Brasil, com frases curtas. Só LEIA as fontes; grave apenas nas tabelas hub_* do Supabase (projeto "Corpo Feliz – CRM e Ideias", id ysgsyhmkixvlxpgbyqkl). Nunca escreva em outras tabelas nem no projeto de vendas fjlbvoephhextnxemygf.

1. Sessões do Claude Code: list_sessions (as minhas, ativas nas últimas 48 horas). Para cada uma que for trabalho real (ignore rotinas e esta sessão), leia o fim da conversa (list_events) e grave em public.hub_sessoes: id, titulo, url 'https://claude.ai/code/<id>', situacao ('trabalhando', 'esperando' ou 'parada'), detalhe (o que espera de mim), resumo (3 a 5 linhas), progresso (0 a 100 pelo plano da conversa), ideias ligadas (ids de hub_ideias), atividade_em, sincronizado_em = now(), acompanhar = true. Sessões encerradas ou sem atividade há mais de 3 dias: acompanhar = false.
2. Ideias (public.hub_ideias): para cada ideia, confira o que mudou nas fontes que ela cita (commits e PRs recentes no GitHub, deploys na Vercel, tabelas do CRM só leitura, rotinas). Atualize tarefas (feitas e novas), progresso, status, resumo e analise (situacao, sugestao, ultimo_avanco, revisado_em = agora). Ideia nova que apareceu numa sessão e não tem card: crie o card.
3. "Meu trabalho" (public.hub_perfil, id 'atual'): atualize a lista "preciso" com o que depende de mim agora, do mais urgente para o menos.
4. No fim, me entregue em até 10 linhas: o que está andando, o que está esperando por mim (com o link da sessão) e o que está parado há mais tempo.`
}
