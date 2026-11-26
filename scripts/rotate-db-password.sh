#!/usr/bin/env bash
# 旋转 Supabase 数据库密码后的一键收尾（更新 Vercel 变量 → 重新部署 → 设备份 Secret → 实跑验证）。
#
# 用法：
#   bash scripts/rotate-db-password.sh "/c/Users/Administrator/supabase-db-url.txt"
#
# 文件内容：Session pooler 连接串（一行），密码必须是刚重置的新密码：
#   postgresql://postgres.tfgcwlcaptgttrgjvcfk:<新密码>@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
#
# 为什么要一起改：Supabase 重置密码后旧连接串立刻失效，Vercel 上的 DATABASE_URL / DIRECT_URL
# 必须同步更新并重新部署，否则线上会持续 500。本脚本按顺序做，尽量压缩停机窗口。
set -euo pipefail

FILE="${1:-$HOME/supabase-db-url.txt}"
PROJECT_ID="prj_wfr1Et759Xr8jDAhl4KMOTX3YmSy"
TEAM_ID="team_Hpi64LkhON301fwzZW876GdR"
PROJECT_NAME="inflatacraft-pro"

[ -f "$FILE" ] || { echo "✗ 找不到连接串文件：$FILE" >&2; exit 1; }
URL="$(tr -d '\r\n' < "$FILE" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//')"
case "$URL" in postgres://*|postgresql://*) ;; *) echo "✗ 文件内容不是 Postgres 连接串" >&2; exit 1 ;; esac
[[ "$URL" == *".pooler.supabase.com"* ]] || { echo "✗ 必须是 Session pooler 地址（.pooler.supabase.com）" >&2; exit 1; }
[[ "$URL" != *"[YOUR-PASSWORD]"* ]] || { echo "✗ 密码占位符未替换" >&2; exit 1; }

echo "→ 0/5 先验证新密码能连通（连不上就不动线上）"
cd "$(dirname "$0")/.."
node -e '
const { Client } = require("pg");
const u = process.argv[1];
const c = new Client({ connectionString: u, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 15000 });
c.connect().then(async () => {
  const r = await c.query("select count(*)::int n from information_schema.tables where table_schema=$1", ["public"]);
  console.log("  ✓ 连接成功，public 表数 =", r.rows[0].n);
  await c.end();
}).catch((e) => { console.error("  ✗ 连接失败:", e.code || "", String(e.message).split("\n")[0]); process.exit(1); });
' "$URL"

VT="$(python -c "import json;print(json.load(open(r'C:\Users\Administrator\AppData\Roaming\xdg.data\com.vercel.cli\auth.json'))['token'])")"

# 预检：token 失效时 CLI 会静默卡住，而此刻数据库密码已经重置、线上正在报错。
# 必须在动任何变量前把这一条查出来，否则会像 2026-11-26 那样卡在半途。
TOKEN_CODE="$(curl -s -o /dev/null -w '%{http_code}' -H "Authorization: Bearer $VT" https://api.vercel.com/v2/user || true)"
if [ "$TOKEN_CODE" != "200" ]; then
  echo "✗ Vercel token 无效（HTTP $TOKEN_CODE）。先跑一次刷新：" >&2
  echo "  NODE_USE_ENV_PROXY=1 HTTPS_PROXY=http://127.0.0.1:7890 npx vercel whoami" >&2
  exit 1
fi

upsert_env() {
  local key="$1"
  local id tmp
  # 按 key 查现有变量 id：sensitive 类型的值读不回来，但可以按 id 整体替换
  id="$(curl -s -H "Authorization: Bearer $VT" \
    "https://api.vercel.com/v9/projects/$PROJECT_ID/env?teamId=$TEAM_ID" \
    | python -c "
import json,sys
key=sys.argv[1]
for e in json.load(sys.stdin).get('envs',[]):
    if e.get('key')==key:
        print(e['id']); break
" "$key")"

  tmp="$(mktemp)"
  python - "$key" "$URL" > "$tmp" <<'PY'
import json, sys
print(json.dumps({"key": sys.argv[1], "value": sys.argv[2], "type": "sensitive", "target": ["production"]}))
PY

  local code
  if [ -n "$id" ]; then
    code="$(curl -s -o /tmp/envresp.$$ -w '%{http_code}' -X PATCH -H "Authorization: Bearer $VT" -H "Content-Type: application/json" \
      --data @"$tmp" "https://api.vercel.com/v9/projects/$PROJECT_ID/env/$id?teamId=$TEAM_ID")"
  else
    code="$(curl -s -o /tmp/envresp.$$ -w '%{http_code}' -X POST -H "Authorization: Bearer $VT" -H "Content-Type: application/json" \
      --data @"$tmp" "https://api.vercel.com/v10/projects/$PROJECT_ID/env?teamId=$TEAM_ID")"
  fi
  if [ "$code" != "200" ] && [ "$code" != "201" ]; then
    echo "  ✗ 写入 $key 失败（HTTP $code）：$(head -c 300 /tmp/envresp.$$)" >&2; rm -f "$tmp" "/tmp/envresp.$$"; exit 1
  fi
  rm -f "$tmp" "/tmp/envresp.$$"
  echo "  ✓ Vercel 变量 $key 已更新"
}

echo "→ 1/5 更新 Vercel DATABASE_URL"
upsert_env DATABASE_URL
echo "→ 2/5 更新 Vercel DIRECT_URL"
upsert_env DIRECT_URL

echo "→ 3/5 重新部署生产"
npx vercel --prod --yes >/tmp/deploy.$$ 2>&1 || { echo "  ✗ 部署失败，见 /tmp/deploy.$$" >&2; exit 1; }
tail -3 /tmp/deploy.$$

echo "→ 4/5 等待部署 READY 并确认线上恢复 200"
for _ in $(seq 1 40); do
  CODE="$(curl -s -o /dev/null -w '%{http_code}' https://qddjtx.com/ || true)"
  LIVE="$(curl -s -o /dev/null -w '%{http_code}' https://qddjtx.com/api/products || true)"
  echo "   首页=$CODE / api/products=$LIVE"
  [ "$CODE" = "200" ] && [ "$LIVE" != "500" ] && break
  sleep 10
done

echo "→ 5/5 设置备份 Secret 并实跑一次"
gh secret set SUPABASE_DB_URL < "$FILE"
bash "$(dirname "$0")/setup-db-backup.sh" "$FILE"

echo
echo "完成。建议：确认线上功能正常后删除明文文件 → rm -f \"$FILE\""
