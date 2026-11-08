---
type: projeto
title: "Comunidade - inventário do Drive"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade]
keywords: [drive, inventário, criativos, depoimentos, quiz]
created: 2026-11-08
updated: 2026-11-08
summary: "O que existe no Google Drive e no painel_gestor (08/11/2026), anonimizado."
---

Projeto: [[Corpo Feliz - Comunidade]]

# INVENTÁRIO: Laüra Rosa / Efeito Lipo 21D / Corpo Feliz
Levantamento feito em 08/11/2026. Fontes: Google Drive (conta [e-mail]), Supabase `fjlbvoephhextnxemygf.painel_gestor` (somente SELECT) e navegação real no quiz (Playwright, iPhone 13).
Regra seguida: só entra aqui o que foi encontrado, com nome exato, ID ou link e data (data = modifiedTime do Drive). Onde algo não foi verificado, está escrito.

Link de pasta no Drive: `https://drive.google.com/drive/folders/<ID>`. Link de arquivo: `https://drive.google.com/file/d/<ID>/view`.

---

## 0. Alertas antes de usar (confusões encontradas)
1. **A pasta `FOTOS` com imagens novas de 05/11 (WhatsApp) NÃO é da Laura.** Ela fica dentro da pasta `pilates` (19ndLn2JpuMD1VM67vPtJIBaSb_ZVT5fw). No Supabase, `clientes/michele-salla` aponta para essa mesma pasta como `drive` da cliente **Michele Salla** (Quiz Pilates em Casa).
2. **A pasta `Antes e depois` (1K6Naw7ThwmREtrTUt9bNZhGZJbjYWVfm)** pertence a [e-mail] e fica na mesma pasta-mãe da `pilates`, então é provavelmente da Michele e não da Laura.
3. **"Loja da Laura" e "LAURA SEMIJOIAS"** (reunião Alexandre 14/10 e aba do STRACT) são outra cliente, Laura Semijoias. Não é a Laüra Rosa.
4. **"Aline"** nos documentos é a vendedora (WhatsApp/Comunidade). Não achei nada sobre "Aline Pamplona" no Drive (busca por texto vazia).
5. **A pasta `CRIATIVOS EFEITO LIPO (LAURA) · 06-11` só tem 2 documentos.** Os 6 criativos de 06/11 estão hospedados fora do Drive (Vercel), com links dentro do doc LEIA.
6. Os criativos de 06/11 são **pessoas geradas por IA (Gravyx)**. Diz o doc: "Sem antes e depois e sem promessa de quilos."

---

## 1. Pastas principais e arquivos de imagem e vídeo

### 1.1 Criativos novos (novembro/2026)
**CRIATIVOS EFEITO LIPO (LAURA) · 06-11**, pasta `1jo8naij_smqsK2DogcshgxJqJV97uKMJ` (06/11/2026)
- `LEIA · Criativos Efeito Lipo (Laura)`: doc `14djQLYhZLpnM1hd9o09ZyNhV4Fhb0AJl4SDt4b9loag` (06/11)
- `ATUALIZAÇÃO · os vídeos já têm música`: doc `14S0F4kk5XP-jAb422uK4-S9UUqUb_rZhHBqa5b49hms` (06/11)
- Arquivos citados no LEIA (testei, todos respondem HTTP 200):
  - ZIP com os 6: https://clientes-phi-six.vercel.app/laura-rosa/criativos/criativos-efeito-lipo.zip
  - LAURA-CRIATIVO-01.jpg / 02.jpg / 03.jpg e LAURA-VIDEO-01.mp4 / 02.mp4 / 03.mp4, todos em `https://clientes-phi-six.vercel.app/laura-rosa/criativos/`

**Criativos Laüra · desenho animado com voz real (02/11)**, pasta `10uuzRo-b_FJzGv5lxGcTXTa6_slAy9WO` (02/11/2026)
- `Leia: links dos vídeos, falas e legendas`: doc `1JWZ-bCf42fgVabsBNZqDs84DIpnZO1wnlBmxQDFPnXA` (02/11)
- Subpasta `Imagens das cenas · criativo 06` `1w1cfIfkwjjcclQDKIXGVQQVkCmDaD1ui` (03/11), com o doc `Links das imagens · criativo 06` `1M2Kw791B0R40qA3pau0KxSomr8zomhja2Qo1NGnbsdQ`
- 3 vídeos no Supabase Storage (testados, 200): `.../storage/v1/object/public/videos/efeito-lipo/criativos/2026-11-02/`
  - `laura-desenho-voz-real-el07-so-com-a-canetinha.mp4` (27 s)
  - `laura-desenho-voz-real-el09-antes-de-usar-a-canetinha.mp4` (30 s)
  - `laura-desenho-voz-real-el15-a-unica-solucao.mp4` (13 s)
- 8 imagens de cena (864x1536) em `.../2026-11-02/imagens-cenas/`: cena-06-ex-a, ex-b, dedo, sofa, pensativa, janela, celular, tchau (.png). O doc também traz o Figma: https://www.figma.com/design/A0ZHnBGF4d9EfFMynboqvy

