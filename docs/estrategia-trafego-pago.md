# Estratégia de Tráfego Pago — MarketPay Commerce

## Resumo Executivo

O objetivo é gerar tráfego qualificado para o site, aumentar cliques nos produtos afiliados (Shopee, Mercado Livre, Amazon) e maximizar comissões. A estratégia usa **produtos aleatórios por categoria** nos anúncios, testa automaticamente quais performam melhor, e escala os vencedores.

---

## 1. Plataformas Recomendadas (por prioridade)

### 1.1 Meta Ads (Facebook + Instagram) — **Prioridade #1**

| Item | Detalhe |
|------|---------|
| **Por que** | Maior base de compradores online no Brasil. Segmentação por interesses muito precisa. |
| **Público ideal** | Mulheres e homens 18-45 anos, compradores online, interessados em ofertas/promoções |
| **Formatos** | **Carrossel** (3-5 produtos da mesma categoria) e **Imagem única** (produto com desconto) |
| **Posicionamento** | Feed do Instagram, Stories, Reels, Feed do Facebook |
| **CTA** | "Ver Oferta" ou "Comprar Agora" |
| **Orçamento inicial** | R$ 20-50/dia por conjunto de anúncios |

**Segmentações sugeridas:**

- **Eletrônicos**: Interesses em tecnologia, smartphones, games, gadgets. Homens 18-35.
- **Moda**: Interesses em moda, compras online, Shopee, fast fashion. Mulheres 18-40.
- **Casa & Decoração**: Interesses em decoração, casa nova, organização. 25-45 anos.
- **Beleza & Saúde**: Interesses em skincare, maquiagem, perfumes. Mulheres 18-40.
- **Esportes**: Interesses em academia, suplementos, fitness. Homens e mulheres 20-40.
- **Games**: Interesses em PlayStation, Xbox, PC gaming. Homens 16-30.

### 1.2 Google Ads — **Prioridade #2**

| Item | Detalhe |
|------|---------|
| **Por que** | Captura demanda ativa (quem já está buscando o produto). Alta intenção de compra. |
| **Público ideal** | Pessoas buscando "melhor preço [produto]", "onde comprar [produto] barato" |
| **Formatos** | **Search Ads** (texto) e **Performance Max** (automático) |
| **Orçamento inicial** | R$ 30-80/dia |

**Campanhas sugeridas:**

1. **Search — Comparação de preços**: Keywords como "melhor preço celular", "oferta notebook", "cupom shopee"
2. **Search — Produtos específicos**: Keywords de produtos populares do site
3. **Performance Max**: Deixar o Google otimizar automaticamente com feed de produtos

**Keywords negativas importantes:** "grátis", "download", "como fazer", "tutorial"

### 1.3 TikTok Ads — **Prioridade #3**

| Item | Detalhe |
|------|---------|
| **Por que** | CPC mais barato, público jovem e engajado, ótimo para descoberta de produtos |
| **Público ideal** | 16-30 anos, compradores impulsivos, interessados em "achadinhos" |
| **Formatos** | **Vídeo curto** (15-30s mostrando produto + preço) e **Spark Ads** (impulsionar posts orgânicos) |
| **Orçamento inicial** | R$ 15-30/dia |

**Dicas de criativos TikTok:**
- Formato "Achei no Mercado Livre por R$ XX" 
- "3 eletrônicos BARATOS que valem a pena"
- "Comparei preços e achei isso..."
- Usar trends de áudio do momento

### 1.4 Pinterest Ads — **Nicho: Casa, Moda, Beleza**

| Item | Detalhe |
|------|---------|
| **Por que** | Público com alta intenção de compra em categorias visuais |
| **Público ideal** | Mulheres 25-45, interessadas em decoração, moda, organização |
| **Formatos** | **Pin estático** (imagem do produto) e **Carrossel** |
| **Orçamento inicial** | R$ 10-20/dia |

---

## 2. Lógica de Seleção de Produtos para Anúncios

### Regras de seleção:
1. **Aleatório por categoria**: cada anúncio mostra produtos de UMA categoria
2. **Priorizar produtos com desconto** (> 15%) — chamam mais atenção
3. **Rotacionar a cada 3-5 dias** para evitar fadiga de anúncio
4. **Nunca repetir o mesmo produto** em anúncios simultâneos

