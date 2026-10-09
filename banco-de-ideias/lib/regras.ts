// Regras de edição aplicadas no servidor e na versão artifact.
import type { Ideia } from './tipos'
import { faseDoProgresso, progressoDasTarefas } from './tipos'

export const EDITAVEIS: (keyof Ideia)[] = [
  'titulo', 'categoria', 'status', 'fase', 'progresso', 'prioridade',
  'resumo', 'resumo_detalhado', 'tarefas', 'url_produto', 'repo',
]

/** Filtra campos editáveis e aplica: checklist define o progresso; "no ar" fecha em 100%. */
export function aplicarRegras(b: Partial<Ideia>): Partial<Ideia> {
  const patch: Partial<Ideia> = {}
  for (const k of EDITAVEIS) if (k in b) (patch as Record<string, unknown>)[k] = b[k]
  if (patch.progresso != null) patch.progresso = Math.max(0, Math.min(100, Math.round(Number(patch.progresso))))
  if (patch.tarefas && patch.progresso == null && patch.status !== 'no_ar') {
    const p = progressoDasTarefas(patch.tarefas)
    if (p != null) {
      patch.progresso = p
      patch.fase ??= faseDoProgresso(p)
    }
  }
  if (patch.status === 'no_ar') {
    patch.progresso = 100
    patch.fase = 'fim'
  }
  return patch
}
