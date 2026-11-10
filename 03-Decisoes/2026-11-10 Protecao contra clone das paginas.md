# Proteção contra clone das páginas (10/11/2026)

**Decisão (Patrik):** proteger as páginas contra clone sem cloaker. Cloaker foi recusado porque mostra uma página ao Meta e outra ao cliente, o que vai contra a regra do Meta e põe em risco a conta de anúncio e o BM.

**No ar (PR #405, mesclado e conferido em produção):**
1. Antirrobô: programas de copiar site e navegadores automáticos levam 403 nas páginas. Robôs do Meta, Google e WhatsApp passam. APIs e webhooks ficam fora. (`lib/protecao.ts` + `proxy.ts`)
2. Trava de domínio: cópia publicada em outro endereço volta para laurarosapersonal.com, no mesmo caminho e com as UTMs. (`app/layout.tsx`)
3. Imagens só nos nossos sites, no efeitolipo.com.br, na Greenn e nos e-mails.

**Conferido em produção:** celular, app do Instagram e robô do Meta → 200; HTTrack, wget e curl → 403; quiz até o checkout ok e pixels disparando.

**Pendente:**
- Patrik: no Meta, liberar o pixel só para os nossos domínios e o da Greenn (Gerenciador de Eventos → Configurações → Permissões de tráfego).
- Opcional: limite de páginas por minuto no Firewall da Vercel (a API não deixou criar; fazer pelo painel da Vercel).
- Para as próximas checagens com Playwright: usar user agent de navegador comum.
