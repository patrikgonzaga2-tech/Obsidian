---
type: padrao
title: "Prompt - App - projeto Supabase só do app"
project: "Corpo Feliz - Comunidade"
tags: [tipo/padrao, projeto/corpo-feliz-comunidade, prompt, app, supabase]
keywords: [prompt, supabase, projeto separado, app corpo feliz, alunas, migração, pro]
created: 2026-11-08
updated: 2026-11-08
summary: "Prompt da conversa que tira o App Corpo Feliz do banco de vendas e passa para um projeto Supabase só dele (com as alunas)."
---

# Prompt (copiar inteiro; rodar depois que o Patrik assinar o Supabase Pro)

```
Tarefa: o App Corpo Feliz (/app no LR_LauraRosaPersonal) precisa de um projeto Supabase só dele, com as alunas, separado
do banco de vendas "Projeto Corpo Feliz" (fjlbvoephhextnxemygf). Pedido do Patrik em 08/11.

Leia primeiro: CLAUDE.md; docs/APP_CORPO_FELIZ.md (Servidor, Banco, Variáveis na Vercel, E-mail de entrada);
Obsidian "01-Projetos/Corpo Feliz - Comunidade/Comunidade - app pronto para teste (08-11).md".

Situação em 08/11 (conferir de novo, pode ter mudado): o app usa SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY (os mesmos das vendas)
em lib/app-cf/servidor.ts e a URL + chave anon fixas em lib/app-cf/config.ts (login). Tabelas app_cf_* (SQL em
supabase/app-corpo-feliz.sql, -v2.sql, -v3.sql), bucket privado app-cf (0 fotos), 3 contas de teste, 2 e-mails liberados,
5 aulas, cérebro da Laura IA (app_cf_ia_base). Usam o banco do app: app/api/app/*, app/api/app-admin, app/painel/app,
lib/app-cf/comunidade-admin.ts, cron /api/app/lembretes. O acesso por compra (temAcesso) precisa continuar LENDO as vendas
(compras_aprovadas/assinaturas) no banco de vendas, só leitura.

Plano (me mostre antes de executar e espere OK em cada etapa que cria, gasta ou apaga):
1. Criar o projeto (nome "App Corpo Feliz", região São Paulo sa-east-1) na organização "Corpo Feliz Org" (Pro). Mostre o custo antes.
2. Aplicar o esquema do app (v1, v2, v3) no projeto novo e conferir com os advisors.
3. Copiar os dados pequenos que fazem sentido (liberados, aulas, cérebro). As 3 contas de teste só entram de novo.
4. Login no projeto novo: SMTP do Brevo, modelos do e-mail em português (8 dígitos), Redirect URLs (/app e /app-admin).
   O Patrik ou o Claude Desktop fazem o que precisar de chave (nunca colar chave no chat).
5. Código: variáveis próprias do app (ex.: APP_SUPABASE_URL, APP_SUPABASE_SERVICE_ROLE_KEY) para o banco do app e as atuais só
   para ler vendas no temAcesso; config.ts com a URL/anon do projeto novo. O Patrik cadastra as chaves na Vercel.
6. Testar na prévia (entrar, Hoje, Concluí, foto, Laura IA, painel), prints no celular, e só então trocar em produção.
7. Depois de 7 dias funcionando, propor apagar as tabelas app_cf_* do banco de vendas (com OK).

Branch própria (claude/app-projeto-proprio), PR em rascunho, painel oficial no mesmo PR. NUNCA INVENTE NADA.
Nada de pagamento/checkout. Não mesclar sem o meu OK. Banco de vendas: só leitura.
Ao terminar, atualize o Status e o Registro em "01-Projetos/Corpo Feliz - Comunidade.md" no Obsidian.
```