### Script automático:
O script `scripts/generate-ad-products.mjs` gera automaticamente seleções de produtos otimizadas para cada plataforma/categoria.

### URLs de destino:
- **Categoria específica**: `https://marketpaycommerce.com.br/categoria/eletronicos`
- **Busca filtrada**: `https://marketpaycommerce.com.br/busca?q=notebook`
- **Produto direto**: `https://marketpaycommerce.com.br/produto/ml-MLB12345678`

Adicionar parâmetros UTM para rastreio:
```
?utm_source=meta&utm_medium=cpc&utm_campaign=eletronicos_carrossel&utm_content=produto1
```

---

## 3. Segmentações Detalhadas por Plataforma

### Meta Ads — Conjuntos de Público

| Público | Idade | Gênero | Interesses |
|---------|-------|--------|------------|
| Tech Lovers | 18-35 | Masculino | Tecnologia, Smartphones, Mercado Livre, Shopee |
| Fashionistas | 18-40 | Feminino | Moda, Compras online, Shopee, Fast fashion |
| Home & Living | 25-45 | Todos | Decoração, Casa, Organização, Pinterest |
| Beauty Fans | 18-40 | Feminino | Beleza, Skincare, Maquiagem, Perfumes |
| Fitness Crowd | 20-40 | Todos | Academia, Suplementos, Whey, Creatina |
| Gamers | 16-30 | Masculino | PlayStation, Xbox, PC Gaming, Twitch |
| Bargain Hunters | 18-50 | Todos | Cupons, Promoções, Black Friday, Cashback |

### Comportamentos para incluir:
- Compras online nos últimos 30 dias
- Engajamento com anúncios de compras
- Usuários de apps de compras (Shopee, ML, Amazon)

### Lookalike (depois de ter dados):
- Criar público Lookalike 1-3% dos visitantes do site
- Lookalike dos que clicaram em "Comprar"

---

## 4. Estratégia de Testes (A/B Testing)

### Fase 1 — Descoberta (Semana 1-2)
- **Criar 3 conjuntos de anúncios por categoria** (7 categorias = 21 conjuntos)
- **Cada conjunto**: 3-5 produtos aleatórios em carrossel
- **Orçamento**: R$ 20/dia por conjunto (R$ 420/dia total)
- **Métrica principal**: CTR (Click-Through Rate)

### Fase 2 — Otimização (Semana 3-4)
- **Pausar** conjuntos com CTR < 1%
- **Escalar** conjuntos com CTR > 2%
- **Duplicar** os melhores e testar novas variações:
  - Trocar imagem do produto
  - Trocar copy (texto do anúncio)
  - Trocar público-alvo

### Fase 3 — Escala (Semana 5+)
- **Aumentar orçamento 20-30%** nos vencedores a cada 3 dias
- **Criar Lookalike** dos melhores públicos
- **Expandir para novas plataformas** (TikTok, Pinterest)
- **Automatizar rotação de produtos** com o script

### Métricas para acompanhar:

| Métrica | Meta | Onde ver |
|---------|------|---------|
| CTR | > 2% | Meta Ads / Google Ads |
| CPC | < R$ 0.50 | Meta Ads / Google Ads |
| Taxa de clique no produto | > 30% | Google Analytics |
| Comissão por clique | > R$ 0.10 | Dashboard de afiliados |
| ROAS | > 2x | Comparar gasto vs comissão |

---

## 5. Criativos Sugeridos

### Template de copy para Meta/Instagram:

**Carrossel (descoberta):**
> 🔥 Ofertas imperdíveis de hoje!
> Comparamos preços no Mercado Livre, Amazon e Shopee.
> ➡️ Deslize para ver os melhores descontos
> 
> 🛒 Clique e economize até 45%

**Imagem única (produto com desconto):**
> ⚡ [NOME DO PRODUTO]
> De ~~R$ XXX~~ por apenas R$ YYY
> 📦 Frete grátis • ⭐ 4.8 avaliação
> 
> 👉 Ver oferta no [Mercado Livre/Shopee/Amazon]

**TikTok (vídeo):**
> "Achei esse [produto] por R$ XX no Mercado Livre 😱"
> [Mostrar tela do site com o produto]
> "Link na bio ➡️"

### Dicas visuais:
- Fundo branco/limpo para produtos
- Preço grande e visível (fonte laranja/vermelha)
- Badge de desconto "-XX% OFF"
- Logo das lojas (ML, Shopee, Amazon) para confiança

