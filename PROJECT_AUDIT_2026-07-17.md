# InflataCraft Pro 全项目深度审计报告

> 审计日期：2026-07-17  
> 审计范围：`src/`、`prisma/`、构建/ESLint/TypeScript/Playwright、依赖、API、安全、性能、数据分析真实性；并对比 5 个优秀商业/电商开源项目。
>
> 本报告是只读审计结果。本轮未修改业务代码、未提交、未部署。

## 1. 执行摘要

项目已经具备可部署的 Next.js App Router 站点、产品与内容页、询价收集、管理后台、流量统计和基础 E2E 测试，但当前属于“功能能跑、质量门禁失效、部分业务边界仍是原型”的状态。

### 实测基线

- 生产构建：**通过**，85 个路由/页面完成生成。
- 但构建输出明确显示：`Skipping validation of types`。
- TypeScript：**失败，20 个错误**，集中在 `gallery-detail-client.tsx` 与 `GalleryDetail` 类型不一致。
- ESLint：**失败，89 个问题（32 errors / 57 warnings）**。
- Playwright：20 个用例（Chromium + Mobile Chrome），实跑 **14 passed / 6 failed**。
- 重复代码：jscpd 分析 103 个 TS/TSX 文件、17,415 行，发现 **22 组克隆、382 行重复（2.19%）**。
- 测试：只有 1 个 E2E spec；无单元测试、API 集成测试、数据统计正确性测试、安全回归测试。

### 总体评级

| 维度 | 评级 | 结论 |
|---|---:|---|
| 结构清晰度 | C+ | App Router 基本分层合理，但后台、分析 API、业务原型混杂且超大文件明显 |
| 代码质量 | D | 类型与 lint 门禁被绕过，构建通过不能代表代码正确 |
| 错误处理 | C- | 核心询价有容错，但后台 fetch、统计、占位 API 有假成功/静默失败 |
| 性能 | C | 静态生成较好；分析 API 有明显 N×天查询，图片与客户端组件偏重 |
| 安全 | C- | 管理 API 有 JWT 二次校验，但登录限流不适合 serverless，存在占位 webhook/上传接口 |
| 数据真实性 | C | 已开始接真实 API，但时间口径和“客户画像/实时”语义不准确，统计模型仍不完整 |
| 可维护性 | D+ | 质量债、超大组件、重复查询、无模块级测试，改动风险高 |
| 可扩展性 | C- | Prisma 模型有扩展基础，但公共用户、占位支付/上传、两套询价通道阻碍扩展 |

---

## 2. 最高优先级问题（按风险排序）

## P0 — 立即处理

### P0-1：构建绕过 TypeScript，生产可发布带类型错误的代码

**证据**

- `next.config.ts:4-6`：`typescript.ignoreBuildErrors: true`
- `npx tsc --noEmit` 实测失败，20 个错误。
- 主要错误位于 `src/components/gallery/gallery-detail-client.tsx:47-278`：组件访问 `GalleryDetail` 中不存在的 `clientName`、`gradient`、`fullDescription`、`timeline`、`result`、`testimonial*`、`specs`、`features` 等字段。

**影响**

- 构建成功是伪安全感；数据变化后页面可能运行时崩溃或静默缺字段。
- 类型定义与 UI 契约脱节，后续任何 Gallery 重构都高风险。

**建议**

1. 先统一 `GalleryDetail` DTO 与真实数据模型。
2. 修复全部 `tsc` 错误。
3. 删除 `ignoreBuildErrors`。
4. CI 强制顺序：`lint -> tsc --noEmit -> unit/integration -> build -> e2e`。

### P0-2：公开上传 API 返回“成功 + 假 URL”

**证据**

- `src/app/api/upload/route.ts:5-8` 明确为 placeholder。
- `:31-40` 返回 `success: true` 和 `placehold.co` URL。

**影响**