### 1.2 Criativos de outubro/2026
**CORPO FELIZ** (pasta-mãe da marca), `16pgDeiianGQVpu6Q8cobVkwXyoU8jgjO`. Subpastas encontradas:
- `CRIATIVOS EFEITO LIPO` `1LI664InjhPL0nDl7iHwQ8v5ozc3CKOC0` (22/10)
  - **31 vídeos** "AD (1).MP4" … "AD (29).mp4", datados de 22/10/2026. AD (24) e AD (25) aparecem 2 vezes (.mp4 e .MP4).
  - **11 imagens** "AD- (1).png" … "AD- (15).png", de 16/09/2026 (exemplos: AD- (1) `1J3FdN0iDyb1rE0jEMrK2TpsijwUDYxnZ`, AD- (2) `1YHQ5gCU26V1n0fLGaqp0hs_MdQIV4v6P`)
  - Subpasta `NÃO PASSARAM` `1e1Fe3bdCe9i4jk0-3hLAQppVpMxFinmJ` (05/11), com: AD (18).mp4, AD (23).mp4, AD- (10) a AD- (13).png e "Já fiz cocô 1.MP4" `1bIDFGvBoCkINPNqmtghwLdh_w8hd6rtU`
- `ANUNCIOS PRONTOS 14-10` `1V3utyB5zfL3RQRRMKW4_rqRVNxhSSvEp` (14/10)
  - 12 vídeos H1_V2_F1/F2, H1_V4_F1/F2, H2_V1_F1/F2, H2_V3_F1/F2, H3_V3_F1/F2, H3_V5_F1/F2 (.mp4, 14/10)
  - Subpasta `LOTE 2 - ESTILO CAMPEAO (100 videos)` `1kN4Mxw6yDLXDibENhgNKSGubaf7t0pPh` (conteúdo não listado)
- `VIDEOS SEM EDIÇÃO` `1P7P07kPHFqKYsFjBiyu5nsfE-QXjSi9w` (31/10): VD - LAURA.MOV, VD - LAURA2 a LAURA5.MOV (14/10)
- `LAURA FOTOS` `1ChIk_KPyndvVcJ9FWoBPKeUYkZDzkTO2` (16/09), conteúdo não listado
- `LAURA IA CLAUDE` `10KpvJsEZsSbHWWKr1LjtmzynlPnclgdG` (08/10)
- `CRIATIVOS` `10zG5RCVKS6xvtYu5AI0kSmIuvLAaDRvp` (17/03/2025)
- `[Quarta 3] - bastidores + o porquê` `1JsLxmnuooI0BETgxLLZn4i2TmaG97ro3` (01/09/2026): ver 1.3
- `LOGO CORPO FELIZ` `10N8DUNzaqevt_ueZqMs_HIeWz_cAmlR4`

**Pasta solta `1KQ4SV9ATVpKuwffQH_I883FpFAQvD_5A`** (pasta "geral" do gestor, nome não retornado). Itens da Laura:
- `OUTROS LAURA` `14YVIwxdeosPL-7V720X1SPy6KZapu8ZV` (31/10): VD - LAURA a LAURA5.MOV (14/10), Audio Efeito Lipo 21D.mp3 (09/10), Audio Efeito Lipo 21D.m4a.mp4 (21/10), banner-checkout-efeito-lipo.jpg `1W_8TBW1N8BDL1QScqbouQhEow6LRq9YO` (31/10)
- `efeito-lipo-21d-elementos` `1OE62RdPihCMX6TiOHDW_Z7iTdFpyjzaZ` e o .zip `19d3dCyqUS8KygA7aFQTDawGbouKULkNH` (20/10), com 06-laura-rosa-sentada-sorrindo.jpg `14cB5wzKovRNN5V0-7qecmfKF0OMJCMLH`, 12-autoridade-laura-rosa.jpg `1XB_N493BumZY1gx49SSn4zH0UHovKxn3`, 05-kit-efeito-lipo-21d-sem-guia-alimentar-IA.jpg, 07/08-logo-efeito-lipo(.png)
- `FOTOS LAURA` `1hUqNNI6d0i7G4R3xHnuqtmVrt-9y1m7y` (16/09), não listada
- `ANTES DA LAURA.jpg` `1_u5BOnNRFjjnBPcQvu7oE-xjvrM09UPo` (09/05/2026)
- `VD - LAURA` `1KaGOBM9EycGc1jTcrMHF1JtG-dn_bRpB` (14/10)
- `Página de vendas · Efeito Lipo 21D (rascunho montado sobre o Maxxima).png` `1Yzo84Yg8RYwzShPyM8ouhdCyElFfNbLZ` (21/10)
- Capturas de tela: `screencapture-laurarosapersonal-efeito-lipo-21d-antes-2026-10-19…png` `1hGjwbggm8oCYp_gVwiYCAY5tAan6Vdid`, `…-espelho-…pdf` `1wQajsntuDNAGWMMTfn91HO8O8hn9xlgC`, `screencapture-laurarosapersonal-captura-2026-09-28…png` `1ysviVaB_zZNj3BnRdbPEXCF7SIDHMG7v`
- `VSLlibia.MOV` `1TFF8OIYlooDYkTLel9zNPckWIlrm7MdK` (23/10/2026): a VSL da Líbia
- Docs de quiz da Laura: `Quiz Volta ao Eixo — Telas.pdf` `1e26ApvjCocrFkxUG05Wh41qzk52TU4E3` (05/10), `3. Resultado + página final de venda.pdf` `174hLp42buw-L1BO2KCxEg17ueK_B3GeB` (05/10, não lido), `auditoria-de-copy-efeito-lipo-21d.pdf/.html` `13V8Uwwt_BRNqDR3Q1glKX4O9qdVLw9Oq` / `1HVb0n2GzPt8bLIJWvwPJovw6aY8oC3-_` (08/10, não lido)
- `outros` `1_XEYlwfDrbA-OPos2t6dmLnTjPvEaxoK`: Video Laura.mp4 `1d1__t3EHsPuV_-KIqeKwwfaGHEROpNt3`, DIA DO CLIENTE LAURA.png (12/09)
- `PROJETO VERAO` `1QXgB137IJwSLpENxmmgdiBJh2DSKks9A`: LAURA PROVASOCIAL.jpeg `1pPbSWBVXjsVxlNlSf_aMaKlBzGGpBCKh` (28/09)

