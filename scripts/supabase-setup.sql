-- Executar no Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  event_type TEXT NOT NULL,        -- 'page_view', 'product_click', 'affiliate_click'
  page_path TEXT,                   -- '/produto/amz-B0CHX3QBCH'
  product_id TEXT,                  -- 'amz-B0CHX3QBCH'
  product_title TEXT,               -- 'Echo Dot 5ª Geração...'
  product_category TEXT,            -- 'Eletrônicos'
  product_source TEXT,              -- 'shopee', 'amazon', 'mercadolivre'
  product_price DECIMAL(10,2),      -- 349.00
  affiliate_url TEXT,               -- URL de destino do afiliado
  session_id TEXT,                  -- ID de sessão do visitante
  referrer TEXT,                    -- de onde veio (google, instagram, etc)
  user_agent TEXT                   -- navegador do visitante
);

-- Índices para consultas rápidas no dashboard
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events (created_at);
CREATE INDEX IF NOT EXISTS idx_events_type ON events (event_type);
CREATE INDEX IF NOT EXISTS idx_events_source ON events (product_source);
CREATE INDEX IF NOT EXISTS idx_events_session ON events (session_id);

-- Habilitar Row Level Security (RLS) mas permitir inserts anônimos
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Política: qualquer pessoa pode inserir (tracking público)
CREATE POLICY "Allow anonymous inserts" ON events
  FOR INSERT TO anon
  WITH CHECK (true);

-- Política: apenas leitura autenticada (para o dashboard)
CREATE POLICY "Allow authenticated reads" ON events
  FOR SELECT TO anon
  USING (true);