- 调用方会把未上传的文件当成成功结果，属于数据完整性问题。
- 若未来接入订单/询价附件，会造成客户设计稿丢失却显示成功。

**建议**

- 未实现前直接返回 `501 Not Implemented`，不要假成功。
- 实现时采用对象存储直传/签名 URL；校验 MIME、扩展名、magic bytes、大小、数量；禁用 SVG 或做严格清洗；设置私有桶和短期访问 URL。

### P0-3：Stripe webhook 不验签却返回 `received: true`

**证据**

- `src/app/api/webhooks/stripe/route.ts:23-55` 真实验签/事件处理全部注释。
- `:57-63` 对任意请求返回 200、`received: true`。

**影响**

- Stripe 会认为 webhook 已消费，真实付款事件可能永久丢失。
- 一旦订单流程启用，这会造成付款状态与生产状态不一致。

**建议**

- 未启用支付时删除/关闭路由或返回 501。
- 启用时使用 Stripe SDK 对 raw body 验签；建立 `processed_webhook_events` 做幂等；事务更新订单；失败返回非 2xx 让 Stripe 重试。

### P0-4：两套业务模型并存，订单/报价 API 使用固定 `userId: "public"`

**证据**

- `src/app/api/orders/route.ts:62,93`
- `src/app/api/quotes/route.ts:41,70`
- Prisma 又定义真实 `User -> Quote -> Order` 外键关系。
- 当前真正获客主线使用 `FormSubmission`；账户/报价/订单路由则使用另一套模型。

**影响**

- 若数据库不存在 id=`public` 的 User，创建会失败；若存在，所有客户数据混在同一用户下。
- 权限隔离、客户历史、留存、成交归因都无法可靠实现。

**建议**

- 明确产品边界：当前若是 B2B 询价站，先下线未完成的账户/购物车/订单/支付页面与 API；或完成 Auth.js 用户体系并按 session userId 查询。
- 建立唯一主流程：`Lead/Inquiry -> Quote -> Order`，不要让 `FormSubmission` 与 `Quote` 各自成为事实来源。

### P0-5：统计口径和采集可信度同时存在问题

**时间口径证据**

- `stats-dashboard.tsx:55` 请求今日流量 summary。
- `:56` 请求 `/api/submit-quote?limit=100`，无日期过滤。
- `:114`：`submissions.length / t.totalVisitors` 计算转化率。

**采集可信度证据**

- `analytics/track/route.ts:428-475` 的公开 beacon 无持久限流和来源校验，可人为构造页面、UTM、gclid、referrer。
- `track/route.ts:113-118` 对无法识别且非中国/内网的 IP 默认归为美国，地域数据并不可靠。
- `track/route.ts:177-180` 的 `session_id` 实际由 IP、UA 和当天日期派生，不是真实浏览会话。
- `analytics/traffic/route.ts:218-220,325-327` 将每日 distinct UV 相加作为周/月 UV，同一访客跨日会被重复计算。
- `track/route.ts:488-495` 写库失败仍返回 tracking GIF，统计丢失会被静默掩盖。

**影响**

- 后台转化率口径不一致：分母是今天，分子可能跨越全部历史。
- PV、UV、国家、渠道归因既可能被第三方污染，也可能因数据库故障静默漏数。
- 用户要求后台所有数据真实；真实记录经错误定义或错误周期计算，最终仍然是错误数据。

**建议**

- 所有 Dashboard API 接受统一时间范围与时区，并在服务器一次聚合。
- 周/月 UV 对整个周期执行一次 `COUNT(DISTINCT visitor_id)`，不要把每日 UV 相加。
- visitor ID 使用客户端随机标识；session ID 设置真实过期时间；无法识别的国家保留 `unknown`，禁止默认美国。
- beacon 增加参数长度/枚举校验、分布式限流、机器人与重复事件过滤，并为写入失败建立监控告警。
- 响应包含 `period`, `timezone`, `generatedAt`, `filters`；建立 PV、UV、lead、qualified lead、quote、order、conversion 指标字典。

