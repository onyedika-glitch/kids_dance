#!/usr/bin/env bash
# Build into an isolated dir, serve it, and screenshot routes at desktop + mobile widths.
# Usage: scripts/snap.sh <name> <port> <outdir> /route [/route2 ...]
set -euo pipefail
name=$1; port=$2; out=$3; shift 3
cd "$(dirname "$0")/.."
mkdir -p "$out"
export KD_BUILD_DIR=".kd-$name/nuxt" KD_OUTPUT_DIR=".kd-$name/output"
npx nuxi build > "$out/build.log" 2>&1 || { tail -40 "$out/build.log"; exit 1; }
PORT=$port node ".kd-$name/output/server/index.mjs" > "$out/server.log" 2>&1 &
pid=$!
trap 'kill $pid 2>/dev/null' EXIT
for i in $(seq 1 30); do curl -s -o /dev/null "http://127.0.0.1:$port/" && break; sleep 0.5; done
for r in "$@"; do
  slug=$(echo "$r" | tr '/' '_'); [ "$slug" = "_" ] && slug="_home"
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:$port$r")
  echo "$r -> HTTP $code"
  google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=1440,${SNAP_H:-4000} --virtual-time-budget=5000 --screenshot="$out/desk$slug.png" "http://127.0.0.1:$port$r" 2>/dev/null
  google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars --window-size=390,${SNAP_MH:-5000} --virtual-time-budget=5000 --screenshot="$out/mob$slug.png" "http://127.0.0.1:$port$r" 2>/dev/null
done
grep -iE "error|warn" "$out/server.log" | head -20 || true
echo "screenshots in $out"