---

## 6. Orçamento Sugerido (Início)

| Plataforma | Diário | Mensal | Foco |
|------------|--------|--------|------|
| Meta Ads | R$ 50 | R$ 1.500 | Descoberta + Retargeting |
| Google Ads | R$ 40 | R$ 1.200 | Busca ativa + Performance Max |
| TikTok Ads | R$ 20 | R$ 600 | Awareness + Tráfego barato |
| **Total** | **R$ 110** | **R$ 3.300** | |

> **ROI esperado**: Com comissão média de 5-10% e ticket médio de R$ 150, cada venda gera ~R$ 10 de comissão. Precisamos de ~330 vendas/mês para cobrir o custo. Com CTR de 2% e taxa de conversão de 1%, precisamos de ~1.650.000 impressões/mês — viável com esse orçamento.

---

## 7. Implementação Técnica

### Pixel do Meta (Facebook):
Adicionar no `<head>` do site para rastrear visitantes e criar públicos.

### Google Tag / GA4:
Já configurar eventos de:
- `page_view` (automático)
- `click_product` (quando clica em "Comprar")
- `view_category` (quando acessa categoria)

### UTM Parameters:
Usar em todos os links de anúncio:
```
?utm_source=[plataforma]&utm_medium=cpc&utm_campaign=[categoria]_[formato]&utm_content=[produto_id]
```

### Script de geração de produtos para anúncios:
Executar `node scripts/generate-ad-products.mjs` para gerar automaticamente listas de produtos por categoria, otimizados para cada plataforma de anúncio.

---

## 8. MISSÃO: 10 Vendas Amazon até fim de Março/2026

### Objetivo
Gerar **10 vendas qualificadas na Amazon** para desbloquear acesso à **PA-API** (Product Advertising API), que permite buscar produtos reais com preços atualizados automaticamente.

### Por que é urgente
- Sem PA-API, os 49 produtos Amazon são curados manualmente (preços podem ficar desatualizados)
- Com PA-API, podemos ter **milhares de produtos Amazon** com dados em tempo real
- A Amazon exige 10 vendas nos últimos 30 dias para liberar a API

### Produtos Amazon com maior chance de conversão

| Produto | Preço | Por que converte |
|---------|-------|-----------------|
| Echo Dot 5ª Geração | R$ 349 | Marca Amazon, ticket acessível, muito buscado |
| Fire TV Stick Lite | R$ 284 | Barato, impulso, todo mundo quer |
| Kindle 11ª Geração | R$ 474 | Presente popular, alta demanda |
| JBL Tune 510BT Fone | R$ 159 | Preço baixo, marca conhecida |
| Havaianas Top | R$ 29,99 | Menor ticket = mais fácil converter |
| Garrafa Stanley 1L | R$ 249 | Trend atual, altíssima demanda |
| O Poder do Hábito | R$ 33,90 | Livro popular, ticket baixo |
| Pai Rico Pai Pobre | R$ 34,90 | Best-seller eterno |

### Plano de ação semanal

#### Semana 1 (23-29 mar): Meta Ads focado em Amazon
1. **Criar 2 campanhas no Meta Ads** focadas APENAS em produtos Amazon:
   - **Campanha 1 — "Achados Amazon"**: Carrossel com Echo Dot + Fire TV + Kindle + JBL
     - Público: Interessados em tecnologia, Amazon, gadgets. 18-40 anos.
     - Orçamento: R$ 20/dia
     - Link: `https://marketpaycommerce.com.br/busca?q=amazon&utm_source=meta&utm_medium=cpc&utm_campaign=amazon_tech`
   - **Campanha 2 — "Livros Best-Seller"**: Carrossel com livros populares
     - Público: Interessados em livros, desenvolvimento pessoal, leitura. 20-45 anos.
     - Orçamento: R$ 10/dia
     - Link: `https://marketpaycommerce.com.br/categoria/livros?utm_source=meta&utm_medium=cpc&utm_campaign=amazon_livros`

2. **Copy sugerida para os anúncios:**
   ```
   Campanha 1 (Tech):
   🔥 Os gadgets mais vendidos da Amazon com desconto!
   📦 Frete grátis em todos
   ✅ Echo Dot por R$ 349 | Fire TV por R$ 284 | Kindle por R$ 474
   👉 Compare preços e economize no MarketPay

   Campanha 2 (Livros):
   📚 Os livros que vão mudar sua vida — a partir de R$ 26,90
   ⭐ Best-sellers com até 46% OFF na Amazon
   🚀 Pai Rico Pai Pobre | O Poder do Hábito | Essencialismo
   👉 Veja todas as ofertas
   ```

