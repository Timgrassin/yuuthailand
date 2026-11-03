#!/usr/bin/env bash
# Applies every migration to a throwaway Postgres with stubbed Supabase schemas, then runs the smoke test.
# Usage: PGURL=postgres://postgres@localhost:5432 scripts/db-smoke.sh
set -euo pipefail
cd "$(dirname "$0")/.."
PGURL="${PGURL:-postgres://postgres:postgres@localhost:5432}"
psql "$PGURL/postgres" -qc "drop database if exists yuu_smoke" -c "create database yuu_smoke"
DB="$PGURL/yuu_smoke"
psql "$DB" -v ON_ERROR_STOP=1 -q -f supabase/tests/00_supabase_stub.sql
for f in supabase/migrations/*.sql; do psql "$DB" -v ON_ERROR_STOP=1 -q -f "$f"; done
out=$(psql "$DB" -Atq -f supabase/tests/smoke.sql)
echo "$out"
if grep -q FAIL <<<"$out"; then echo "smoke test failed"; exit 1; fi
echo "smoke test passed"
