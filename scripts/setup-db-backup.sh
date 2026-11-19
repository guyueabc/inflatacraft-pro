#!/usr/bin/env bash
# 一条命令完成 Supabase 每日备份的剩余配置（设置 Secret + 立即跑一次 + 验证结果）。
#
# 用法：
#   1) 把 Supabase 的 Session pooler 连接串存成一行文本，例如
#      C:\Users\Administrator\supabase-db-url.txt
#   2) bash scripts/setup-db-backup.sh "/c/Users/Administrator/supabase-db-url.txt"
#
# 连接串取法：Supabase → 项目 → 右上角 Connect → Session pooler
#   postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres
# 注意：必须是 pooler 地址（GitHub Runner 只有 IPv4，Supabase 直连是 IPv6）。
set -euo pipefail

FILE="${1:-$HOME/supabase-db-url.txt}"

if ! command -v gh >/dev/null 2>&1; then
  echo "✗ 找不到 gh CLI，请先安装 GitHub CLI 并 gh auth login" >&2
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "✗ 连接串文件不存在：$FILE" >&2
  echo "  把 Session pooler 连接串写成一行保存到该文件后再运行本脚本。" >&2
  exit 1
fi

URL="$(tr -d '\r\n' < "$FILE" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')"

case "$URL" in
  postgres://*|postgresql://*) ;;
  *) echo "✗ 文件内容不像 Postgres 连接串（应以 postgresql:// 开头）" >&2; exit 1 ;;
esac

if [[ "$URL" != *".pooler.supabase.com"* ]]; then
  echo "⚠ 这条不是 pooler 地址（没有 .pooler.supabase.com）。" >&2
  echo "  GitHub Runner 只有 IPv4，直连 db.<ref>.supabase.co 是 IPv6，几乎必然连不上。" >&2
  echo "  请改用 Session pooler 的连接串。仍要继续则加参数 --force。"
  [ "${2:-}" = "--force" ] || exit 1
fi

if [[ "$URL" == *"[YOUR-PASSWORD]"* || "$URL" == *"***"* ]]; then
  echo "✗ 连接串里的密码占位符还没替换成真实密码" >&2
  exit 1
fi

echo "→ 设置仓库 Secret SUPABASE_DB_URL"
gh secret set SUPABASE_DB_URL < "$FILE"

echo "→ 立即触发一次备份"
gh workflow run db-backup.yml

echo "→ 等待运行开始…"
sleep 12
RUN_ID="$(gh run list --workflow=db-backup.yml --limit 1 --json databaseId --jq '.[0].databaseId')"
echo "   run id = $RUN_ID"

for _ in $(seq 1 40); do
  STATUS="$(gh run view "$RUN_ID" --json status,conclusion --jq '.status + "/" + (.conclusion // "running")')"
  echo "   状态：$STATUS"
  case "$STATUS" in
    completed/success) break ;;
    completed/*) echo "✗ 备份运行失败，查看日志：gh run view $RUN_ID --log-failed" >&2; exit 1 ;;
  esac
  sleep 15
done

echo "→ 校验产物（下载并检查表数量）"
TMP="$(mktemp -d)"
gh run download "$RUN_ID" --dir "$TMP"
FILE_DUMP="$(find "$TMP" -name '*.sql.gz' | head -1)"
if [ -z "$FILE_DUMP" ]; then
  echo "✗ 没有找到 .sql.gz 产物" >&2; exit 1
fi
SIZE="$(stat -c%s "$FILE_DUMP" 2>/dev/null || stat -f%z "$FILE_DUMP")"
TABLES="$(gunzip -c "$FILE_DUMP" | grep -c '^CREATE TABLE' || true)"
rm -rf "$TMP"

echo "✓ 备份成功：$(basename "$FILE_DUMP")  大小 ${SIZE} 字节  表数量 ${TABLES}"

if [ "$TABLES" -ge 8 ]; then
  echo "→ 是否需要删除本地连接串文件 $FILE ？（脚本不会自动删，避免误删）"
  echo "   确认后执行：rm -f \"$FILE\""
else
  echo "✗ 表数量异常（预期 10），请检查备份是否完整" >&2
  exit 1
fi