---

## P1 — 本周处理

### P1-1：ESLint 32 errors / 57 warnings，质量门禁不存在

**主要类别**

- 大量 `no-explicit-any`，包括后台 DTO 和 analytics API。
- `Analytics.tsx:66` 在 effect 内同步 setState，造成额外渲染。
- 多处未使用导入/变量和未转义字符。
- 多个原生 `<img>` 警告。

**建议**

- 第一阶段仅清到 0 error；第二阶段清 warning。
- 对 API 用 Zod schema 推导 DTO，替代 `any`。
- CI 与 Vercel build 都不能跳过 lint/typecheck。

### P1-2：管理登录限流是进程内 Map，不适用于 Vercel serverless

**证据**

- `api/admin/login/route.ts:22-23` 注释已承认 cold start/每实例重置。

**影响**

- 攻击请求分散到不同实例即可绕过；重启也清零。

**建议**

- 使用 Upstash Redis/Vercel KV/Supabase 持久限流，key 为规范化 IP + username。
- 登录失败统一响应；记录安全事件；建议增加 2FA 或至少较短 session + 密码轮换。
- 当前字符串直接比较凭据可改为 hash/constant-time 验证。

### P1-3：分析 API 存在 N×天数据库查询

**证据**

- `analytics/traffic/route.ts:235-252`：上周每天 2 次查询。
- `:297-314`：当月每天 2 次查询；31 天即至少 62 次。
- `:398-415`：自定义区间每天 2 次查询，且未见最大范围限制。

**影响**

- Serverless 延迟、数据库连接数和费用随天数线性增长；长范围可能成为 DoS 放大器。

**建议**

- 使用一条 `GROUP BY date_trunc('day', created_at)` 同时计算 PV 与 UV。
- 来源/设备/国家通过 FILTER 聚合；限制 range 最大 90 天。
- 为 `created_at, is_owner, is_test, country` 与 `session_id` 设计合适索引；长期数据做日聚合表/materialized view。

### P1-4：运行时 DDL 与 Prisma schema 漂移

**证据**

- analytics 路由使用 `$executeRawUnsafe` 动态 `CREATE TABLE/ALTER TABLE`（项目搜索及运行日志确认）。
- Prisma `PageView` 只声明基础字段，但实际统计依赖 `traffic_type/session_id/is_owner/is_test/device/browser/os`。

**影响**

- 环境启动时修改数据库；并发冷启动可能互相竞争；schema 不可审计、不可回滚。
- Prisma 类型无法覆盖真实字段，迫使大量 raw SQL/`any`。

**建议**

- 把所有字段加入 Prisma schema，生成正式 migration。
- 部署阶段执行 migration，运行时只做读写。
- `$queryRawUnsafe` 改为 Prisma.sql/typed SQL；静态 SQL 虽当前未直接拼接用户输入，仍应消除 unsafe API。

### P1-5：“实时流量”和“客户画像”命名不符合实际数据

**证据**

- “实时流量监控”显示的是今日累计值，非在线会话/分钟级活跃。
- “客户画像”使用 `trafficStats.sources`，本质是流量来源，不是地域、行业、设备或客户属性。

**建议**

- 改名为“今日流量概览”“流量来源”；或真正实现活跃会话（最近5分钟 session）、国家/设备/浏览器分布。
- 无数据必须显示“暂无数据”，不要通过语义包装制造不存在的能力。

### P1-6：后台组件过大且职责混杂

**证据**

- `stats-dashboard.tsx` 887 行 / 约46KB：抓取、DTO、CSV、聚合、五个 Tab、图表、询盘详情全部一体。
- `traffic-analysis.tsx` 536 行。
- `analytics/traffic/route.ts` 437 行。

**建议模块划分**

