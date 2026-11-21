#!/usr/bin/env bash
# Converts videos/*.mp4 into WebP frame sequences for <ScrollSequence>.
#   npm run frames                      -> all three videos
#   bash scripts/extract-frames.sh hero -> one video
# Desktop: 30fps, 1920px wide, quality 70  -> public/frames/<name>/0001.webp …
# Mobile : every 2nd frame (15fps), 960px  -> public/frames/<name>/m/0001.webp …
# The level lift turns the light-grey video backgrounds into pure white so they blend into the page.
set -euo pipefail
cd "$(dirname "$0")/.."; ROOT="$PWD"
command -v cwebp >/dev/null || { echo "Install cwebp: brew install webp"; exit 1; }
names="$*"; [ -z "$names" ] && names="hero records network"
for n in $names; do
  src="videos/$n.mp4"; [ -f "$src" ] || { echo "skip: $src not found"; continue; }
  case "$n" in hero) lv=0.86;; records) lv=0.84;; *) lv=1;; esac
  out="public/frames/$n"; rm -rf "$out"; mkdir -p "$out/m"
  lift="colorlevels=rimax=$lv:gimax=$lv:bimax=$lv"
  tmp="$(mktemp -d)"; mkdir -p "$tmp/d" "$tmp/m"
  # ffmpeg -> lossless PNG, then cwebp (many ffmpeg builds lack libwebp)
  ffmpeg -v error -i "$src" -vf "fps=30,$lift,scale=1920:-2:flags=lanczos" "$tmp/d/%04d.png"
  ffmpeg -v error -i "$src" -vf "fps=15,$lift,scale=960:-2:flags=lanczos" "$tmp/m/%04d.png"
  for f in "$tmp"/d/*.png; do echo "$f"; done | xargs -P 8 -I{} sh -c 'cwebp -quiet -q 70 -m 4 "$1" -o "$2/$(basename "$1" .png).webp"' _ {} "$ROOT/$out"
  for f in "$tmp"/m/*.png; do echo "$f"; done | xargs -P 8 -I{} sh -c 'cwebp -quiet -q 68 -m 4 "$1" -o "$2/$(basename "$1" .png).webp"' _ {} "$ROOT/$out/m"
  rm -rf "$tmp"
  echo "$n: $(ls "$out"/*.webp | wc -l | tr -d ' ') desktop, $(ls "$out"/m/*.webp | wc -l | tr -d ' ') mobile ($(du -sh "$out" | cut -f1))"
done
node scripts/write-frame-manifest.mjs
