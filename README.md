# Dicky Maulana — Portfolio

Personal portfolio site. Frontend only, no framework template, no UI kit.

**Stack:** React 19 · TypeScript · Vite · CSS Modules · Anime.js 4 · npm

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |

---

## Folder structure

```
portfolio/
├── index.html                  Entry document + pre-paint theme & route scripts
├── vite.config.ts              Vite config, "@" alias, CSS Modules naming
├── tsconfig.json               Strict TypeScript config
├── vercel.json                 SPA rewrite so /projects deep-links resolve
├── assets/                     Sources, not served
│   ├── og-image.svg            Source for the social share card
│   ├── image.png               Early portrait crop (unused)
│   └── image2.jpeg             Original portrait, 853 × 1280
├── public/                     Served as-is at the site root
│   ├── favicon.svg
│   ├── og-image.png            Social share card (1200 × 630)
│   ├── Dicky-Maulana-CV.pdf    Served by the "Download CV" buttons
│   ├── portrait.jpg            Hero portrait (see "Your photo")
│   ├── _redirects              Netlify SPA fallback
│   └── 404.html                GitHub Pages / S3 deep-link fallback
└── src/
    ├── main.tsx                React root + ThemeProvider + RouterProvider
    ├── App.tsx                 Route table + page chrome (header, footer)
    ├── App.module.css
    │
    ├── pages/                  One file per route
    │   ├── HomePage.tsx        "/" — section order lives here
    │   ├── ProjectsPage.tsx    "/projects" — full archive + tech filter
    │   ├── ExperiencePage.tsx  "/experience" — long-form career journey
    │   └── NotFoundPage.tsx
    │
    ├── types/
    │   ├── portfolio.ts        Every content shape (Profile, Experience, ...)
    │   ├── env.d.ts            import.meta.env typings
    │   └── css-modules.d.ts    Typing for *.module.css imports
    │
    ├── data/                   ← ALL CONTENT LIVES HERE
    │   ├── profile.ts          Name, headline, bio, socials
    │   ├── navigation.ts       Nav items + section ids
    │   ├── experiences.ts      Work history timeline
    │   ├── skills.ts           Top skills + grouped skill sets
    │   ├── work.ts             Selected work / case studies
    │   ├── education.ts        Education, certifications, languages
    │   └── stackLayers.ts      Labels on the 3D stack graphic
    │
    ├── lib/                    Pure helpers, no React
    │   ├── date.ts             ISO "YYYY-MM" → labels, durations
    │   ├── stats.ts            Hero stats derived from the data files
    │   ├── style.ts            Inline custom-property helpers
    │   ├── motion.ts           Shared easings + reduced-motion check
    │   ├── inView.ts           One-shot IntersectionObserver trigger
    │   └── cn.ts               Class name joiner
    │
    ├── hooks/
    │   ├── useTheme.ts         Reads the theme context
    │   ├── useRouter.ts        Current path + navigate()
    │   ├── useHeroIntro.ts     Anime.js hero timeline (split text)
    │   ├── useEnterAnimation.ts  Anime.js "--enter" on scroll into view
    │   ├── useTilt.ts          Pointer-driven 3D tilt + light sheen
    │   ├── useScrollSpy.ts     Active section for the nav
    │   ├── useScrollProgress.ts
    │   ├── useScrolled.ts      Header state on scroll
    │   ├── useReveal.ts        IntersectionObserver fade-in
    │   ├── useLockBodyScroll.ts
    │   └── useCopyToClipboard.ts
    │
    ├── context/
    │   ├── theme-context.ts    Context object + types
    │   ├── ThemeProvider.tsx   Theme state, storage, OS sync
    │   ├── router-context.ts   Route types + base-path helpers
    │   └── RouterProvider.tsx  History API routing, ~70 lines, no dependency
    │
    ├── styles/
    │   ├── tokens.css          Design tokens + light/dark palettes
    │   ├── reset.css
    │   └── global.css          Base layer + reveal styles
    │
    └── components/
        ├── layout/             Header, Footer, Container, Backdrop, PageIntro
        ├── ui/                 Button, Badge, Card, Section, Icon, Link,
        │                       ThemeToggle, ScrollProgress, StatValue
        └── sections/           Hero, PortraitArch, About, StackVisual,
                                Work, ProjectCard, ProjectCover, Experience,
                                ExperienceItem, Skills, Education, Contact
```

### Routes

| Path | What it is |
| --- | --- |
| `/` | The one-page portfolio. Work and Experience show a highlighted subset only. |
| `/projects` | Every published project, filterable by technology. |
| `/experience` | The full career journey, long-form, including the pre-software roles. |

Routing is a ~70-line History API provider in `src/context/` — no `react-router`.
Internal links use `<Link to="…">` (or `<Button to="…">`); `/#work` navigates home
*and* scrolls to that section, so the header nav works from any page.

Deep links need a host that serves `index.html` for unknown paths. `vercel.json`
covers Vercel, `public/_redirects` covers Netlify, and `public/404.html` covers
GitHub Pages / plain S3 — if you serve from a subpath, set `ROOT` inside it.

