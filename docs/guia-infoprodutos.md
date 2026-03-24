# Guia: Como Configurar Links de Afiliado — Painel Digital

## Visão Geral

A página `/painel-digital` possui **48 infoprodutos** com links placeholder que precisam ser substituídos pelos seus links reais de afiliado. Os dados estão em:

```
src/data/infoprodutos.json
```

Cada produto tem um campo `affiliateUrl` com o valor `SUBSTITUIR_SEU_HOTLINK` ou `SUBSTITUIR_SEU_LINK`.

---

## Passo a Passo por Plataforma

### 1. Hotmart (maioria dos produtos)

1. Acesse [hotmart.com](https://www.hotmart.com) → Crie uma conta ou faça login
2. Vá em **Mercado** → busque o produto pelo nome (ex: "Fórmula Negócio Online")
3. Clique no produto → **Solicitar Afiliação**
4. Após aprovação, vá em **Painel** → **Meus Produtos** → produto
5. Copie seu **Hotlink** (formato: `https://go.hotmart.com/XXXXXXXXXX`)
6. No arquivo `infoprodutos.json`, substitua `https://go.hotmart.com/SUBSTITUIR_SEU_HOTLINK` pelo seu hotlink real

### 2. Kiwify

1. Acesse [kiwify.com.br](https://www.kiwify.com.br) → Crie uma conta
2. Vá em **Marketplace** → busque o produto
3. Clique em **Afiliar-se**
4. Após aprovação, copie seu link de afiliado
5. No arquivo `infoprodutos.json`, substitua `https://kiwify.app/SUBSTITUIR_SEU_LINK` pelo link real

### 3. Eduzz

1. Acesse [eduzz.com](https://www.eduzz.com) → Crie uma conta
2. Vá em **Vitrine** → busque o produto
3. Clique em **Afiliar-se**
4. Após aprovação, copie seu **Sun Link** (formato: `https://sun.eduzz.com/XXXXXXX`)
5. No arquivo `infoprodutos.json`, substitua `https://sun.eduzz.com/SUBSTITUIR_SEU_LINK` pelo link real

### 4. Monetizze

1. Acesse [monetizze.com.br](https://www.monetizze.com.br) → Crie uma conta
2. Vá em **Loja** → busque o produto
3. Clique em **Afiliar-se**
4. Após aprovação, copie seu link de afiliado
5. No arquivo `infoprodutos.json`, substitua `https://app.monetizze.com.br/SUBSTITUIR_SEU_LINK` pelo link real

---

## Dicas Importantes

- **Nem todos os produtos aceitam afiliados automaticamente** — alguns exigem aprovação do produtor
- Se um produto não estiver disponível, substitua por outro similar da mesma categoria
- Você pode adicionar novos produtos ao JSON seguindo o mesmo formato
- **Comissões variam de 30% a 70%** dependendo do produto e produtor
- Após atualizar os links, faça `git add -A && git commit -m "links afiliados" && git push` para deploy automático

---

## Estrutura do JSON

```json
{
  "id": "info-001",
  "title": "Nome do Produto",
  "description": "Descrição do produto...",
  "price": 497,
  "originalPrice": 997,
  "commission": "50%",
  "platform": "hotmart",
  "category": "Marketing Digital",
  "categorySlug": "marketing-digital",
  "rating": 4.8,
  "sales": "500mil+",
  "image": "https://images.unsplash.com/photo-xxx?w=400&h=300&fit=crop",
  "affiliateUrl": "https://go.hotmart.com/SEU_HOTLINK_AQUI",
  "badge": "Best Seller",
  "highlights": ["Tag1", "Tag2", "Tag3"]
}
```

### Campos opcionais:
- `badge`: "Best Seller", "Alta Comissão", "Trending", "Popular", "Premium", "Top Rated"
- `highlights`: Array de tags curtas (máx 3)
- `originalPrice`: Preço original antes do desconto

### Plataformas válidas:
- `hotmart` | `eduzz` | `kiwify` | `monetizze`

### Categorias válidas (categorySlug):
- `marketing-digital` | `desenvolvimento` | `negocios` | `educacao` | `saude` | `financas`

---

## Acesso à Página

A página está em: `https://marketpaycommerce.com.br/painel-digital`

- **Não tem link no site principal** (oculta)
- **Bloqueada no robots.txt** (não indexada pelo Google)
- **Sem Header/Footer** do site principal (layout isolado)
