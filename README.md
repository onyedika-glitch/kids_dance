# Tiny Explorers Hub

Website for the Tiny Explorers Hub Facebook page and YouTube channel: short, cheerful learning videos for toddlers
and preschoolers. Nuxt 3 (SSR) + Tailwind, with a Supabase (Postgres) backend.

This project started life as the EYS-Kids Dance Academy site and was repurposed in place: same component system,
data → `server/api` → `useFetch` structure, email pipeline and database, with the studio-only pages removed.
The previous version is archived in `../kids_dance-eys-backup-2026-10-01.tar.gz`.

## Run it locally

```bash
pnpm install
cp .env.example .env        # then fill it in
pnpm build
PORT=3100 pnpm preview      # http://localhost:3100
```

Live reload while editing: `pnpm dev --port 3100`. If that fails with `ENOSPC: System limit for number of file
watchers reached`, run `sudo sysctl fs.inotify.max_user_watches=524288` once.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero, channel figures, pillars, latest videos, ABC teaser, categories, most loved, updates |
| `/videos`, `/videos/[slug]` | Video library (filters, search) and a page per video (player, likes, share, try-this) |
| `/abc` | ABC Adventure: A–Z grid, one video per letter |
| `/ranking` | Most Loved: videos ranked by likes |
| `/news`, `/news/[id]` | Updates |
| `/support`, `/support/thanks` | Support Us: one-off gifts via Paystack + sponsorship packages |
| `/work-with-us` | Pitch for brands and schools + inquiry form |
| `/parents`, `/about`, `/privacy` | Parents' guide, about + contact, privacy policy |

Old dance-site URLs (`/courses`, `/pricing`, `/studios/...` …) redirect to their new equivalents (`nuxt.config.ts` → `routeRules`).

## Backend (Supabase)

Schema: `supabase/migrations/` (both files, in order). Content: `supabase/seed.sql`. Both are applied to the project.

| Table | Used for |
| --- | --- |
| `videos` | The video library. A row plays a self-hosted MP4 (`media_file`) or a YouTube video (`youtube_id`). |
| `video_likes` | One like per browser per video (anonymous hashed id) → Most Loved ranking |
| `site_stats` | Home-page figures: `video_plays`, `recommend_pct`, `reviews`. A missing row is simply not shown. |
| `inquiries` | Messages from the Work With Us / About forms (also emailed to `NUXT_NOTIFY_EMAIL`) |
| `donations` | Paystack support payments; status is only ever set from Paystack's verified response |

## Adding a new video

1. Download it from Facebook into `../tiny-explorers-assets/facebook-videos/` (the filename starts with the Facebook video id).
2. Add a line to `scripts/videos.tsv`: `<facebook id>` TAB `<slug>` TAB `<second for the thumbnail>`.
3. Run `pnpm videos`: it converts the clip to H.264 MP4 (Facebook downloads are AV1/VP9, which many phones can't play) and makes thumbnails.
4. Add the row in Supabase → `videos`: `slug`, `title`, `category`, `letter` (for ABC videos), `description`, `try_this`,
   `media_file` = `<slug>.mp4`, `facebook_id`, `duration`, `published_at`.
5. `pnpm build` and restart (the new MP4/thumbnail files ship with the build).

A YouTube-only video needs just a `videos` row with `youtube_id` (no files).

## Money

- **Paystack:** set `NUXT_PAYSTACK_SECRET_KEY` (test key first) and add the webhook URL `https://<domain>/api/paystack/webhook`
  in the Paystack dashboard. Without a key the Support page shows "Online giving is coming soon".
- **Sponsorship packages** and their starting prices live in `data/support.ts` (placeholders: agree the real prices with the page owner).
- **Inquiries** arrive by email and in the `inquiries` table.

## Notes

- Videos are served from `/v/<file>.mp4` by `server/routes/v/[file].get.ts`, which supports HTTP range requests (iPhone/iPad
  Safari won't play video without them). Run the server from the project root, or set `MEDIA_DIR`.
- Nothing is collected from children. Forms are adults-only; likes use an anonymous random cookie stored only as a hash.
- `scripts/snap.sh <name> <port> <outdir> /route …` builds into `.kd-<name>/` and screenshots routes at 1440px and 390px.
- `dance.eys-kids.com/` holds the original EYS Figma screenshots (reference only, not used by the site).
