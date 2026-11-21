# SUSALI Health Care Services — website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP ScrollTrigger · Lenis. It builds as a **static export** to `out/`, which you can host on Cloudflare Pages or Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
npm start          # preview ./out
npm run frames     # regenerate frame sequences from videos/*.mp4 (needs ffmpeg + cwebp)
```

## Where things live

| What | File |
|---|---|
| Company name, email, phone, WhatsApp, address, map, form endpoint, app links | `lib/site.ts` |
| All English text | `lib/i18n/en.ts` |
| All Telugu text | `lib/i18n/te.ts` |
| Verbatim copy of the live susali.in content (reference) | `content/original/en/*.md`, `content/original/te/*.md`, `content/original/source-dictionary.json` |
| Pages | `components/pages/*Page.tsx` (routes in `app/(en)` and `app/(te)/te`) |
| Home sections | `components/home/*.tsx` |
| Colours and fonts | `app/globals.css` (`@theme` block) |
| Scroll-frame engine | `components/ui/ScrollSequence.tsx` |

Everything outside the `added: { … }` block in `en.ts` and `te.ts` is copied word for word from www.susali.in. Text in the `added` block is new, and each line carries a `// TODO-REVIEW` comment.

## Replacing placeholders

- **Phone, WhatsApp, address and map:** edit `site.contact` in `lib/site.ts`. For the map, open Google Maps → Share → *Embed a map*, and paste only the `src="…"` URL into `mapEmbed`.
- **Contact form:** create a form at formspree.io and paste its endpoint into `site.formEndpoint`.
- **Domain:** `site.url` drives the canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph tags and JSON-LD.

## Images

- Content images downloaded from the live site are in `public/images/original/`, at the same sub-paths (`services/01.webp`, `hero-bg.jpg`, `about-intro.jpg`, `about-intro1.jpg`). To replace one, overwrite the file with the same name. To use a new name, change the path in the component (search the code for `images/original`).
- Service card images come from `services.list[].image` in `lib/i18n/*.ts`.
- Social share image: `public/og-image.png` (1200×630).

## Logo

- Navbar, footer and loader all use `public/brand/susali-logo.webp`, made from `public/brand/susali-logo.png` (the live site's logo, trimmed of transparent padding). Replace the `.webp` to change it everywhere. If the new file's aspect ratio is very different, also update `width`/`height` in `components/layout/Navbar.tsx`, `Footer.tsx` and `components/ui/Loader.tsx`.
- Favicon: `public/brand/icon-64.png`. Apple touch icon: `public/brand/apple-icon.png`. Both are made from `emblem.png`.

## Scroll videos → frames

1. Put the new `hero.mp4`, `records.mp4` and `network.mp4` in `videos/`. The folder is git-ignored.
2. Run `npm run frames`. This writes `public/frames/<name>/0001.webp…` (30 fps, 1920 px, q70), plus `public/frames/<name>/m/…` (every second frame, 960 px), and updates `lib/frames.json`.
3. The script lifts the light-grey video backgrounds to pure white so the frames blend into the page. Tune the `case "$n"` levels in `scripts/extract-frames.sh` if a new video has a different background.

## Floating hero and floating style

| What | Where |
|---|---|
| Hero card text (A BETTER CARE JOURNEY, Patients & Doctors, chips, Your Records, Connected Care…) | `heroVisual` in `lib/i18n/en.ts` / `te.ts` (copied from the live site) |
| Hero cards' layout, icons and ECG line | `components/float/HeroCards.tsx` |
| Hero photo | `HERO_PHOTO` at the top of `components/home/Hero.tsx` (currently `/images/original/hero-bg.jpg`) |
| Positions of the hero cards, icon tiles and spheres, plus their exit directions | `components/home/Hero.tsx` (each element's `className` position, `exit="x,y"`, `depth`, `dur`) |
| Icon tile icons and colours | the `icon={…}` and `tone="blue"/"purple"/"pink"/"mint"` props in `Hero.tsx` (lucide icons; gradient colours in `IconGradients` in `components/float/FloatingIconTile.tsx`) |
| Sphere colours | `.sphere-teal / -lav / -pink / -glass` in `app/globals.css` |
| Background sphere sets used in sections | presets `a`, `b`, `c` in `components/float/SphereField.tsx` |
| About hero icons along the dotted line | `NODES` and `PATH` in `components/float/AboutHeroVisual.tsx` |
| Floating cards over Records | `components/home/Records.tsx` |

Reusable pieces: `<FloatingCard>`, `<FloatingIconTile>`, `<GlassSphere>`, `<Floater>` and `<FloatLayer>`, all in `components/float/`. `<FloatLayer>` runs the idle float (GSAP, sine.inOut yoyo) and the mouse parallax (`depth` 0–1, desktop only). It pauses everything off screen and stays static with prefers-reduced-motion.

## Legal text

`/privacy`, `/terms` and `/account-deletion`, plus their `/te/…` versions, all render `components/pages/LegalPage.tsx`. Paste the reviewed text between the `LEGAL TEXT GOES HERE` markers. If the text differs per page, branch on `kind` (`"privacy" | "terms" | "deletion"`) and per language on `lang`.

## Deploying

- **Cloudflare Pages:** build command `npm run build`, output directory `out`.
- **Vercel:** import the repo. It detects Next.js, and `output: "export"` produces a static site.