**Outras**
- `VIDEOS LAURA SEM NADA` `12wEiB6MWG_8_1nYEmVfBaIsxhgQqkEJr` (31/10): a busca não retornou nenhum arquivo dentro
- `Efeito Lipo - Roteiros Reels` `1_O7p4BB8q_i_8D3BnZoQ3kKRoBJLsqyj`: Efeito-Lipo-21D-30-modelos-Reels.pdf `1DZRgn1xZ2cafK-DcTU3An3b-T2J8FfQg`, Efeito-Lipo-21D-5-ganchos-Reels.pdf `1U5nNdaxl3eyojAc0y-6xsrY63DnVahny` (14/10)
- `POSTS LAURA` `1NVXhPw5-jcL_wSsRYIRZETJuQBN9ih9P` (12/06/2026), não listada
- Pastas da própria Laura ([e-mail]): `Fotos Laura ` `1-1QNbpxeh7JfgibUEe-mgRa9ETxIeYGX` (fotos pessoais .HEIC/.PNG de 02–03/2026 e subpasta Momentos), `LAURA 2025` `16vveaPQ2zU-Q-5qHkmpAecbtbsv2-U1d`, `EFEITO LIPO 21D` `1PfWNy_Mqee9PbnNqFI8h4YiZE5CRIJcK` (subpastas `Provas sociais` `1zuCyPvgwPqfX6vymqG-nSwe9tjeg6Hxp` e `CRIATIVOS` `1qA-zVkbgwWISYQQad-NStk_8cY2AVvTW`; a busca não retornou arquivos dentro delas)

### 1.3 Antes e depois / depoimentos: contagem
| Pasta (ID) | Dono / data | Nº de imagens | Observação |
|---|---|---|---|
| CORPO FELIZ › **ANTES E DEPOIS** `1C-Co89bkh3WSesQ-cvJ-_RJ4idX91KH0` | patrik + laurafsrosa, até 07/09/2026 | **43** | Nomeadas: [aluna].jpeg `1yXW_rMKVcAYIm_5_G5f32BPowikeHBbX`, MARI.jpeg `19mbSu67sCZomf4FXNRa9GSUcRuoxOajH`, [aluna].jpg `1pwtT8gb9tEHc4fPlA6cxK3rbSaQKGkoO`, "Laura - 34 anos - treino em casa.jpg" `1n2K4zDeTfuJmm7L35yd5-yHFTplMpgVk`, "[aluna], mãe e enfermeira noturna.png" `1TfSVGP34iSU0_7wxeqNTluq8QG9tk6-P`, "Larissa -35+ e mae.png" `1QLFP-Ed737Z5drB_AFIS6rays6JSHdlY`, "Vitoria - 35+ e mãe.PNG" `1Ju5NcudgCRx4X965lreyCkTWjs9OpxSy`. As outras 36 têm nome genérico (IMG_xxxx, UUID, share_image_generated) e o conteúdo não foi aberto |
| **02_Foto-Antes-Depois** `1MNF6QKXMFZfpCBuxgmFLHBfiv5JoChGr` | 24/02 a 17/05/2026 | **25** | "Depoimento …": [aluna] 35 anos, [dado de saúde omitido]; [aluna] mãe de 3 e vó; [aluna] 35; [aluna] 34; [aluna] 43; [aluna] 30; [aluna]; [aluna] 30 (mãe de 2, confeiteira); [aluna] 34 (mãe, trabalha fora); [aluna] "Resultado em 7 dias" `1UMCaNj2rcsPk7F1baeDSdJYC5Qs56yIn`; [aluna] (2); [aluna]; [aluna] 27 [dado pessoal omitido]. Mais: "Antes e Depois Laura.jpeg" `1soGs61qTFFI2Mt6ulgeunbVhqSDEyVyU`, "Antes e depois [aluna]" `1KVFzstP2FF9qhkrLfBnalHRBxg_coOwa`, "Antes e depois [aluna]" `15shlkDGlruJ_4ZcjfrXjA_X0DpVYdcdC`, 5× "Cópia de Depoimento-VSL…", IMG_9786, F311BB85, 1 WhatsApp |
| **02_Foto-Antes-Depois** `14ckeRPSegSsueDFg9jP0kmXMtOUUUBjI` | 09/05/2026 | **33** | Quase tudo "Cópia de …" (duplica outras pastas), 9 cópias de "Depoimento-VSL" |
| **Antes e Depois** `11kwaPsU-5Zg5N2dsxrBanJxJkYi8CvlM` | 27/11/2025 | **30** | Tudo "Cópia de …" |
| CORPO FELIZ › Joao Webdesing › **ANTES E DEPOIS** `10lZF-E5ZZEPjIAmMqKqSQ0r6SHm0xxsT` | laurafsrosa, 18/08/2025 | **5** | [aluna].jpg `17KoioiIQ6KPd5Ea8A0h5U9LpPDbY3zpj`, KELLY.jpg, LIDIANE, LAURA EU `11vQ1btC1xZ0C0BCUjVo_FiWePq07FPmY`, PAT.jpg |
| **[Quarta 3] - bastidores + o porquê** `1JsLxmnuooI0BETgxLLZn4i2TmaG97ro3` | 01–02/09/2026 | 9 + subpastas | 4 "[Quarta 3]…jpeg", "LIPEDEMA - quarta 3…jpeg", 3 "Cópia de 1/2/3", Mariana; subpasta `PROVA SOCIAL + REFORÇO` `1qnN9asrDJyfzQggWS_QSpmQDlBraOBp1` (1 imagem: MarianaPROVA SOCIAL…jpeg) e `[Quarta] - As transformações` `1O6ikcyRnZ_uEoDv8WNIbwDiuITrXmDJj` (não listada) |
| **ANTES X DEPOIS 7 dias** `1cYNOabPTy9TbMjAtP6idUN1-3vBPwAqD` | laurafsrosa, 05/2025 | 0 imagens vistas | Subpastas `DEPOIMENTOS` `17a9vqplxFjEIOqp8GqaX4gUv_moz3tg2` (busca não retornou arquivos) e `VÍDEO DA PÁGINA` (1 vídeo "Página de obrigada" `1cpA9cJrIdlmTLQvt7s2-CnHGaI2TAEQ0`, 30/04/2025) |
| **ANTES E DEPOIS 2025** `1rVzNGgqvhljz2S1JOOduQaftxcD821RE` | laurafsrosa, 27/11/2025 | 0 vistas | A busca não retornou nada dentro |
| ~~Antes e depois~~ `1K6Naw7ThwmREtrTUt9bNZhGZJbjYWVfm` | michelesalla | 7 | **Provavelmente Michele Salla, não Laura** |

