---
type: referencia
title: "Comunidade - verificação do funil com funnel-spy (09-11)"
project: "Corpo Feliz - Comunidade"
tags: [tipo/referencia, projeto/corpo-feliz-comunidade, funil, auditoria, funnel-spy, garantia, rastreio]
keywords: [funnel-spy, verificação, walk, placar, promessa x entrega, garantia, og tags, obrigado, greenn, scorecard]
created: 2026-11-09
updated: 2026-11-09
summary: "Caminhada ao vivo no funil da Comunidade (quiz, página, checkout, pós-compra) com o método da skill funnel-spy: pilha, escada, promessa x entrega das 8 promessas, placar 27/100 e furos priorizados. Achados novos: garantia 15 (site) x 7 (Greenn), preço 39,90 x 39,92, prévia de compartilhamento com a promessa do Efeito Lipo, sem obrigado da Comunidade. Só leitura."
---

Projeto: [[Corpo Feliz - Comunidade]] · Antes: [[Comunidade - conferência do funil, promessas e reveal (09-11)]], [[Comunidade - funis do mercado escalado: Floripa, Polly, Paula, Zanon, Queima (09-11)]], [[Comunidade - upsell e downsell: base, mercado e checagem (09-11)]]

Relatório visual (privado): https://claude.ai/artifact/Y9AwpRTgGRiD3iAwS8mUgf

# Verificação do funil com funnel-spy (09/11/2026)
Pedido do Patrik: verificar o funil completo, "quero saber tudo", buscar no GitHub uma skill que ajude a desmembrar.

## Skill
**Mahanaicoach/funnel-spy** (MIT; só markdown e um script local de PDF; sem envio de dados) usada em pasta isolada da sessão, **não instalada** em repositório. Mais cedo (09/11) só o método dela tinha sido adotado; agora foi aplicada. De **hyojinmo/funnel-consistency** (MIT) só a ideia de promessa x entrega por passo. Descartadas: hawk4747/funnel-spy (exige chaves pagas Apify/Firecrawl/Gemini e envia dados a terceiros), bosar-academy/cc-funnel-spy (sem licença, redundante), ad-landing-page-audit (e-commerce).
Limite: caminhada feita de IP dos EUA (checkout abriu em inglês e dólar); preço em reais lido pela API pública da oferta (país BR). Anúncios na Meta não consultados nesta rodada.

## Achados novos (CONFIRMADO ao vivo, salvo indicação)
1. **Garantia:** site e quiz dizem 15 dias (6 lugares); a API pública da oferta yaG6FL traz **warranty = 7 dias**; o roteiro v3 também diz 7. As notas de 08/11 diziam "15 dias conferida na Greenn". **Conferir na Greenn qual vale** (texto de garantia: só com OK do Patrik).
2. **Preço:** site R$ 39,90; nome e valor da oferta na Greenn R$ 39,92 (inclusive na aba do checkout). A conferir.
3. **Prévia de compartilhamento:** `og:title`, `og:description` e twitter do quiz e da página são do Efeito Lipo ("Em apenas 21 dias, perca até 8KG… sem canetinhas caras"); sem `og:image`. Mostra promessa de peso e prazo ao compartilhar o link.
4. **Sem obrigado da Comunidade:** a yaG6FL não tem `thank_you_page` nem redirecionamento; o sucesso é um modal no checkout. Os pós-compra existentes (`/acesso-liberado`, `/acompanhamento-up`, `/acompanhamento-mensal`) são do Efeito Lipo.
5. **Vídeo falso** na página: quadro preto "Vídeo da Laüra (em gravação)" com play que não faz nada (0 players), e os subtítulos mandam "Assista".
6. **Escada de 1 degrau:** mensal R$ 39,90, sem bump, upsell ou downsell; `/comunidade-upsell` e `/comunidade-downsell` dão 404. O produto 148344 tem 55 ofertas antigas na Greenn; só a yaG6FL é usada.

## Caminhada e máquina
Quiz: 17 telas depois da capa (18 com o resultado), sem pedir nome nem e-mail, 2 a 3 min (inferido), carga de 1,4 a 1,8 s; resultado igual nas 4 capas. Página: 8 blocos, ~8.000 px no celular, abre inteira. Checkout Greenn de 1 etapa (nome, e-mail, celular, CPF, cartão e Pix), sem bump e sem texto de garantia. Celular: 0 rolagem horizontal, 0 texto cortado, 0 imagem quebrada.
Rastreio: Next.js na Vercel, GTM-KFQ56MZ7, GA4, Clarity `uerrlg9heo`, pixels LP `28090278990632923` e oficial `944444744178548` (uma vez cada, sem duplicado); no checkout só o pixel LP + GTM (venda confirmada) + servidor stape.io. Beacons `/api/quiz` e `/api/upsell` (o nome "upsell" do medidor da página confunde). Cookies `cq_capa` e `cv_capa`; sorteio das 4 capas funcionou (12 visitas; amostra pequena). UTMs e `sck` chegam à Greenn. `noindex` em tudo. O quiz não leva `sck` e o `utm_content` difere do da página.

## Promessa x entrega (0 a 10, ao vivo)
Quiz p1 8 · p2 4 · p3 4 · p4 7. Página p1 5 · p2 7 · p3 6 · p4 5. O resultado do quiz nunca retoma a capa. p2: a tela "ciclo" é a semana de segunda a domingo, não o ciclo menstrual; "40+" não é opção de nenhuma pergunta de fase. p3: quem marca "Nenhum" em cuidados não recebe nada sobre dor. Página p3: "15 minutos" só no topo. Página p4: nenhum bloco entrega "o plano certo". Fecho fixo "parar de recomeçar" nas 4. Só a p4 é igual no quiz e na página.

## Placar (régua da skill; leitura de fora, não medição)
Atrair 2 · Capturar 8 · Converter 14 · Subir ticket 3 = **27/100** (09/11 anterior: 0/17/12/4 = 33). Capturar caiu porque quiz anônimo não é captura de contato. Mais fraco: Atrair (2); se os anúncios forem confirmados, Subir ticket (3).

## Furos priorizados (nada alterado)
1 garantia 15 x 7 · 2 prévia com promessa do Efeito Lipo · 3 vídeo falso · 4 preço 39,90 x 39,92 · 5 checkout sem garantia visível · 6 sem bump, upsell, downsell e obrigado · 7 quiz promete "plano" e entrega 3 a 4 linhas, resultado ignora a capa · 8 quiz não guarda contato · 9 `sck` e `utm_content` não padronizados · 10 menores (botão Voltar 34 px, links 16 px, "por / mês" quebra, PageView Meta visto em 1 de 3 execuções).

## Para ir ao ar (lista atualizada)
Bloqueiam: decidir o cancelamento do mensal ao aceitar o upsell; criar oferta anual R$ 297 e upsell 1 clique; **conferir garantia (7 ou 15) e preço (39,90 ou 39,92)**; **definir obrigado da yaG6FL**. Antes de anunciar: trocar a prévia de compartilhamento, esconder o vídeo falso ou colocar a VSL, bumps, trimestral em 1 clique, compra de teste. Código só depois do OK; entrada no painel oficial de links no mesmo PR. Evidências (123 capturas) na pasta da sessão, não versionadas.
