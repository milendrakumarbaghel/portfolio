# milendra.site — Portfolio of Milendra Kumar Baghel

Personal portfolio of a software engineer working across Java/Spring Boot systems, full-stack React applications,
AI-assisted hackathon projects and websites for real businesses.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Motion · React Three Fiber + Drei · Lenis · React Router 7 · Vercel

## Highlights

- **Procedural 3D hero** — an "engineering monolith" with shader-driven circuit pulses, an orbiting node network and a
  baked PMREM studio environment (no external models or HDR files). It lazy-loads after first paint, pauses off-screen,
  adapts its pixel ratio, and falls back to a hand-drawn SVG on phones, low-power devices, without WebGL, and for
  reduced-motion users.
- **Client case studies** — live client sites shown in scroll-driven browser and phone mockups using real screenshots.
- **Filterable engineering projects**, each with its own case-study page at `/work/:slug`.
- **Skills that show their evidence** — select a technology to see the roles and projects where it was used. Nothing
  is self-rated.
- **Working contact form** — a Vercel serverless function that sends through Resend, with validation, a honeypot,
  a timing check, origin checks and rate limiting. If it can't send, the form says so and offers a pre-filled email.
- Accessibility: semantic landmarks, a skip link, visible focus styles, keyboard-safe mobile menu with a focus trap,
  `aria-pressed` filters, live regions and `prefers-reduced-motion` support throughout.
- SEO: per-route titles, descriptions and canonicals; Open Graph and Twitter cards; Person JSON-LD plus per-project
  structured data; a sitemap generated at build time from project data; and `robots.txt`.

## Getting started

Requires Node 20+ (developed on Node 23).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                             |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Vite dev server                                          |
| `npm run build`     | Type-check (`tsc -b`) and production build to `dist/`    |
| `npm run preview`   | Serve the production build locally                       |
| `npm run typecheck` | TypeScript only                                          |
| `npm run lint`      | ESLint (TypeScript + React hooks rules)                  |
| `npm test`          | Content and validation tests (Node's built-in test runner) |

> The Vite dev server does not run `/api` functions. Locally the contact form will show its email fallback.
> Use `npx vercel dev` to exercise the real endpoint.

## Project structure

```text
api/
  contact.ts            POST /api/contact — Vercel function (Resend)
  _lib/validate.ts      Validation shared by the function and the form
src/
  app/App.tsx           Shell: header, route transitions, smooth scroll, cursor
  components/
    animations/         MaskText (word reveal), Reveal, RoleTicker
    layout/             SiteHeader, Footer, SmoothScroll, ScrollProgress, CustomCursor, ErrorBoundary
    projects/           ClientCase, EngineeringCard, DeviceFrames, ProjectCover, GenerativeCover
    three/              HeroScene (R3F), HeroFallback (SVG), HeroVisual (chooser)
    ui/                 Button, Magnetic, Tilt, SectionHeading, SectionLink, Img, Tag, BrandIcons
  data/                 personal, projects, experience, skills, achievements — all site content
  hooks/ lib/ types/
  pages/                HomePage, ProjectDetailPage, NotFoundPage
  sections/             Hero + below-the-fold sections (lazy-loaded as one chunk)
public/
  projects/<slug>/      Optimised WebP screenshots (800w + 1440w, phone 780×1688)
  resume/               Résumé PDF
  og.png, icons, robots.txt, site.webmanifest
tests/content.test.ts   Guards slugs, links, image paths, nav coverage and validation rules
```

## Editing content

All copy lives in `src/data/`. Components never hard-code project details.

**Add a project:** append an entry to `projects` in `src/data/projects.ts`.

- `kind: 'client'` renders as an editorial case study in Featured Client Work and requires `links.live`.
- `kind: 'engineering'` renders as a card in Things I've Engineered and requires `links.github`.
- `cover` takes either a screenshot (use the `shot()` helper) or `{ generative: 'diagnostics' | 'site-plan' | 'policy-flow' | 'route-network' }`
  for projects without a public UI.
- Optional fields (`links.live`, `links.demoVideo`, `gallery`, `mobile`, `context`, `team`, `period`, `notes`, `sections`)
  are simply left out when they don't apply. No empty buttons are rendered.
- Mark older work with `archived: true` to list it under "Earlier projects".

Run `npm test` afterwards. It fails if a slug is duplicated, an image is missing from `public/`, or a link isn't https.

**Screenshots:** export desktop captures at 1440×900 and convert them to `name-1440.webp` and `name-800.webp`. Export phone
captures at 390×844 @2x as a single 780×1688 WebP.

**Résumé:** replace `public/resume/Milendra_Kumar_Baghel_Resume.pdf`. The old `/Resume.pdf` URL redirects there.

## Contact form setup

1. Create an API key at [resend.com](https://resend.com/api-keys).
2. In Vercel → Project → Settings → Environment Variables, add:

   | Variable             | Required | Notes                                                                         |
   | -------------------- | -------- | ----------------------------------------------------------------------------- |
   | `RESEND_API_KEY`     | yes      | Without it the endpoint returns `503` and the form offers the email fallback. |
   | `CONTACT_TO_EMAIL`   | no       | Defaults to `baghelmilendrakumar@gmail.com`.                                  |
   | `CONTACT_FROM_EMAIL` | no       | For example `Portfolio <hello@milendra.site>` once the domain is verified in Resend. Until then, Resend's `onboarding@resend.dev` only delivers to your own Resend account email. |
   | `ALLOWED_ORIGINS`    | no       | Extra origins (comma-separated); the deploying host is always allowed.        |

3. Redeploy, then send a test message from the live site.

Rate limiting is in-memory per function instance, so it is best-effort. For strict limits, back it with a shared
store such as Upstash Redis.

## Deployment (Vercel)

1. Import the repository in Vercel. `vercel.json` sets the Vite framework, the `npm run build` build command and the
   `dist` output directory.
2. Add the environment variables above.
3. Add the custom domain `milendra.site` under Project → Domains and create the DNS records Vercel shows.
4. `vercel.json` already handles:
   - SPA rewrites (excluding `/api` and static files)
   - long-lived caching for hashed assets
   - security headers
   - redirects from the old routes (`/about`, `/projects`, `/skills`, `/contact`, `/Resume.pdf`)

## Performance notes

- The first load contains React, Router, Motion and the hero. All other sections arrive in one lazy chunk, and the
  WebGL scene (~250 KB gzipped, mostly three.js) is fetched only during idle time on tablets and desktops.
- Lighthouse results on the local production build:

  | Page / profile             | Performance | Accessibility | Best practices | SEO |
  | -------------------------- | ----------- | ------------- | -------------- | --- |
  | Home, desktop              | 98          | 100           | 100            | 100 |
  | Home, mobile               | ~87         | 100           | 100            | 100 |
  | Case-study page, mobile    | 90          | 100           | 100            | 100 |

  The mobile profile uses throttled 4G with a 4× CPU slowdown; there the remaining cost is the client-rendered React bundle.
