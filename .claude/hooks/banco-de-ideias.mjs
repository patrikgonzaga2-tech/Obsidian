// Gancho do Banco de Ideias: a cada pergunta e a cada resposta desta conversa do Claude Code,
// manda para o painel (obsidian-banco-de-ideias.vercel.app) o que foi pedido, o fim da resposta,
// o ramo e o link da conversa. Não gasta tokens e nunca trava a conversa: qualquer erro é ignorado.
// Precisa da variável BANCO_IDEIAS_TOKEN no ambiente do Claude Code (igual à da Vercel).
import { readFileSync } from 'node:fs'
import { execFileSync, spawnSync } from 'node:child_process'

const URL_SINAL = process.env.BANCO_IDEIAS_URL || 'https://obsidian-banco-de-ideias.vercel.app/api/sessoes/sinal'

function principal() {
  const token = (process.env.BANCO_IDEIAS_TOKEN || '').trim()
  // só nas conversas na nuvem (claude.ai/code): é dali que sai o link da conversa
  const cse = (process.env.CLAUDE_CODE_REMOTE_SDK_URL || '').match(/cse_([A-Za-z0-9]+)/)
  if (!token || !cse) return
  const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}')

  let evento, texto
  if (entrada.hook_event_name === 'UserPromptSubmit') {
    evento = 'pergunta'
    texto = String(entrada.prompt || '')
  } else if (entrada.hook_event_name === 'Stop') {
    if (entrada.stop_hook_active) return
    evento = 'resposta'
    texto = ultimaResposta(entrada.transcript_path)
  } else return
  if (!texto.trim()) return

  const git = (...args) => {
    try {
      return execFileSync('git', args, { cwd: entrada.cwd || process.cwd(), timeout: 2000, encoding: 'utf8' }).trim()
    } catch {
      return ''
    }
  }
  const remoto = git('remote', 'get-url', 'origin').replace(/\.git$/, '').split('/').slice(-2).join('/')

  const corpo = JSON.stringify({
    sessao_id: `session_${cse[1]}`,
    evento,
    texto: texto.slice(-4000), // o fim da resposta é onde fica o "o que falta" e a pergunta
    ramo: git('branch', '--show-current'),
    repo: remoto,
  })
  // curl respeita o proxy e os certificados do ambiente
  spawnSync('curl', ['-sS', '-m', '6', '-o', '/dev/null', '-X', 'POST', '-H', 'Content-Type: application/json',
    '-H', `x-banco-ideias-token: ${token}`, '--data-binary', '@-', URL_SINAL], { input: corpo, timeout: 8000 })
}

/** Texto da última resposta do Claude no histórico (.jsonl) desta conversa. */
function ultimaResposta(caminho) {
  if (!caminho) return ''
  const linhas = readFileSync(caminho, 'utf8').trim().split('\n')
  for (let n = linhas.length - 1; n >= 0; n--) {
    let item
    try {
      item = JSON.parse(linhas[n])
    } catch {
      continue
    }
    if (item.type === 'user' && typeof item.message?.content === 'string') break // chegou na pergunta: não há texto
    if (item.type !== 'assistant') continue
    const partes = (item.message?.content || []).filter((c) => c.type === 'text').map((c) => c.text)
    if (partes.length) return partes.join('\n')
  }
  return ''
}

try {
  principal()
} catch {
  // nunca atrapalhar a conversa
}
