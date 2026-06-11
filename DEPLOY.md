# InflataCraft Pro — Vercel + Supabase 部署指南

## 前置准备

1. [GitHub](https://github.com) 账号 + 推送代码
2. [Vercel](https://vercel.com) 账号 (用 GitHub 登录)
3. [Supabase](https://supabase.com) 账号

---

## 第一步：Supabase 数据库

```bash
# 1. 登录 supabase.com → New Project
#    - Name: inflatacraft-pro
#    - Password: 生成并保存
#    - Region: 选择离用户最近的 (亚太: ap-southeast-1)

# 2. 获取连接字符串
#    Settings → Database → Connection string → URI
#    格式: postgresql://postgres:***@db.xxxxx.supabase.co:5432/postgres

# 3. 设置环境变量 (Vercel 或 .env.local)
DATABASE_URL="postgresql://postgres:***@db.xxxxx.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:***@db.xxxxx.supabase.co:5432/postgres"

# 4. 运行数据库迁移
npx prisma db push
```

## 第二步：Vercel 部署

```bash
# 1. 推送代码到 GitHub
git remote add origin https://github.com/YOUR_USER/inflatacraft-pro.git
git push -u origin main

# 2. 登录 vercel.com → Import Project → 选择 GitHub 仓库
#    - Framework: Next.js (自动检测)
#    - Build Command: npx prisma generate && next build
#    - Output: .next

# 3. 设置环境变量 (Settings → Environment Variables)
#    复制 .env.example 中的所有变量并填入真实值
```

## 第三步：分析工具

```bash
# Google Tag Manager
# 1. tagmanager.google.com → 创建容器 → 获取 GTM-XXXXXXX
# 2. 设置环境变量: NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
# 3. 在 GTM 中添加:
#    - Google Analytics 4 (配置代码)
#    - Google Ads 转化追踪
#    - Meta Pixel 代码

# Meta Pixel
# 1. business.facebook.com/events_manager → 创建 Pixel
# 2. 设置环境变量: NEXT_PUBLIC_META_PIXEL_ID=000000000000000
```

## 第四步：域名绑定

```bash
# Vercel → Settings → Domains → 添加自定义域名
# 例如: inflatacraftpro.com

# DNS 配置 (如果使用 Cloudflare):
# Type: CNAME
# Name: @ (或 www)
# Value: cname.vercel-dns.com
# Proxy: ON (橙色云朵)
```

## 第五步：验证清单

- [ ] 网站可通过域名访问
- [ ] HTTPS 自动生效 (Vercel 自带)
- [ ] GTM 预览模式可见页面浏览事件
- [ ] Meta Pixel Helper 浏览器插件检测到 Pixel
- [ ] Supabase 仪表盘可看到 page_views 表有新数据
- [ ] 广告平台可正常投放并追踪转化
- [ ] 表单提交数据写入 form_submissions 表

## 常用命令

```bash
# 本地开发
npm run dev

# 数据库迁移
npx prisma db push

# 查看数据库
npx prisma studio

# Vercel CLI 部署
vercel --prod
```

## 成本预估 (起步阶段)

| 服务 | 免费额度 | 月费 |
|------|---------|------|
| Vercel | 100GB 带宽 | $0 |
| Supabase | 500MB DB | $0 |
| GA4 | 无限 | $0 |
| GTM | 无限 | $0 |
| **合计** | | **$0/月** |