#### Semana 2 (30 mar - 5 abr): Otimizar + Orgânico
1. **Pausar** o que não está convertendo (CTR < 1%)
2. **Dobrar orçamento** do que está funcionando
3. **Posts orgânicos** no Instagram/TikTok:
   - "5 gadgets Amazon que valem a pena em 2026"
   - "Livros abaixo de R$ 35 que mudaram minha vida"
   - "Comparei preços: Shopee vs Amazon vs ML"
4. **WhatsApp/Telegram**: compartilhar links dos produtos Amazon com amigos/grupos

#### Semana 3 (6-12 abr): Escalar
1. Se já tiver 5+ vendas: **aumentar orçamento** 50%
2. Adicionar **Google Ads Search** para termos:
   - "echo dot preço"
   - "kindle promoção"
   - "fire tv stick barato"
   - "livros baratos amazon"
3. Considerar **influenciadores micro** (500-5k seguidores) para divulgar

### Orçamento estimado para a missão

| Canal | Diário | 30 dias | Esperado |
|-------|--------|---------|----------|
| Meta Ads (Amazon Tech) | R$ 20 | R$ 600 | 4-6 vendas |
| Meta Ads (Amazon Livros) | R$ 10 | R$ 300 | 3-5 vendas |
| Orgânico (grátis) | R$ 0 | R$ 0 | 1-3 vendas |
| **Total** | **R$ 30** | **R$ 900** | **8-14 vendas** |

### Dicas para maximizar conversão Amazon
1. **Cookie de 24h**: quando alguém clica no seu link, QUALQUER compra na Amazon em 24h gera comissão (não só o produto clicado)
2. **Produtos baratos convertem mais**: livros de R$ 30 convertem 5x mais que eletrônicos de R$ 2.000
3. **Prime Day / Ofertas relâmpago**: ficar atento a promoções da Amazon para impulsionar
4. **Produtos Amazon (marca própria)**: Echo, Kindle, Fire TV têm comissão maior (~8% vs 2-4% geral)

### Links diretos dos produtos Amazon para anúncios

```
Echo Dot:      https://marketpaycommerce.com.br/produto/amz-B0CHX3QBCH
Fire TV Stick: https://marketpaycommerce.com.br/produto/amz-B0BSHF7WHW
Kindle:        https://marketpaycommerce.com.br/produto/amz-B09V3KXJPB
JBL Fone:      https://marketpaycommerce.com.br/produto/amz-B09JQMJHXY
Stanley:       https://marketpaycommerce.com.br/produto/amz-B0CDR9M7TT
Havaianas:     https://marketpaycommerce.com.br/produto/amz-B0CN1M8K3Q
Poder Hábito:  https://marketpaycommerce.com.br/produto/amz-B07PJV3JP6
Pai Rico:      https://marketpaycommerce.com.br/produto/amz-B07HCZLHPF
```

### Acompanhamento
Verificar diariamente em https://associados.amazon.com.br:
- [ ] Cliques (meta: 50+/dia)
- [ ] Pedidos (meta: 1-2/dia)
- [ ] Ganhos totais
- [ ] Quando atingir 10 vendas → solicitar PA-API imediatamente

---

## 9. Status dos Programas de Afiliados

| Plataforma | Produtos | Comissão ativa? | Tag/ID | Ação necessária |
|---|---|---|---|---|
| **Shopee** | 3.000 | ✅ Sim | Links shope.ee/an_redir | Nenhuma |
| **Amazon** | 49 | ✅ Sim | tag=marketpaycomm-20 | Vender 10 para PA-API |
| **Mercado Livre** | 666 | ❌ NÃO | Sem tracking | Criar conta ML Afiliados |

### Mercado Livre — AÇÃO NECESSÁRIA
Os 666 produtos do ML usam permalinks diretos SEM rastreamento de afiliado.
Para ganhar comissão:
1. Acessar https://afiliados.mercadolivre.com.br/
2. Criar conta de afiliado
3. Gerar links com tracking
4. Atualizar o código do site para usar links de afiliado ML