**Total nas pastas da Laura: cerca de 145 arquivos de antes/depois e depoimento (43+25+33+30+5+9), com muita duplicata ("Cópia de").** Não fiz a contagem de imagens únicas.

**No site, em uso hoje:** a oferta final do quiz mostra 6 depoimentos servidos de `laurarosapersonal.com/images/`: "Depoimento [aluna] Resultado em 7 dias.jpg", "Depoimento [aluna] 34 anos mãe e trabalha fora de casa.jpeg", "Depoimento [aluna] 30 anos, mãe de 2 e confeitera.jpeg", "Depoimento [aluna] 43 anos mãe.jpeg", "Depoimento [aluna] 35 anos mãe e enfermeira noturna.jpg", "Depoimento [aluna] 34 anos.jpg". A página efeitolipo.com.br/c usa depoimento-[aluna]/[aluna]/[aluna]/[aluna].jpg e `laura-antes-depois.jpg`.

**O que o doc BLACK 2026 diz sobre as fotos (texto da Laura, não verificado):** [aluna] "eliminou 12kg… em apenas 4 meses treinando 4x na semana"; "Musa Mari, aos 46 anos… em apenas 60 dias"; "Musa [aluna], mamãe atípica, confeiteira e em apenas 2 meses… -10kg".

---

## 2. Documentos lidos e o que dizem

### LEIA · Criativos Efeito Lipo (Laura), 06/11/2026
- Destinos: "**21D Antes:** https://www.laurarosapersonal.com/efeito-lipo-21d/antes (está com teste de preço 37 × 27, por isso nenhum criativo mostra preço)" e "**Página C do site:** https://efeitolipo.com.br/c".
- Frases aprovadas: "Antes de partir para a canetinha", "Começa na segunda e desiste na quarta?", "Nem toda barriga é só gordura: parte pode ser inchaço", "Não é preguiça, é falta de direcionamento", "Ative o Efeito Lipo". E também: "**Nenhum fala em teste ou quiz.**"
- Como subir: "anúncio sem texto principal e sem título; nome do anúncio = nome do arquivo". UTM: `utm_source=FB&utm_medium={{placement}}&utm_campaign={{campaign.name}}&utm_content={{ad.name}}&utm_term={{adset.id}}`.
- "As pessoas das imagens e dos vídeos são ilustrativas, geradas por IA (Gravyx). Sem antes e depois e sem promessa de quilos."

### ATUALIZAÇÃO · os vídeos já têm música, 06/11
"os 3 vídeos (LAURA VIDEO 01 a 03) agora têm uma música instrumental própria, feita no ElevenLabs… Não precisa colocar música do Meta."

