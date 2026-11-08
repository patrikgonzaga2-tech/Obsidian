---
type: padrao
title: "Prompts para conversas paralelas - Comunidade"
project: "Corpo Feliz - Comunidade"
tags: [tipo/padrao, projeto/corpo-feliz-comunidade, prompts, paralelo]
keywords: [prompt, conversa, paralela, dividir, quiz, app, anúncios, gravyx, vídeo]
created: 2026-11-08
updated: 2026-11-08
summary: "Prompts prontos para abrir várias conversas do Claude Code ao mesmo tempo, cada uma com uma etapa da Comunidade, sem bater uma na outra."
---

# Prompts para conversas paralelas (Comunidade)

Projeto: [[Corpo Feliz - Comunidade]]

## Como usar
- Abra uma conversa nova do Claude Code com **os dois repositórios**: `patrikgonzaga2-tech/LR_LauraRosaPersonal` e `patrikgonzaga2-tech/obsidian`.
- Cole um prompt por conversa. Cada uma trabalha numa **branch própria** para não dar conflito.
- Toda conversa termina atualizando a tabela "Status" e o "Registro" da nota [[Corpo Feliz - Comunidade]] no Obsidian.

## Base comum (já vai dentro de cada prompt)
> Leia primeiro, no repositório obsidian, `01-Projetos/Corpo Feliz - Comunidade.md` e só as notas que ele aponta para a sua tarefa. Siga o CLAUDE.md do LR_LauraRosaPersonal. Regra: NUNCA INVENTE NADA; todo número com fonte e data. Pagamento, checkout, preço, oferta e links da Greenn só com OK explícito do Patrik (mostre antes/depois e espere). Não escreva no banco fjlbvoephhextnxemygf. Sem nome, telefone ou dado de saúde de aluna. Ao terminar, atualize o Status e o Registro da nota da Comunidade no Obsidian e me mande o link do PR/prévia.

---

## A · Quiz da Comunidade (etapa 3)
```
Tarefa: montar o quiz da Comunidade Corpo Feliz numa rota nova do site (LR_LauraRosaPersonal).

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md" e "01-Projetos/Corpo Feliz - Comunidade/Comunidade - quiz tela a tela.md" (é a especificação aprovada: 17 telas, 14 perguntas, capas ?p=1..3, ofertas ?o=1..3, lógica do resultado). Siga o CLAUDE.md do LR_LauraRosaPersonal.

O que fazer:
1. Rota nova (sugestão: app/comunidade-quiz/), reaproveitando o motor do quiz atual (app/efeito-lipo-quiz/) sem mexer nele. Textos exatamente como na especificação.
2. Resultado: "Você costuma parar…", plano (tempo · onde · fase · cuidado), espaço da VSL (vazio até o Patrik mandar), checklist da Comunidade, resposta ao medo, botão "Tirar dúvida no WhatsApp" para o 0948 oficial.
3. Oferta por ?o=: deixe CHECKOUT vazio e o botão desligado. Preço e link da Greenn só com OK explícito do Patrik.
4. Rastreio igual ao quiz atual (quiz_sessions/quiz_events), com a capa e a oferta marcadas.
5. Registrar a rota no painel oficial (app/paineloficialcorpofeliz/_dados.ts) no mesmo PR.
6. Branch própria (ex.: claude/comunidade-quiz), PR em rascunho pela API REST (gh api repos/.../pulls; GraphQL não funciona aqui), conferir a tela no celular (Playwright iPhone 13) e me mandar prints e o link.

Regras: NUNCA INVENTE NADA. Sem quilos, prazo, antes e depois, nome de remédio. Não mesclar sem o meu OK.
Ao terminar, atualize o Status e o Registro em "01-Projetos/Corpo Feliz - Comunidade.md" no Obsidian.
```

## B · Ajustes no app (etapa 4)
```
Tarefa: preparar o app Corpo Feliz (/app no LR_LauraRosaPersonal) para receber as assinantes novas da Comunidade.

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md" (seção App) e, no LR_LauraRosaPersonal, docs/APP_CORPO_FELIZ.md. Siga o CLAUDE.md.

O que fazer:
1. Me mostre como funciona hoje a liberação de acesso (lib/app-cf/servidor.ts, PRODUTOS_LIBERADOS vazio) e o que precisa para quem comprar a assinatura nova entrar sozinha. Não preencha com produto nenhum sem eu mandar o código do produto da Greenn.
2. Plano B: o código usa 5 min e o botão diz "Só 10 minutos de movimento" (lib/app-cf/config.ts). Mostre as duas opções e espere eu escolher.
3. Aulas: hoje só 5 aulas de 28 a 37 min. Quero aulas com o NOME do vídeo da área de membros, para a aluna achar o vídeo lá. Me peça a lista de vídeos (nome, duração, onde treina) antes de cadastrar; não invente nomes.
4. Branch própria (ex.: claude/comunidade-app), PR em rascunho pela API REST, prints no celular.

Regras: NUNCA INVENTE NADA. Nada de pagamento sem o meu OK explícito. Não mesclar sem o meu OK.
Ao terminar, atualize o Status e o Registro em "01-Projetos/Corpo Feliz - Comunidade.md" no Obsidian.
```

