# EYS-Kids Dance Academy

Nuxt 3 (SSR) + Tailwind CSS site built from the Figma screenshots in `dance.eys-kids.com/static/`.

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm run dev
```

If the dev server fails with `ENOSPC: System limit for number of file watchers reached`, raise the inotify limit
(`sudo sysctl fs.inotify.max_user_watches=524288`) or use `scripts/snap.sh` below.

## Production

The site uses server API routes (`server/api/*`, including the free-trial booking `POST /api/trial`), so deploy it as a Node server:

```bash
pnpm run build
node --env-file=.env .output/server/index.mjs   # PORT=3000 by default
```

Copy `.env.example` to `.env` and fill in the database and Resend settings (on a host, set them as environment variables instead).

## Backend (Supabase)

Schema: `supabase/migrations/20260926000000_init.sql` (already applied to the project). Content seed: `supabase/seed.sql` (video cards).
`supabase/seed.sample.sql` holds the Figma placeholder figures — for a staging database only, never production.

Edit these tables in the Supabase Table Editor; the site picks changes up within a minute:

| Table | Shows up as |
| --- | --- |
| `site_stats` (key `members_total`, `value`, `as_of`) | "Over N kids learn with us nationwide" counter on the home page |
| `member_history` (`year`, `members`) | Member growth bar chart on the home page |
| `surveys` (set `published = true`), `ranking_reasons`, `ranking_voices` | /ranking — ranks are computed from `votes`; `respondents` fills the "N responses" note |
| `videos` (`placement` = home / workshop / activity, `youtube_id`, `sort`) | Video carousels; cards with a `youtube_id` play in a popup |
| `trial_bookings` | Every free-trial booking (`status` for follow-up) |

A figure with no row is simply not shown — the site never falls back to made-up numbers.

Bookings are saved to `trial_bookings` and emailed to `NUXT_NOTIFY_EMAIL` via Resend (the parent also gets a confirmation once the sending domain is verified). If neither the database nor email is reachable the API returns 503 and the form points the parent to the phone number.

Studio maps are live Leaflet maps on a label-free basemap (keyless tile services label Japan in Japanese, so English names come from the markers; set `NUXT_PUBLIC_MAP_TILE_URL` to a keyed provider for English street labels). Each studio's `lat`/`lng` in `data/studios.ts` was geocoded from its address.

## Structure

- `data/*.ts` — page copy (courses, studios, instructors, events, news, campaign…). Figures, videos and bookings live in Supabase (see above).
- `server/api/*` — JSON endpoints; pages load them with `useFetch`. `server/utils/db.ts` is the Postgres connection.
- `components/` — shared UI (`AppHeader`, `AppFooter`, `PageHero`, `ChamferCard`, `HexFrame`, `SkewButton`, `DisplayTitle`, `FreeTrialCta`, `CampaignBanner`) and per-page folders (`home/`, `courses/`, `studio/`, `people/`, `event/`…).
- `data/campaign.ts` — campaign copy and deadline; the banner counts down and hides itself after the deadline.
- `public/images/` — WebP photos cropped from the Figma screenshots. Replace with original high-resolution photos before launch.

## Screenshots

`scripts/snap.sh <name> <port> <outdir> /route ...` builds into `.kd-<name>/`, serves it, and captures 1440px and 390px screenshots with headless Chrome.