### Leia: links dos vídeos, falas e legendas, 02/11
- Desenho animado com a voz real da Laüra, tirada dos anúncios antigos EL07, EL09 e EL15, "sem os trechos de promessa ('acaba com a gordura', 'a barriga foi embora', 'eu te garanto', 'disponível por pouco tempo', 'é baratinho')".
- Destino: /efeito-lipo-21d/antes. Ganchos: "Não tem jeito, só com a canetinha que essa barriga some." / "Antes de usar a canetinha, experimenta o Efeito Lipo 21D" / "Você também acha que a canetinha é a única solução…?"

### Links das imagens · criativo 06, 03/11
8 cenas PNG no Supabase (lista na seção 1.1), mais o Figma.

### LR_2026_06_03_Copy-Quiz-Efeito-Lipo, `1GTFrZQKHN7UzJmS2i55bnUXvIp3qelUkyWhttDhx9ew` (03/06/2026, pasta 03_Quiz)
Primeira copy do quiz: "**26 telas · copy tela a tela**". Landing: "O segredo que as blogueiras e atrizes estão usando para secar a barriga…" e "queimar até 8kg de gordura em 21 dias". Tela 9 com grid de antes/depois ([aluna], [aluna], [aluna], [aluna]); resultado "94%" e "até 8kg"; oferta "R$ 37 · Ou 5x de R$ 8,19" com bônus Queima Hormonal e Anti-Pelanquinha; "Garantia de 21 dias". **O quiz no ar hoje deriva desta copy, mas sem "8kg" e sem o "94%".**

### Quiz Volta ao Eixo — Telas.pdf, 05/10/2026
Versão "Comunidade Corpo Feliz · mulheres de 35 a 50 anos": "Você começa toda segunda e na sexta já saiu do plano?"; perfil "A RECOMEÇADORA DE SEGUNDA"; oferta "DESAFIO VOLTA AO EIXO 7D R$ 27"; "É garantia de satisfação, não de resultado físico."

### Análise estratégica da Profe Laura Rosa, `1Sr8xPdoxEpWpN7YmIO5YzVgR-6x1gUEAfngKOWv4S0o` (03/10/2026)
- Números: "243 mil seguidores", "mais de 30 mil leads", "aproximadamente 15 leads por dia", "Efeito Lipo 21D por R$ 37", "Comunidade Corpo Feliz por R$ 479".
- "A promessa 'eliminar até 8 kg em 21 dias' é muito arriscada": "Pode gerar reprovação em anúncios e desconfiança da audiência."
- Mensagem central sugerida: "Uma mulher com rotina real pode transformar o corpo sem viver em restrição extrema…"
- Também: "Evitar apenas publicar antes e depois sem contexto." E "O LTV informado de R$ 250 não combina com um produto principal vendido por R$ 479."

### BLACK 2026 CORPO FELIZ, `1rD5jQrG-bvKbXQcw5Jw7OlTrjc8pmueXRw5ioBkmVoY` (19/10/2026)
Roteiro de grupo VIP para a Comunidade: "R$297 À VISTA OU 12x de R$ 24,75" (de "R$2.370"), link https://payfast.greenn.com.br/78187/offer/M3DUOL. Usa as fotos da [aluna], Mari e [aluna] (links para arquivos das pastas de antes/depois).

### Reunião Millena, 04/11/2026 (anotações do Gemini), `1Vc2sfomfonQy-3n-bL68rmNUM-VdO39H3yWS2YqlX8E`
É da cliente Millena, mas traz dados de Líbia e de quiz:
- "a operação de Líbia faturou R$ 1 milhão no mês anterior com investimento diário de R$ 2.500 e retorno de investimento de 3".
- "estrutura do quiz de Líbia contendo uma carta de vendas em vídeo (VSL) integrada a 15 perguntas".
- "taxa de conclusão do quiz está em 23%, um índice considerado satisfatório" e "61% de 'falsa magra'" (do quiz da Millena).
- Regra: "trinta criativos em lotes semanais de dez unidades antes do descarte da promessa". Concorrentes para modelar: "Cantarelli, Breno, Pedro Lotes e Líbia". Sobre Aline: "Aline não continuará na função no próximo mês".
- Sobre a Laura: "terceirizou o serviço [edição de vídeo] por R$ 150 com excelentes resultados".

### Reunião Alexandre, 14/10 (Gemini)
A "Loja da Laura" é a Laura Semijoias. A parte do quiz: "pixel havia sido desativado devido a uma duplicação na atualização recente do sistema de quiz" (sem dizer de qual cliente).

### Reunião 05/10/2026 (Gemini), `1Uld1BwvbK4AKbcuHcCk4UzhGJX-6x5L4-pfXpelV8eM`
Encontro com alunas da Comunidade. Relatos: [aluna] "7 meses no programa"; [aluna], 1º mês, "redução da flacidez, coxas tonificadas, abdômen mais firme". Site citado: www.tecorpofeliz.com.br.

### STRACT 2026 FACEBOOK, `1ANPae3Ej1JDWpLb3aBxsByGwxfdKaB8cdW36xGRT6Mw` (08/11/2026)
Só a estrutura. Abas: LIBIA (A1:O736), LIBIA C3, LIBIA C2, **CORPO FELIZ (A1:N463, conta "CA - Pagina de vendas EFEITOLIP…", desde 2025-06-13)**, MILLENA, ARPAL, CENTRAL DOS CABELOS, LAURA SEMIJOIAS, BRAND SHOP, SCHEROON, BEBELA JEANS, PANELA DE FERRO FUNDIDO, AURIITA, Tunes, TODOS. Colunas: Account Name, Date, Spend, Link Clicks, Messaging Conversations, Add To Cart, Initiated Checkout, Purchase, Cost per Messaging, CPC, CPM, CTR, Landing Page View, Purchase Value, Impressions. **Não somei os totais da aba CORPO FELIZ** (a ferramenta só devolveu a amostra).