## C · Anúncios no Gravyx (etapa 5)
```
Tarefa: criar os anúncios da Comunidade Corpo Feliz (3 imagens + 3 roteiros de vídeo vertical) no formato que o app Movimento Emagreça usa, mas com conteúdo NOSSO: a Laüra e telas reais do app Corpo Feliz.

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md", "03-Decisoes/Comunidade - promessa parar de recomeçar.md" e a seção 12 (Criativos) de "Comunidade - relatório da promessa (08-11).md". Para o formato do concorrente, "Comunidade - concorrentes.md" (procure "Movimento").

O que fazer:
1. Propor os 6 criativos (texto na imagem, legenda, título, gancho dos 3 primeiros segundos) usando as 3 promessas: parar de recomeçar (principal), sua fase, sem medo. Passar os roteiros de vídeo pelo agente revisor-anuncio do repositório.
2. Me mostrar tudo antes de gerar. Depois do meu OK, gerar as imagens no Gravyx: pergunte em qual workspace e me mostre o custo em tokens antes (acima de 1.000 tokens o Gravyx pede confirmação).
3. Não copiar vídeo, texto nem anúncio do concorrente. Não usar fotos da pasta "pilates" do Drive (são de outra cliente).
4. Nada no Meta: não criar nem ativar campanha.

Regras: NUNCA INVENTE NADA. Sem quilos, prazo, antes e depois, balança, caneta, nome de remédio; público 18+; perguntas em vez de afirmar característica de quem vê.
Ao terminar, salve os textos aprovados numa nota nova em "01-Projetos/Corpo Feliz - Comunidade/" e atualize o Status e o Registro da nota principal.
```

## D · Vídeo da VSL com o áudio da Laüra (etapa 5b) — só depois que o áudio existir
```
Tarefa: montar o vídeo da VSL da Comunidade com o áudio que a Laüra gravou, no estilo de VSL de app (cortes rápidos, texto na tela, telas do app), com imagens NOSSAS.

Leia primeiro, no repositório obsidian, "01-Projetos/Corpo Feliz - Comunidade.md" e "Comunidade - roteiro da VSL da Laura.md". No LR_LauraRosaPersonal, use a skill video-laura e o agente editor-video (prévia grátis com --simular antes de gastar crédito).

O que fazer:
1. Me peça o arquivo do áudio da Laüra e a lista de imagens/vídeos que posso usar (Laüra, telas do app, alunas autorizadas).
2. Transcrever o áudio, alinhar com o roteiro e montar a prévia 9:16 com legenda. Me mostrar antes de qualquer gasto.
3. Não usar nenhum trecho do vídeo do concorrente.

Regras: NUNCA INVENTE NADA. Sem antes e depois, quilos, prazo, nome de remédio. Produtor-video gasta crédito: só com o meu OK.
Ao terminar, coloque o link do vídeo na nota principal da Comunidade (Status e Registro).
```

---

## R · Retomar a Comunidade numa conversa nova (08/11/2026)
```
Vamos continuar o projeto Comunidade Corpo Feliz. Anexe os repositórios LR_LauraRosaPersonal e obsidian.
Leia SÓ a nota "01-Projetos/Corpo Feliz - Comunidade.md" do Obsidian (tabela Status, Identidade, Pendências e Registro) e, se a tarefa pedir, a nota específica que ela aponta. Siga o CLAUDE.md do LR_LauraRosaPersonal.

Onde paramos:
- /comunidade-quiz no ar. A página /comunidade v2 (padrão Movimento, rosa, logo, 5 bônus) está no PR #370, esperando o "pode subir".
- O roteiro v3.1 da VSL está pronto e falta o áudio da Laüra.
- O vídeo vai seguir a VSL do Movimento cena por cena, com quadros nossos (33 cenas no Gravyx, links em "Comunidade - VSL mapa de cenas").

Próximo passo: [escreva aqui: publicar #370 / montar o vídeo com o áudio / ajustar o quiz / anúncios].

Economia: não abra imagens nem prints sem precisar; um print só no fim; leia só a seção do doc que a tarefa pede.
Regras: NUNCA INVENTE NADA; pagamento e checkout só com o meu OK explícito; tudo que for decidido entra no Obsidian.
```
