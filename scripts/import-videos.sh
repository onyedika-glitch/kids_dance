#!/usr/bin/env bash
# Converts downloaded Facebook videos into web-ready files:
#   public/videos/<slug>.mp4        H.264 + AAC (plays on every phone and browser; the originals are AV1/VP9)
#   public/images/posters/<slug>.webp and <slug>-sm.webp   thumbnails
# Usage: pnpm videos [source-dir]   (default: ../tiny-explorers-assets/facebook-videos)
# Add a line to scripts/videos.tsv for each new video, then add the video's row in Supabase
# (videos table: slug, title, category, media_file = <slug>.mp4, facebook_id, ...).
set -euo pipefail
cd "$(dirname "$0")/.."
SRC=${1:-../tiny-explorers-assets/facebook-videos}
mkdir -p public/videos public/images/posters
while IFS=$'\t' read -r id slug sec; do
  [[ -z "$id" || "$id" == \#* ]] && continue
  src=$(ls "$SRC"/"$id"-*.mp4 2>/dev/null | head -1 || true)
  if [[ -z "$src" ]]; then echo "missing source for $slug ($id)"; continue; fi
  out=public/videos/$slug.mp4
  if [[ ! -f "$out" || "$src" -nt "$out" ]]; then
    ffmpeg -nostdin -v error -y -i "$src" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -vf "scale='min(1280,iw)':-2" \
      -c:a aac -b:a 96k -movflags +faststart "$out"
  fi
  ffmpeg -nostdin -v error -y -ss "${sec:-3}" -i "$src" -frames:v 1 -vf scale=1280:-2 -c:v libwebp -quality 78 public/images/posters/$slug.webp
  ffmpeg -nostdin -v error -y -ss "${sec:-3}" -i "$src" -frames:v 1 -vf scale=480:-2 -c:v libwebp -quality 75 public/images/posters/$slug-sm.webp
  echo "ok $slug $(du -h "$out" | cut -f1)"
done < scripts/videos.tsv