**Rule of thumb:** content goes in `src/data`, look-and-feel goes in `src/styles/tokens.css`, everything else is plumbing.

---

## Editing content

You should not need to touch a component to update the site.

| I want to change... | Edit |
| --- | --- |
| Name, bio, email, social links | `src/data/profile.ts` |
| A job, its bullets, or its tech tags | `src/data/experiences.ts` |
| The long-form story for a role on `/experience` | `chapter` + `story` fields in `experiences.ts` |
| How many roles the home page shows before "Read the full journey" | `recentExperiences` slice at the bottom of `experiences.ts` |
| Which projects the home page highlights | `featured` / `highlight` flags in `work.ts` |
| Whether a role sits in the timeline or in "Before software" | `track` field in `experiences.ts` |
| The CV served by the Download buttons | replace `public/Dicky-Maulana-CV.pdf` |
| Project / case study cards | `src/data/work.ts` |
| Skill groups | `src/data/skills.ts` |
| Degrees & certifications | `src/data/education.ts` |
| Section names or order in the nav | `src/data/navigation.ts` + `src/pages/HomePage.tsx` (keep both in the same order — the scroll-spy relies on it) |

Dates use the ISO month format `"YYYY-MM"`. Set `end: null` on the current
role — the timeline then prints "Present" and marks it as active.

Durations, the "years in tech" figure, the company count, and the copyright
year are all computed at runtime, so they never go stale.

### Your photo

The hero shows your portrait in an arch frame — rounded at the top, square at
the bottom — with an offset accent outline behind it and a soft scrim fading
the bottom edge into the page. The current photo is
**`public/portrait.jpg`** (source kept at `assets/image2.jpeg`).

To swap it, drop a new file into `public/` and point `avatar` at it in
`src/data/profile.ts`:

```ts
avatar: '/portrait.jpg',
```

Only files inside `public/` are served — an image left in `assets/` will 404.

**Reframing the crop.** The 3:4 frame is a window onto a larger copy of the
photo, positioned by three custom properties on `.photo` in
`src/components/sections/PortraitArch.module.css`:

| Property | Default | Effect |
| --- | --- | --- |
| `--photo-zoom` | `136%` | Photo width relative to the frame. Higher = tighter crop. |
| `--photo-x` | `-21%` | Horizontal pan. More negative moves the visible window to the right. |
| `--photo-y` | `-9%` | Vertical pan. More negative moves the window down. |

These defaults show the current photo from just above the head down to
mid-thigh. If you swap in a photo with different framing, adjust `--photo-y`
first until the head sits a little below the top of the arch, then `--photo-x`
to centre the subject.

Guidelines for a replacement: at least 800 px on the short side, subject facing
the camera, ideally under 300 KB. Until the file exists the frame falls back to
your initials on a grid — the layout never breaks, and there is no broken-image
icon.

### Projects — the file to edit is `src/data/work.ts`

Every card in the Work section comes from that one file. The last four entries
have the ids **`sample-inventory`, `sample-pos`, `sample-cms`, `sample-tasks`**
and are **placeholders** — invented titles and copy, meant to be overwritten
with your real projects before the site goes public.

```ts
{
  id: 'inventory-app',
  featured: false,
  title: 'Inventory App',
  context: 'Freelance',
  period: '2025',
  description: 'What it does and who it is for.',
  contributions: ['What you built.', 'A measurable result.'],
  stack: ['React', 'NestJS', 'PostgreSQL'],
  href: 'https://example.com',
  repo: 'https://github.com/mbahdukun1/inventory-app',
  image: '/projects/inventory.png',
}
```

| Field | What it does |
| --- | --- |
| `featured` | Promotes the card to the large two-column card at the top of the home page. Exactly one project should have it. |
| `highlight` | Shows the card on the home page next to the featured one. Everything without it lives only on `/projects`. Keep this to about three. If you change which projects are highlighted, update the Work section's `description` in `src/components/sections/Work.tsx` — it names the four domains on show. |
| `href` | Turns the title into a link and adds a **Live** link in the footer. |
| `repo` | Adds a **Source** link. Leave either as `''` and it disappears. |
| `image` | One screenshot for the cover — put the file in `public/projects/` and reference it from the site root (`/projects/name.jpg`). |
| `images` | Two or more screenshots, rendered as a clickable 3D stack: clicking a card behind brings it to the front and sends the current one back. Overrides `image`. |

If a path is wrong the broken shot is dropped automatically, and a card with no
usable image falls back to a generated cover built from the project's initials.

Compress screenshots before adding them — a raw PNG screenshot is often
~1 MB, while the same shot as JPEG at quality 82 is under 100 KB.
| `draft` | `true` hides the card entirely and excludes it from the "Systems delivered" stat. Use it for work in progress. |

Recruiters click links before they read prose. Two projects with a working
`href`, `repo`, or screenshot do more for you than five described in text.