```text
src/features/admin-analytics/
  api/queries.ts
  schemas/dashboard.ts
  metrics/definitions.ts
  components/overview-tab.tsx
  components/traffic-tab.tsx
  components/leads-tab.tsx
  components/conversion-tab.tsx
  components/products-tab.tsx
  hooks/use-dashboard.ts
```

- 聚合逻辑全部在服务端；前端组件保持纯展示。
- 使用明确 DTO，而不是复用数据库原始 JSON。

### P1-7：E2E 现状 6/20 失败，且无 API/单元测试

**实跑失败**

- Gallery 卡片选择器/内容不匹配（桌面+移动）。
- Quote email 验证用例不匹配（桌面+移动）。
- 未认证后台重定向失败（桌面+移动）。

**补充说明**

- 本地 `.env.local` 的 DATABASE_URL 为空，跟踪 API 日志大量数据库初始化错误；但 beacon 仍返回 200，掩盖统计写入失败。

**建议测试金字塔**

1. Vitest：pricing engine、流量分类、指标聚合、CSV escape、Zod schema。
2. API integration：询价成功/限流/重复、管理授权、统计时间范围、webhook 验签。
3. Playwright：核心获客链路、移动端、后台登录、空数据、上传失败。
4. CI 中使用隔离 Postgres/Supabase 测试库，不访问生产库。

### P1-8：Prisma 的 Serverless 连接策略与环境配置错误

**证据**

- `src/lib/prisma.ts:23-26` 运行时优先选择 `DIRECT_URL || DATABASE_URL`，可能绕过 Supabase pooler。
- `:30-32` 只在开发环境通过 `globalThis` 复用 PrismaClient，生产 isolate 内未复用。
- 实测 `npx prisma validate` 因空 `DIRECT_URL` 返回 P1012。

**建议**

- 应用运行时只使用 pooled `DATABASE_URL`；`DIRECT_URL` 仅用于 migration。
- 在同一 isolate 内复用 PrismaClient，并设置连接/查询超时。
- CI 强制执行 `prisma validate` 和 migration 检查。

### P1-9：Partial Lead 接口会把数据库故障伪装成“没有线索”

**证据**

- `src/app/api/analytics/partial-lead/route.ts:85-87` 数据库读取失败时返回 HTTP 200、空列表与 total 0。
- 写接口 `:26-67` 缺少严格长度校验与持久限流，可被写入垃圾或超长 PII。

**建议**

- 读取失败返回明确 5xx，后台显示“加载失败”，不能显示“暂无数据”。
- 写接口增加严格 Zod schema、body 大小上限、共享限流、反机器人措施和 PII 保留期限。

### P1-10：产品存在静态文件与数据库两个互不连通的真相源

**证据**

- 产品页面、详情页和 sitemap 使用 `src/lib/data/products.ts` 静态数据。
- `src/app/api/products/route.ts` 则读写 Prisma `Product`。
- 没有发现静态目录与数据库之间的同步机制；API 创建的产品不会自动进入前台页面或 sitemap。

**建议**

- 选择唯一 product repository。
- 若 Prisma 为主，服务端页面和 sitemap 使用同一个 typed repository。
- 若静态内容为主，删除未被前台消费的产品 CRUD API/数据库模型，避免维护两套目录。

### P1-11：管理认证存在多个实现副本，保护策略分散

**证据**

- JWT secret 派生/验证分别存在于 `src/lib/admin-auth.ts`、`src/proxy.ts` 和管理员登录路由。
- 部分 API 使用 `requireAdmin()`，部分只依赖 Proxy matcher；新增路由时容易漏掉其中一层。

**建议**

- 提取唯一 `admin-session` 模块统一签发、验证和 claims。
- Proxy 作为快速外层门禁，所有敏感 Route Handler 仍必须调用 route-level guard。
- 加自动化授权矩阵测试，确保匿名请求不能访问每个管理接口。

---

## P2 — 近期优化

### P2-1：重复逻辑虽然总比例不高，但集中在关键路径

jscpd 检出 22 组克隆，重点包括：

