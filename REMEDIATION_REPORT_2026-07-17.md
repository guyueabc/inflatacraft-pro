# Three-Cycle Remediation Report — 2026-07-17

## Scope

Three review → repair → re-review cycles were executed in dependency order. No production deployment was performed.

## Cycle 1 — release gates and unsafe success responses

- Restored TypeScript enforcement in production builds.
- Removed the broken, unreferenced gallery detail client that caused 20 type errors.
- Upload now returns an explicit unavailable response instead of a placeholder URL and false success.
- Stripe webhook now fails closed until signature verification, idempotency, and transactional order updates are implemented.
- Partial-lead validation and error semantics were hardened; request-time DDL and false empty-data fallbacks were removed.
- Added Vitest and regression tests for unavailable integrations.

## Cycle 2 — analytics truthfulness, database lifecycle, API contracts

- Added durable visitor/session IDs with bounded analytics fields and privacy-mode fallback.
- Unknown countries remain unknown; CN, owner, test, and local traffic are filtered explicitly.
- Historical NULL countries remain included through `IS DISTINCT FROM 'CN'`.
- Added `ANALYTICS_OWNER_IPS` configuration for owner-traffic exclusion.
- Replaced per-day query loops and summed daily UV with range-level distinct UV and grouped SQL aggregation.
- Aligned dashboard inquiry and traffic periods; API failures are no longer rendered as real zero values.
- Removed request-time schema mutation and added replayable Prisma baseline/migration files.
- Restored the AI Builder `/api/quote` estimate/lead-score/pending-page response contract after independent review found a redirect regression.
- Disabled unauthenticated shared-public-user order/quote prototypes.

## Cycle 3 — architecture cleanup and quality gates

- Removed dead imports, unused variables, obsolete constants, and broken gallery code.
- Replaced remaining raw image elements with Next Image while preserving `object-contain` behavior.
- Disabled the nonfunctional checkout path in favor of the inquiry flow.
- Switched React Hook Form tracking from `watch()` to `useWatch()`.
- Separated Playwright `*.spec.ts` discovery from Vitest `*.test.ts` discovery.
- Corrected E2E selectors and unauthenticated admin redirect behavior.

## Final verified gates

- `npx tsc --noEmit --pretty false`: passed, 0 errors.
- `npx eslint .`: passed, 0 errors and 0 warnings.
- `npx vitest run`: 2 files, 5 tests passed.
- `npx playwright test`: 20/20 passed across desktop Chromium and Mobile Chrome.
- `DATABASE_URL=<non-secret test URL> npx prisma validate`: schema valid.
- `npm run build`: passed; 86/86 static pages generated.
- `git diff --check`: passed.
- False-success/request-DDL scan: no matches for placeholder upload URLs, ignored build errors, shared public user IDs, fake Stripe acknowledgement, or request-time CREATE/ALTER statements.

## Known non-blocking dependency advisory

`npm audit --omit=dev` reports two moderate findings caused by Next 16.2.10 bundling PostCSS 8.4.31. The current npm advisory proposes an invalid downgrade to Next 9.3.3; overriding Next's nested dependency produced an invalid dependency tree and was reverted. There are no high or critical findings. Upgrade when a stable patched Next release is available.

## Database rollout note

The baseline migration is for replayability on an empty PostgreSQL database. Because the current Supabase database predates Prisma migrations, production rollout must first mark the baseline as applied with Prisma's baseline workflow, then run `prisma migrate deploy`. This report does not execute either action and no production database was modified.

## Deployment

Not performed. Production deployment remains a separate explicit action.