### resultados_xquiz_2026_03_04_11_45_22_laura.csv, `1W1fYJoJfGpA57k6IoXVI7gdvWc_1hZQh` (04/03/2026)
Respostas de um quiz antigo da Laura (xquiz), de 04/03/2026. Opções vistas: "Estou insatisfeita com o espelho", "Me sinto travada, sem disposição", "30 a 50 Anos", "PERDER PESO", "Gordura na barriga", "Braços flácidos", "Falta de motivação", "REDUZIR A BARRIGA", "MENOS INCHAÇO". As campanhas tinham nomes como "QUIZ 3 - 23/02", "09/03 - ST3".

### Análises de concorrentes
- `[LR] Análise de Concorrência` `1G5X0vr-CDJR0CZrcL87GhJ1ZBjLsRbNioqDxLBTjivg` (15/12/2025). Concorrentes analisados: Taymila Miranda, Carol Borba, Just Coco, Lesi Fit, [aluna] Bahia (Crew), Mamãe Sarada, Mad Muscles, WeRise. Ação 4: "Implementar QUIZ de alta conversão… Mad Muscles e WeRise convertem muito bem com quiz." Meta: "elevar o faturamento de R$ 75 mil/mês… para R$ 185 mil/mês".
- Relacionados, não lidos: `EST_2025-12-15_Analise-de-Concorrencia-e-Posicionamento_v01` `1RItfMVoKnlSsrz_neWhKZzIij3EL57FxJZBm6WV3044`; `Laura Rosa | Análise de Concorrência + Público Alvo - 2025/12/15` (Gemini) `1AUdbFF7ePVcFSDFXokW6nxUIebPz6dqLke2KOpKflYk`; `LR_Guia-Marketing-Efeito-Lipo` `1lrNsPmXN7xej_M353ELG3AwHVvKq_6SJh8V0Gfj1j6o`; `2026-06-24_LR_Efeito-Lipo_Anuncios-Roteiros` `19YVv80z_HcHPz7BJgs_f7jRrkXuoU1mOkMNITNVn7VY`; `EFEITO LIPO COMPARAÇÃO` `1CyHjH4a7s0FC9kxnz2nU8z_-6tPOXn21_PLZ6BOkRpY`; `Revisão de Funil_Patrick Gonzaga_VF` (2 versões, 10/2025).
- **Líbia** (não lidos): PLANILHA LIBIA `1R3WrPpHvvplPPpVHTjs641GihW5oWA5GrIbn4eLlO6g` (01/11/2026), pasta `Novos Criativos | Libia` `1Qurpfp9NMt7VqaD8xZAKGARkjeEd23iu` (29/10), PLANILHA DE TRAFEGO | LIBIA `1HqoSVHm6QO7rNyEaV9ziF56QSMYZaVsIoB0TtEFRmog`, VSLlibia.MOV.
- **Pilates (Michele, não é Laura):** `LEIA · Criativos e roteiros da Michele` `1U7s9kKwDtl7TEK9P07DDiJlW1cP-yXQdX1AZbBZ5gfg` (06/11). Quiz https://quiz.michelesalla.com.br/ "sorteia as 5 promessas, 20% cada".

---

## 3. Supabase `painel_gestor`: relatórios e análises
Coleções que existem: analise(1), analises(29), avisos_venda, chat(45), cliente_abandonos(340), cliente_acoes, cliente_campanhas(2), cliente_chat, cliente_fontes, cliente_meses, cliente_meta_dia, cliente_metricas(2), cliente_paginas(2), cliente_pedidos(41), cliente_relatorios(2), cliente_saldo, cliente_vendas(38866), clientes(2: libia, michele-salla), config(3), criativos_analise(129), envio_grupo, propostas(20), ptk_agente, referencias, referencias_pecas(4), roteiros(5), status, verificacao.

**analises/ (diárias, de 08/10 a 07/11/2026) = funil Efeito Lipo da Laura (quiz, depois página).** Destaques:
- 08/10: "primeira venda do quiz novo… só 17% passam da 1ª tela hoje (régua 32%)… Dos 9 que passam, 6 chegam ao resultado (67%)".
- 10/10: "a 1ª tela subiu para 34%… Piorou: só 10% clicam em comprar (régua 18,7%)".
- 21/10: "205 sessões reais e 13 vendas; 35% passaram da T1 e 23% clicaram em comprar". Melhor conjunto: "DATA 13/10 — 3 (R$ 13,77 por venda)".
- 02/11: "R$ 604 gastos, 363 visitas, 15 vendas, custo por venda R$ 40 (régua R$ 37)"; o teste 08 fez 4 vendas com R$ 26, "mas o Meta reprovou o T08".
- 03/11: "R$ 404,92, 14 vendas, custo por venda R$ 28,92".
- analise/atual (07/11): "Nenhuma campanha ativa no Meta e R$ 0 gasto ontem. As visitas na página caíram de 362 (01/11) para 110 (06/11)… religar é decisão do Patrik."