- `quote/route.ts` 与 `submit-quote/route.ts`：验证、限流、通知等重复。
- `orders/route.ts` 与 `quotes/route.ts`：分页/查询结构重复。
- `analytics/traffic/route.ts`：日聚合循环重复。
- 多个 industries/buying-guide/pricing/shipping 页面布局重复。

**建议**

- 抽取 `lead-service`, `rate-limit`, `request-context`, `analytics-repository`。
- 行业页用 typed content config + 共用模板，不复制 JSX。
- 不必追求零重复；优先合并会导致行为漂移的 API 逻辑。

### P2-2：依赖与死代码需清理

高置信未使用依赖/原型遗留：

- `@auth/prisma-adapter`
- `bcryptjs`
- `class-variance-authority`
- `@stripe/stripe-js`
- `resend`
- `next-auth` 仅在 `src/lib/types.ts` 出现，尚未形成真实认证链路

其他死代码/未使用：

- `admin/stats/page.tsx:3` 仍导入未使用的 `TrafficAnalysis`。
- `products/layout.tsx`、`products/page.tsx` 等有未使用导入。
- `STANDARD_COMPARISON` 未使用。
- checkout/cart 的 subtotal/tax/total 等原型变量未使用。

**建议**

- 先决定是“删除原型功能”还是“完成它”，再移除依赖。
- 加入 Knip 或 depcheck；注意 depcheck 本次对 Next/ESLint 有误报，删除前需逐项确认。

### P2-3：图片与客户端包体优化

**证据**

- ESLint 报告多个 `<img>`：产品详情、产品列表、图库、博客、首页等。
- 119 个源文件中 33 个是 client component；多个内容页引入 Framer Motion。
- `next.config.ts:8-10` 允许任意 HTTPS hostname 的远程图片。

**建议**

- LCP/列表主图改用 `next/image`，设置真实 `sizes`、priority 仅用于首屏。
- remotePatterns 改白名单，避免任意远程资源与优化代理滥用。
- 静态内容保持 Server Component；动画拆成最小 client island；对后台 Tab 动态 import。
- 用 `@next/bundle-analyzer` 建立 bundle budget。

### P2-4：错误处理和可观测性不足

- `traffic-analysis.tsx:70-75` 不检查 `res.ok`，错误 JSON 也会被当成数据。
- 跟踪 beacon 数据库失败仍返回图片 200；后台看不到漏数。
- 钉钉失败只写 console，询价提交成功但没有可靠补偿。
- 无结构化日志、request ID、Sentry/告警。

**建议**

- 定义统一 `ApiResult<T>` 与错误码；前端明确 loading/empty/error/stale 状态。
- 询价落库与通知解耦：outbox/job 重试，后台显示通知状态。
- 加 Sentry/Logtail/Vercel logs；为 quote submit、tracking write、admin login、webhook 建告警。

### P2-5：隐私与分析治理

- PageView 保存 IP、visitor/session、国家、UTM；FormSubmission 保存联系方式与营销参数。
- Google Ads/GTM/Meta Pixel 可能在无同意管理情况下加载。

**建议**

- 明确保留期、脱敏/哈希策略、数据删除流程与隐私声明。
- 只保留运营需要的数据；后台 CSV 导出做权限审计。
- 按目标市场要求接入 consent mode/cookie consent。

---

## 3. 结构、命名、错误处理、可维护性专项结论

### 结构

**优点**

- App Router 目录直观，`components`、`lib`、`config`、`stores`、`prisma` 基础分层存在。
- `lib/admin-auth.ts` 对敏感 Route Handler 做二次授权，不只依赖 proxy，这是正确方向。
- 询价 API 使用 Zod、IP 限流并先落库后通知，核心获客路径比其他原型模块成熟。

**问题**

- 横向技术分层多，按业务 feature 分层少；同一“询价/分析”逻辑散落在 route、client、data JSON。
- 页面、组件和 API 文件过大。
- 真实生产功能与 placeholder 原型同样暴露为正式路由。

