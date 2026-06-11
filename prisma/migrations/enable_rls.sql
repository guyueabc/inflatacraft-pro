-- =============================================================================
-- Row Level Security (RLS) 策略
-- 在 Supabase SQL Editor 中执行，或通过 prisma migrate 运行
-- =============================================================================

-- ── 1. users 表 ──────────────────────────────────────────────────────────────

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 用户只能读取自己的数据
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid()::text = id);

-- 用户只能更新自己的数据
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid()::text = id);

-- 允许注册时插入 (anon key 可插入)
CREATE POLICY "Allow registration insert" ON public.users
  FOR INSERT WITH CHECK (true);

-- ── 2. quotes 表 ─────────────────────────────────────────────────────────────

ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own quotes" ON public.quotes
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create quotes" ON public.quotes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own quotes" ON public.quotes
  FOR UPDATE USING (auth.uid()::text = user_id);

-- ── 3. orders 表 ─────────────────────────────────────────────────────────────

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own orders" ON public.orders
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- ── 4. products 表 (公开只读) ────────────────────────────────────────────────

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read products" ON public.products
  FOR SELECT USING (true);

-- ── 5. gallery_items 表 (公开只读) ───────────────────────────────────────────

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gallery" ON public.gallery_items
  FOR SELECT USING (true);

-- ── 6. page_views 表 (服务端写入，公开不可读) ────────────────────────────────

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Server can insert page views" ON public.page_views
  FOR INSERT WITH CHECK (true);

-- 禁止公开读取
CREATE POLICY "No public read on page_views" ON public.page_views
  FOR SELECT USING (false);

-- ── 7. form_submissions 表 (服务端写入) ──────────────────────────────────────

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Server can insert submissions" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "No public read on submissions" ON public.form_submissions
  FOR SELECT USING (false);

-- ── 8. renderings 表 ─────────────────────────────────────────────────────────

ALTER TABLE public.renderings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own renderings" ON public.renderings
  FOR SELECT USING (
    quote_id IN (SELECT id FROM public.quotes WHERE user_id = auth.uid()::text)
  );
