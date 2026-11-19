# Millena · teste 33/33/33 das páginas do Desafio Magra Pro Max (19/11/2026)

Cliente: Millena Merlo (BM "Bm 00 Ativa Millena" / "BM Millena"). Site no WordPress da Hostinger (conta própria dela), acesso por senha de aplicativo salva no ambiente.

## Decisão
- Teste de copy com 3 páginas, mesma oferta e mesmo checkout (Greenn `redirect/286218`, R$ 37 à vista ou 12x de R$ 3,08, garantia de 21 dias, mesmos bônus).
- Link único que sorteia 1/3 para cada página e mantém as UTMs: https://desafiomagrapromax.com.br/desafio/ (a página guarda a versão no navegador e acrescenta `pg=v1|v2|v3`).
  1. /desafiomagrapromax/ · ângulo "método antigo × roteiro ao contrário" (VSL no topo, depoimentos escritos)
  2. /desafio-pro-max/ · ângulo "abdominal não escolhe de onde sai a gordura" (sem VSL, depoimentos com foto)
  3. /desafio-pro-max-vsl/ · ângulo "falsa magra e os 7 erros" (página curta em volta da VSL)
- Copy pelo método do Ladeira: M04-06 a 11 (página), M04-01 (VVV), M02-10 (oferta), M02-16 (ancoragem: saiu "valeria R$ 197" e "-85%"), M02-28 (prova: "mais de 7 mil mulheres", número do Patrik), M03-02/03 (premissas), M02-13 (revisão).
- Pixel das 3: Pixel Quiz - Millena (1332309708403614). Botão na VSL (VTurb) aos 3:52, no começo do pitch.

## Pendências / atenção
- A Greenn não recebe a versão da página: hoje a venda por página se mede pelo pixel (URL com `pg=`). Passar a versão para o checkout depende de OK do Patrik (mexe no link de checkout).
- A VSL fala "tratar diástase" e "nas próximas semanas" (promessa de saúde e prazo). Mantida por decisão do Patrik.
- Backups das versões originais como rascunho: `desafiomagrapromax-backup-1911` e `desafio-pro-max-backup-1911`.
- Cache do Elementor não atualiza página editada pela API: para mudar, criar a página nova no slug `-novo`, conferir 200, mandar a antiga para a lixeira e renomear.

## Atualização 19/11 (tarde)
- Imagens novas feitas no Gravyx (530 créditos), sem antes e depois e sem imitar a Millena: bônus 1 (receitas), bônus 2 (7 treinos HIIT), os 2 bônus juntos, balança × fita métrica e treino em casa. Estão na mídia do WordPress (`mpm-*.jpg`).
- Medição por página: o checkout da Greenn recebe `sck` = nome da página (desafiomagrapromax, desafio-pro-max, desafio-pro-max-vsl), sem mexer nas UTMs do anúncio. Testado com clique real nas 3.
- Painel PTK: ficha `clientes/millena` criada (contas 226596429878144 e 216366344310729, domínio desafiomagrapromax.com.br, VSL da VTurb, aba MILLENA do Stract, ticket 37). Medidor `agenciaptk.com.br/ptk/rastreio.js` instalado nas 3 páginas (aba Página). Análise do teste registrada no histórico (cliente_acoes).
- Falta: o Painel PTK não tem receptor de vendas da Greenn (só Hotmart e Guru). Proposta mostrada ao Patrik; depende do OK (regra de pagamento) e de a Millena cadastrar o link na Greenn dela.
- WhatsApp do relatório da ficha ficou em branco (Patrik escolhe).