**propostas/ (decisões tomadas):**
- `p-2026-10-08-quiz-t1-botao`: botão da T1 subiu e "a foto de antes e depois saiu" (motivo: "não combina com os anúncios (Laura, sem antes e depois)"). PR #12 em github.com/patrikgonzaga2-tech/LR_LauraRosaPersonal.
- `p-2026-10-09-t1-b-recomeco`: teste A/B do título da T1; "Só 29% dos que abrem o quiz clicam em começar: é o maior vazamento."
- `quiz-t26-duas-opcoes-20261009`: "Outubro até 09/10: low ticket R$ 277 líquido x Comunidade R$ 6.349 líquido (Aline)"; "22 pessoas responderam o maior medo desde 08/10: 10 = 'gastar e não ter resultado'"; "a mensal de R$ 97 dura em média 1,3 mês"; Comunidade anual "R$ 297 = 12x R$ 24,75 (M3DUOL)".

**config/aprendizados (o que o Patrik recusou):** recuperação de Pix pelo WhatsApp (recusada 2×); criativos "foto da Laura sorrindo + frase sobre 'método'" (K e L); remarketing em vídeo da Laura.

**referencias/atual (09/10):** "O 'pare de fazer só cardio' alcançou 167 mil pessoas e foi salvo 5.651 vezes: é o gancho mais forte da Laura." E: "quem tem 50+ é a faixa que mais chega ao fim" do quiz. Benchmarks de quiz: Método Seca em 30 (555 dias no ar), Acessoria On-line ("Descubra seu treino ideal em 2 minutos"), Pedro Lotz (168 versões).

**criativos_analise:** 129 anúncios. Com venda no d30 só aparecem "A SEGUNDA-SEXTA · FEED" e "POST 3 PILARES · 7896" (1 venda cada, campanha QUIZ VOLTA AO EIXO 08/10). O anúncio 18029278661850078 "Foi o que mais vendeu: 2 vendas a R$ 29,60… em 30/09".

**Líbia (cliente_relatorios, 04/11):** "Investido em anúncios: R$ 3.738,32 · Vendas na Hotmart: 296 · R$ 11.223,25 (líquido R$ 9.815,11)", referente ao mês atual. Regra em clientes/libia: "CONJUNTO COM 24HRS RODANDO E ROI 2, AUMENTA 20% POR DIA, SE CAIU EM 3 DIAS ABAIXO DE 1.2 DE ROI, DESLIGA".

---

## 4. Quiz atual da Laura (navegado em 08/11/2026, iPhone 13)
- **URL:** https://www.laurarosapersonal.com/efeito-lipo-quiz . A home https://www.laurarosapersonal.com/ cai nesse mesmo quiz. Testei e dão 404: /quiz, efeitolipo.com.br/quiz, /volta-ao-eixo, /captura.
- Título da página: "Quiz Efeito Lipo — sua barriga é gordura ou inchaço?". O HTML tem um segundo título de capa ("Ative o Efeito Lipo: barriga menos estufada na 1ª semana e mais seca em 21 dias."), o que indica teste A/B na capa. Nas 3 visitas vi sempre a versão abaixo.
- Screenshots: `quiz-00.png` a `quiz-23.png` (respostas = 1ª opção), `quizhome-*.png` (3ª opção) e `quizimg-*.png` (2ª opção), nesta pasta. Texto bruto em `quiz-steps.txt` e nos `*-log.json`.

**Tela 0 (capa):** "Teste gratuito · 2 minutos · resultado na hora / Efeito Lipo sem agulha: descubra se a sua barriga é gordura ou inchaço. / Teste grátis de 2 minutos. No final, o roteiro de 21 dias para desinchar na 1ª semana, com 15 minutos por dia em casa. / [Fazer o teste grátis] ✓ Leva cerca de 2 minutos ✓ Sem academia e sem dieta radical ✓ Você recebe o perfil e o primeiro passo no final". Foto: Laura-Arrumada-hero.jpg.