### 命名

- “商品销量排行”实际是“询盘产品排行”；当前已部分改名，但应在指标字典统一。
- “客户画像”实际是流量来源。
- “实时流量”实际是今日累计。
- `quote` 与 `submit-quote` 命名无法表达两者边界。

建议统一领域语言：`Inquiry/Lead`（客户提交）→ `Quote`（业务报价）→ `Order`（成交订单）。

### 错误处理

- 核心提交返回通用错误，避免泄漏内部信息，较好。
- 但 placeholder 假成功、fetch 不检查状态、统计写入失败静默，是更严重的问题。
- 建议所有外部副作用都具备幂等、重试、状态记录。

### 可扩展性

- Prisma 的 User/Quote/Order 模型具备方向性，但当前与 FormSubmission 主线割裂。
- 先统一领域模型和认证，再扩展成交、留存、商品销量；否则后台会继续通过不可靠推导展示“高级指标”。

---

## 4. 对标项目研究：5个开源架构 + 3个行业网站

> 开源项目用于研究代码组织、领域建模、工作流和扩展方式；行业网站用于研究客户如何发现产品、建立信任并提交高质量定制需求。项目不应整体迁移到某个电商框架，而应选择性吸收其模式。

### 4.1 开源架构参照

| 项目 | 可核验来源 | 架构/模块特色 | 本项目可借鉴 |
|---|---|---|---|
| Vercel Commerce | [GitHub](https://github.com/vercel/commerce) · [模板](https://vercel.com/templates/next.js/nextjs-commerce) · [Demo](https://demo.vercel.store) | Next.js App Router、RSC、Server Actions、Suspense；`lib/shopify` 将后端适配层与 UI 解耦 | 采用 `catalog/inquiries/gallery/content/analytics/storage` 服务边界；产品首屏服务端渲染；把购物车思路改成“询价清单/Project Brief” |
| Medusa | [GitHub](https://github.com/medusajs/medusa) · [架构](https://docs.medusajs.com/learn/advanced-development/architecture/overview) · [Modules](https://docs.medusajs.com/resources/commerce-modules) | TypeScript monorepo；领域模块、workflow、事件、后台和集成测试分离 | 询盘状态工作流：`NEW → QUALIFYING → NEEDS_INFORMATION → DESIGNING → QUOTED → WON/LOST → IN_PRODUCTION`；保存负责人、活动历史和时间戳 |
| Saleor | [GitHub](https://github.com/saleor/saleor) · [文档](https://docs.saleor.io/) · [Channels](https://docs.saleor.io/developer/channels/overview) | API-only/GraphQL；动态 Attributes、Channels、Metadata、Webhooks | 用 `AttributeDefinition + ProductAttributeValue` 表达不同产品的异构规格；通过事件解耦 CRM、通知和线索分类 |
| Shopify Hydrogen | [GitHub](https://github.com/Shopify/hydrogen) · [文档](https://shopify.dev/custom-storefronts/hydrogen) · [Demo](https://skeleton.hydrogen.shop/) | `packages/templates/cookbook/e2e`；媒体、缓存、分页和类型生成是一等能力 | 不迁移技术栈，只借鉴 `MediaAsset`、渐进加载、cursor pagination、generated types/Zod 契约 |
| Vendure | [GitHub](https://github.com/vendurehq/vendure) · [文档](https://docs.vendure.io/) | TypeScript/NestJS/GraphQL；Shop API 与 Admin API 分离；plugin-first；报价、审批和 B2B 能力 | 公共/后台 API 分区；角色拆分；建立 `Inquiry/Quote/QuoteVersion/QuoteLine/Approval/Activity`，禁止覆盖历史报价 |

### 4.2 充气制造行业功能参照

| 网站 | 可核验来源 | 核心特色 | 可直接借鉴 |
|---|---|---|---|
| Inflatable Images | [官网](https://www.inflatableimages.com/) · [Portfolio](https://www.inflatableimages.com/inflatable-portfolio/) · [定制流程](https://www.inflatableimages.com/custom-inflatables-process/) | 产品分类与角色/解决方案并存；公开 Concept Rendering、3D、工程拆版、打印裁切和缝制流程；Portfolio 用于解释尺寸、品牌和场景 | 建立 `/products`、`/solutions`、`/projects` 三条浏览路径；图库关联产品、行业、场景、颜色和项目；允许“以此案例询价” |
| Landmark Creations | [官网](https://landmarkcreations.com/) | Estimate 表单包含预算区间、活动日期、灯光和附件；明确响应时间；Success Stories 以业务结果表达 | 用预算区间和交付日期做线索资格判断；提交后展示 Inquiry ID、预计回复时间和下一步资料 |
| Air Ad Promotions | [官网](https://airadpromotions.com/) · [流程](https://airadpromotions.com/what-we-do/) · [询价](https://airadpromotions.com/estimate/) · [图库](https://airadpromotions.com/photo-gallery/) | 从咨询、设计、许可、制造到物流、安装和售后；支持多门店、多地点及大文件 | 增加地点数量、多地址配送、安装、设计协助和许可字段；附件经 signed URL 直传 Storage；未来支持 Campaign/Location 模型 |

### 4.3 横向结论

1. **前端架构**：采用 Vercel Commerce 的 App Router、Server Components、服务适配层和缓存模式。
2. **业务模块**：采用 Medusa 的领域模块和状态工作流，但不整体引入完整平台。
3. **商品建模**：采用 Saleor 的动态属性思想，避免不断向 Product 添加 nullable 字段。
4. **报价后台**：采用 Vendure 的 Shop/Admin 边界、报价版本和审批模型。
5. **行业转化**：展示真实制造过程；用预算、日期、灯光和附件筛选询盘；支持多地点、设计、物流、安装和许可服务。
6. **核心业务闭环**：`灵感发现 → 选择参考 → 提交结构化 Brief → 设计确认 → 版本化报价 → 项目跟进`，而不是普通零售购物车。

### 4.4 对标后建议的功能优先级

**P0**

- 结构化 Project Brief：`Inquiry / InquiryItem / InquiryAttachment / InquiryReference / InquiryLocation / InquiryActivity`。
- 产品、解决方案、案例三条浏览路径。
- 公开八阶段定制流程：需求、澄清、概念、3D确认、工程、制造、质检、运输。
- 后台询盘活动流：负责人、阶段、下次跟进、内部备注、沟通记录、附件、丢单原因、报价版本、来源与UTM。

**P1**

- 可筛选的真实项目图库，并提供“以此作为询价参考”。
- 动态产品属性系统。
- 报价版本化，保留币种、运输费、有效期、交期、条款和修改理由。
- 文件直传、权限校验、安全预览和病毒扫描。

**P2**

- 面向连锁品牌/代理商的多地点 Campaign 模式。
- 询盘量和复购成熟后，再增加客户门户、设计批注、报价接受和采购审批。

---

## 5. 建议目标架构（适合本项目，而非过度工程）

```text
src/
  app/
    (storefront)/                 # 前台页面
    admin/                        # 后台页面
    api/public/                   # 询价、tracking 等公开写接口
    api/admin/                    # 管理查询/操作
    api/webhooks/                 # 外部回调
  features/
    inquiries/
      schemas.ts
      service.ts
      repository.ts
      components/
    analytics/
      definitions.ts
      queries.ts
      dto.ts
      components/
    catalog/
      repository.ts
      dto.ts
      components/
    auth/
  lib/
    db/
    rate-limit/
    observability/
    storage/
    notifications/
```

### 领域模型建议

```text
VisitorSession -> AnalyticsEvent
Lead/Inquiry -> Quote -> Order
LeadProductInterest (一条询盘可关联多个产品)
NotificationDelivery (pending/sent/failed/retryCount)
WebhookEvent (providerEventId 唯一，保证幂等)
```

后台“商品分析”只能在有相应真实事件后显示：

- 产品浏览：AnalyticsEvent.productId
- 产品询盘：InquiryItem.productId
- 报价：QuoteItem.productId
- 成交销量：OrderItem.productId

没有 `OrderItem` 之前，不应显示“销量/收入”，只显示“浏览/询盘”。

---

## 6. 可执行改进路线图

### 第一阶段：停止假成功与恢复质量门禁（1–3天）

- [ ] 上传、Stripe webhook 未实现时返回 501 或下线路由。
- [ ] 修复 Gallery 类型契约的 20 个 TS 错误。
- [ ] 清除 32 个 ESLint errors。
- [ ] 删除 `ignoreBuildErrors`。
- [ ] CI 加 `lint + typecheck + build`。
- [ ] 修复 6 个失败 E2E；测试数据库使用隔离配置。

### 第二阶段：保证后台指标真实（3–5天）

- [ ] 统一时间范围/时区；由服务端生成 Dashboard DTO。
- [ ] 修复今日访客 vs 历史询盘的混合口径。
- [ ] 修复统计采集可信度：未知国家不得默认美国，真实 visitor/session ID，周/月 UV 不能按日相加。
- [ ] 为 beacon 加分布式限流、参数校验、bot/重复事件过滤，并监控静默写入失败。
- [ ] “实时/客户画像/销量”改成真实定义或准确命名。
- [ ] PageView 高级字段进入 Prisma migration，删除运行时 ALTER TABLE。
- [ ] analytics 查询改 GROUP BY，一次查询完成日/月聚合。
- [ ] 加指标聚合单元/集成测试和空数据测试。

### 第三阶段：统一获客领域（1周）

- [ ] 合并 `/api/quote` 与 `/api/submit-quote` 的公共逻辑。
- [ ] 明确 `Inquiry -> Quote -> Order` 唯一事实来源。
- [ ] 统一产品真相源：静态 catalog 与 Prisma Product 二选一，并让前台、API、sitemap 共用 repository。
- [ ] 删除固定 `public` user，完成真实 auth 或下线账户/订单原型。
- [ ] 合并管理 JWT 派生/验证逻辑，所有敏感接口实施 route-level guard。
- [ ] 钉钉通知改 outbox + retry，记录投递状态。
- [ ] 持久化登录/提交限流。

### 第四阶段：性能和维护性（持续）

- [ ] 拆分 887/536/437 行大文件。
- [ ] 行业页改内容配置+模板。
- [ ] LCP 图片迁移 `next/image`，限制 remotePatterns。
- [ ] 清理确认未使用依赖与死代码。
- [ ] 加 bundle budget、Sentry、结构化日志、依赖/安全扫描。

---

## 7. 验收标准

发布前必须同时满足：

```text
npm run lint              # 0 errors
npx tsc --noEmit          # 0 errors
npm run build             # 不跳过类型检查
npm run test:unit         # 通过
npm run test:integration  # 通过
npm run test:e2e          # 桌面+移动全部通过
```

数据后台额外要求：

- 每个指标显示时间范围和定义。
- 无订单时不显示销量/收入。
- 无画像字段时不显示客户画像。
- API 失败显示错误/数据可能过期，不回退到 0 冒充真实。
- 测试/站长/机器人过滤规则有自动化测试。
- 生产数据库绝不被测试套件写入。

---

## 8. 结论

当前最需要的不是继续增加后台图表，而是先恢复“类型、测试、数据口径、安全副作用”四条可信链。优先完成 P0/P1 后，项目会从“可演示”进入“可持续运营”；再参考 Medusa/Vendure 的领域模块化、Saleor 的安全治理、Vercel Commerce/Hydrogen 的前台性能模式，逐步扩展，而不必引入完整电商平台的复杂度。
