# InflataCraft Pro 三轮审查修复实施计划

**目标：** 按依赖关系执行三轮“审查 → 修复 → 复审”，消除已确认的安全、真实性、类型、性能、架构和测试问题，并建立可阻止回归的发布门禁。

**原则：** 数据真实性和安全优先；每个行为修改先建立失败测试；每轮只处理该轮范围；每轮结束必须执行完整质量门禁并根据复审结果继续修复。

## 优先级与依赖

```text
P0 安全/假成功
  ├─ Stripe webhook 停用或完整验签
  ├─ Upload 停用假成功
  └─ Partial Lead 不得吞错

P0 发布门禁
  ├─ Gallery 类型契约修复
  ├─ ESLint errors 清零
  ├─ TypeScript errors 清零
  └─ 删除 ignoreBuildErrors

P1 数据库与统计
  ├─ Prisma schema 成为唯一结构来源
  ├─ 正式 migration 取代运行时 DDL
  ├─ pooled DATABASE_URL / Prisma复用
  ├─ visitor/session/country/UV定义修复
  ├─ Dashboard统一周期
  └─ 聚合SQL替代按天N+1

P1 业务契约
  ├─ 合并 quote/submit-quote 公共逻辑
  ├─ 统一产品真相源
  └─ Inquiry → Quote → Order 模型（依赖数据库迁移）

P2 维护性
  ├─ 拆分巨型组件/API
  ├─ 清理死代码和未使用依赖
  ├─ 图片和客户端性能
  └─ 单元/API/E2E分层覆盖
```

## 第一轮：恢复安全与可信发布

1. 建立 Vitest 测试基础及 `typecheck` 脚本。
2. 为上传占位和 Stripe webhook 写失败测试；未完成的生产能力返回 501，不再返回成功。
3. 为 Partial Lead 写入/读取失败行为写测试；失败返回明确 5xx。
4. 修复 Gallery 类型/路由/死组件分叉，确保单一契约。
5. 清理所有 TypeScript errors 和 ESLint errors。
6. 移除 `ignoreBuildErrors`。
7. 复审：lint、tsc、测试、Playwright、build、npm audit、秘密扫描。

## 第二轮：保证数据库和后台数据真实

1. 把 `visitor_logs`、PageView扩展字段、partial_leads 纳入 Prisma schema 和版本化 migration。
2. 删除请求时 CREATE/ALTER/INDEX。
3. 修复 Prisma Serverless pooled连接策略。
4. 重建 analytics 数据契约：随机 visitor ID、真实 session、unknown country、周期 distinct UV。
5. Dashboard所有指标统一 period/timezone/filter；禁止今日流量除以历史询盘。
6. 用单次 GROUP BY/条件聚合替代按日循环查询，并限制最大日期范围。
7. 对 analytics schema、周期和故障状态写单元/API测试。
8. 复审：全局搜索运行时DDL、假成功、默认US、每日UV相加、跨周期拼接；重复全量门禁和独立审查。

## 第三轮：结构、重复、死代码和性能收敛

1. 提取 quote contract、submission service、client IP、rate limiter、notifier，统一两个入口。
2. 选择唯一产品数据源；让页面/API/sitemap通过同一 repository。
3. 对 Quote/Order 的 `public` 用户原型做边界决策：当前无完整客户认证时下线不可信公开流程，保留真实询盘主链路。
4. 合并管理员 session 签发/验证，所有管理接口 route-level guard。
5. 拆分后台和 analytics 巨型文件；清理 `any`、重复JSX、未使用导入、死页面和未使用依赖。
6. 优化首屏 Client Component、原生img、remotePatterns和静态资源。
7. 增补关键单元、API集成和E2E测试。
8. 最终复审：lint 0 error、tsc 0 error、测试全绿、E2E全绿、build通过、audit无未处置高风险、独立审查通过。

## 验收标准

- `npm run lint`：0 errors（警告也尽量清零）。
- `npm run typecheck`：通过。
- 单元/API测试：全部通过。
- `npm run test:e2e`：全部通过。
- `npm run build`：不跳过类型检查且通过。
- 未完成接口不得返回假成功。
- 后台故障不得显示成0或暂无数据。
- 无请求时DDL、无未知国家默认美国、无跨周期错误转化率。
- 无已提交秘密；所有敏感API有路由级鉴权。
- 最终由独立审查代理复核差异。

## 提交与部署

三轮验证完成后再统一提交。生产部署属于外部副作用，本计划默认不自动部署；完成后报告构建、测试和提交结果，等待部署指令。