1. **Qual a sua faixa etária?** Menos de 29 anos · Entre 29 e 39 anos · Entre 40 e 49 anos · 50 anos ou mais
2. **Qual é o seu principal objetivo agora?** Secar a barriga de vez · Caber naquela roupa especial · Afinar os braços · Recuperar minha autoestima · Tudo acima
3. **Quantas vezes você já recomeçou?** Uma ou duas vezes · Várias vezes · Já perdi a conta · Ainda estou tentando começar
4. **Como é a sua rotina hoje?** Super corrida, mal tenho tempo pra mim · Equilibrada mas sem sobra · Fico em casa mas nunca sobra tempo · Tenho tempo para me dedicar
5. **Você já pensou em usar Ozempic, Mounjaro ou alguma canetinha emagrecedora?** Sim, já usei · Sim, estou usando · Sim, estou considerando · Pensei mas decidi não usar · Nunca considerei
6. **Como você descreveria seu corpo hoje?** (avatares) Bem de peso, mas inchada e sem definição · Levemente acima do peso · Acima do peso · Muito acima do peso
7. **Qual é o corpo que você quer ter?** Seca e definida · Barriga lisa e braços finos · Com curvas e sem inchaço · Leve — me sentir bem no meu corpo
8. **Como você descreveria a sua alimentação hoje?** Tento comer bem, mas acabo exagerando · Faço dieta, mas não vejo resultado · Como de tudo sem muito controle · Completamente desorganizada
9. **Qual é o seu maior sabotador?** Doce e chocolate · Pão, massa e carboidrato · Ansiedade e estresse · Belisco à noite · Delivery e fast food
10. **Em que dia da semana fica mais difícil manter sua rotina?** Segunda · Terça · Quarta · Quinta · Sexta · Fim de semana · Não tem um dia fixo
11. **Como anda seu sono e seu inchaço?** Durmo mal e acordo cansada · Durmo ok, mas acordo inchada · Durmo bem, mas sem energia · Sono bom e energia ok
12. **(educativa) "Talvez você se reconheça neste ciclo"**: SEGUNDA / QUARTA / FIM DE SEMANA / DOMINGO À NOITE e "O Efeito Lipo propõe começar com uma rotina de treinos em casa e foco em desinchar a barriga que não sai — sem dieta maluca…". Botões: Faz sentido — nunca tinha pensado assim · É novidade pra mim — quero entender melhor
13. **(loading)** "Analisando suas respostas…" / "Vendo se a sua barriga é mais gordura ou inchaço…"
14. **Qual é o seu maior medo em relação a emagrecer?** Medo de não conseguir de novo · Medo de não ter tempo · Medo de gastar e não ter resultado · Medo de passar fome · Medo do efeito rebote
15. **Se você acordasse amanhã no corpo que sempre sonhou, qual seria o seu primeiro pensamento?** "Finalmente me sinto bonita de verdade" · "Vou usar aquela roupa…" · "Não vou ter vergonha de colocar biquíni" · "Vou querer tirar foto em tudo que é lugar" · "Consegui. Eu sabia que era capaz"
16. **Qual região do seu corpo te incomoda mais?** (múltipla) Barriga e inchaço abdominal · Braços · Cintura e laterais · Quadril e coxas · Corpo inteiro · Não tenho queixa específica
17. **Quanto tempo você consegue dedicar ao seu corpo por dia?** 10 a 15 min · 15 a 20 min · 20 a 30 min · Mais de 30 min
18. **O que te fez chegar até aqui hoje?** (múltipla) Me sentir confiante… · Voltar a usar as roupas… · Ter mais saúde e energia… · Parar de me esconder nas fotos · Provar pra mim mesma que consigo
19. **Qual é a sua altura?** (cm)  20. **Qual é o seu peso atual?** (kg)
21. **(loading)** "Montando o seu roteiro Efeito Lipo…"
22. **Resultado:** "SUA BARRIGA HOJE" tem 3 leituras vistas: "Mais inchaço do que gordura" / "Mais gordura acumulada do que inchaço" / "Inchaço e gordura juntos". "SEU PERFIL DE RECOMEÇO" tem 3 perfis vistos: "A Sem Tempo" / "A Emocional" / "A Tudo ou Nada". Jornada Dia 01 → 21: "Um roteiro de 21 dias — não uma promessa de resultado." Botão "Ver como começar hoje".
23. **Oferta:** "Seu Efeito Lipo 21D está pronto. Comece hoje. No dia 7, meça e veja se está funcionando para você." Bloco personalizado (barriga, perfil, medo). Tabela ANTES/DEPOIS (textual). "Resultados reais de alunas · 7 dias" (6 fotos de depoimento: [aluna], [aluna], [aluna], [aluna], [aluna], [aluna]). Preço **"R$ 37 uma vez só · Sem mensalidade · R$ 1,76 por dia… · Pix ou cartão · ou 12x de R$ 3,80"**. "Menos que uma consulta com nutricionista (R$ 150). Muito menos que um mês de canetinha (R$ 500+)."
   Entregáveis: "Roteiro de 21 dias em 3 fases: Limpeza, Ativação e Queima Total · 21 treinos de 15 minutos, em casa, sem equipamento · Módulo Comece por Aqui + autoavaliação inicial e final · Áudios 'Quebra de Sabotagem'… · Planner de Progresso… · Bônus: aula do Ciclo Menstrual e e-book Anti-Pelanquinha".
   Garantia: "Risco zero: se em 7 dias você não sentir o corpo menos inchado, devolvemos seus R$ 37." Prova: "Mais de 3.500 mulheres já fizeram o Efeito Lipo". Acesso de 45 dias. O FAQ indica a Comunidade Corpo Feliz como próximo passo.
   **Checkout:** https://payfast.greenn.com.br/redirect/297430?utm_source=efeito-lipo-quiz (Greenn).
   **Inconsistência no texto do site:** o bloco de garantia fala em **7 dias**, mas duas respostas do FAQ falam em **21 dias** ("E tem a garantia de 21 dias…" / "Você tem 21 dias, contados da compra").
- Outras páginas no ar: /efeito-lipo-21d e /efeito-lipo-21d/antes (checkout Hotmart `pay.hotmart.com/J105938667T?off=vf9p3mhg…`), /efeito-lipo-21d/espelho, efeitolipo.com.br/a, /b, /c (Hotmart J105938667T, sck efeitolipo-site-c).