---

## Share preview (OG image)

`public/og-image.png` is what LinkedIn, WhatsApp, and X show when the link is
shared. The source lives at `assets/og-image.svg`; edit that and re-export to
PNG at 1200 × 630 if you want to change it.

**After deploying, make the URLs absolute** in `index.html` — some crawlers
refuse relative ones:

```html
<meta property="og:image" content="https://your-domain.com/og-image.png" />
<meta name="twitter:image" content="https://your-domain.com/og-image.png" />
```

Add `<meta property="og:url" content="https://your-domain.com/" />` at the same
time.

---

## Theming

All colours are CSS custom properties defined in `src/styles/tokens.css`:
one `:root` block for scales (type, spacing, radii, motion), then
`[data-theme='dark']` and `[data-theme='light']` blocks for the palettes.

To change the accent colour, edit `--accent`, `--accent-strong`,
`--accent-muted`, and `--accent-contrast` in both palette blocks.

The light palette is deliberately **smoke white** — `--bg` is `#f1f2ef` and even
raised surfaces stop at `#f8f9f6`. There is no pure `#ffffff` anywhere in it; the
page reads as paper rather than a lightbox, and the card edges stay visible.
If you brighten `--surface`, brighten `--bg` with it or the cards will vanish.

The theme is resolved before first paint by a small script in `index.html`
(so there is no flash of the wrong theme), stored in `localStorage`, and
follows the OS preference until the visitor makes an explicit choice.

---

## Depth & motion

The 3D work is CSS transforms only — no WebGL, no animation library.

| Piece | Where | How it works |
| --- | --- | --- |
| Layered backdrop | `components/layout/Backdrop.tsx` | Fixed stack of horizon glow, two drifting aura blobs, masked grid, film grain. Sits at `z-index: -1` inside `#root`. |
| Portrait arch | `components/sections/PortraitArch.tsx` | Arch-shaped frame that tilts toward the pointer, with an accent outline pushed back on the Z axis so it parallaxes behind the photo. |
| Stack graphic (About) | `components/sections/StackVisual.tsx` | Four planes in a `preserve-3d` scene, each pushed back on the Z axis. Rotation reacts to the pointer. |
| Card tilt | `hooks/useTilt.ts` + `ui/Card.tsx` | Pointer position becomes `--tilt-x` / `--tilt-y` (rotation) and `--pointer-x` / `--pointer-y` (a light sheen that follows the cursor). Pass `tilt` to `<Card>`. |
| Raised surfaces | `--plane`, `--sheen`, `--lift-shadow` tokens | A gradient "top light" plus an inset highlight and a soft cast shadow on hover. |
| Scroll progress | `ui/ScrollProgress.tsx` | 2px accent bar driven by `scaleX`. |

Tilt is skipped entirely on touch devices and under
`prefers-reduced-motion: reduce`; the aura drift and hero bob stop there too.

### Anime.js

Continuous loops (orbits, aura drift, pulse) stay in CSS because the browser
runs them for free. Anime.js drives the things CSS cannot express well —
sequencing, per-character text, and counting numbers.

| Animation | Where | Anime.js API |
| --- | --- | --- |
| Hero entrance sequence | `hooks/useHeroIntro.ts` | `createTimeline` + `splitText` — the name is split into characters and staggered in, then the headline, tagline, meta, buttons, and skill row follow on an absolute timeline. |
| Stat counters | `ui/StatValue.tsx` | `animate` on a plain JS object, with `onUpdate` writing the rounded value into the DOM. The numeric suffix (`4+`) is preserved. |
| 3D visuals entering view | `hooks/useEnterAnimation.ts` | `animate` on the CSS variable `--enter`, which the stylesheets fold into their own transforms — so Anime.js never fights the CSS 3D transforms. |

All three are triggered by `lib/inView.ts` (a one-shot IntersectionObserver)
and skipped entirely under `prefers-reduced-motion: reduce`. Every animated
element is styled to look correct at its final state, so if a script is blocked
the page still renders fully.

Timelines are reverted on unmount (`timeline.revert()`, `splitter.revert()`),
which keeps React Strict Mode's double-mount from stacking split text.

---

## Accessibility & performance notes

- Skip link, `aria-current` on the active nav item, labelled sections, and
  `aria-expanded` on the mobile menu.
- All animation is disabled under `prefers-reduced-motion: reduce`.
- Two runtime dependencies only: React and Anime.js. No icon library (icons are
  inline SVG in `src/components/ui/Icon.tsx`), no CSS framework.
- Production bundle: ~92 kB gzipped JS, ~8 kB gzipped CSS.

---

## Deploy

The build output in `dist/` is a static site. Any static host works:

```bash
npm run build
```

- **Vercel / Netlify** — framework preset "Vite", build `npm run build`, output `dist`.
- **Firebase Hosting** — `firebase init hosting`, public directory `dist`, single-page app: yes.
- **GitHub Pages** — set `base: '/<repo-name>/'` in `vite.config.ts` before building.
