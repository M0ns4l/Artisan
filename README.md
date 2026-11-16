# Monsal Dawa — Portfolio

Personal portfolio for a senior programmer / full-stack software engineer. It's a static single-page app with case studies, experience, skills and contact pages. All the public copy lives in typed data files, so you can change the content without touching components.

**Stack:** React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · React Router 8 · Motion · lucide-react · Vitest + Testing Library · Playwright · oxlint

## Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server (http://localhost:5173) |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with oxlint (React, a11y, TypeScript rules) |
| `npm run typecheck` | TypeScript project build check |
| `npm test` | Unit/integration tests (Vitest + jsdom) |
| `npm run test:e2e` | Playwright smoke tests at 1366px and 360px (builds and serves automatically). First run: `npx playwright install chromium` |
| `npm run check` | Lint, type-check, test and build in one go |
| `npm run assets:share` | Re-render `public/og-image.png` and `public/apple-touch-icon.png` |
| `npm run assets:profile` | Create the optimized `profile.webp` from `public/Profile/profile.png` |
| `npm run assets:logo` | Trim the Artisan logos in `public/logo/` into the header wordmarks, favicons and home-screen icon |

## Editing your content

Everything public-facing is in `src/data/`:

| File | Contents |
|---|---|
| `profile.ts` | Name, intro, current role badge, location/timezone, email + LinkedIn/GitHub/Facebook/Instagram, résumé, photo, purpose & target market, About copy, JSON-LD toggle |
| `projects.ts` | Case studies (status, stack, problem, solution, architecture, challenges, security, outcomes, links) |
| `experience.ts` | Work history (consecutive roles at one company are grouped as a career progression) and optional education |
| `skills.ts` | Tech stack with years of experience, tools / AI / servers, capabilities and professional skills |
| `domains.ts` | The niche: operational domains shown on the home page, each linked to case studies by slug |

**Placeholder convention.** Any value written in `[square brackets]`, such as `[YOUR_EMAIL]` or `[Organization name]`, counts as unconfirmed:

- Links and buttons backed by a placeholder stay hidden. You never get a dead `mailto:` or an empty GitHub link.
- Placeholder text shows up as a dashed "to confirm" chip, so nobody mistakes it for fact.

**Projects:**

- `publish: false` hides a project from lists and routes.
- `verified: false` shows a "Draft case study" notice on the case-study page.
- `technologiesVerified: false` labels the stack "to verify".
- `outcomesAreMeasured: true` changes the "Intended outcomes" heading to "Results". Only set it when you have evidence.
- `demoUrl` / `repositoryUrl` only appear when they're valid public URLs. Otherwise private systems show "Private / Internal Project".
- `images` adds a Visuals section. Put screenshots in `public/images/` and reference them as `/images/...`.

**Screenshots:**

1. Put the PNG in `public/thumbnail/`, ideally 16:9.
2. Add a `thumbnail` block to the project in `projects.ts`. The path is case-sensitive on most hosts:

```ts
thumbnail: {
  src: '/thumbnail/hris-thumbnail.png',
  caption: 'Optional caption, e.g. "Dashboard concept with demo data"',
},
```

The screenshot then appears on the home deck, the projects grid and the case study page. Projects without one show a "Screenshot coming soon" panel.

**Résumé:** add `public/resume.pdf` and set `resumeUrl: '/resume.pdf'` in `profile.ts`.

**Photo:** `public/Profile/profile.png`, a transparent PNG. The site serves an optimized copy, `profile.webp`. After replacing the photo, run `npm run assets:profile` to regenerate the WebP, then `npm run assets:share` to update the share image. Paths are case-sensitive on most hosts.

**Theme colours:** the design tokens are CSS variables at the top of `src/index.css`. Light values are under `:root` and dark values under `.dark`.

**Default theme:** light. Visitors can switch to dark, and the choice is remembered. To change the default, edit `var theme = 'light'` in the inline script in `index.html`.

**Home page numbers** (systems built, feature modules, domains) are calculated from `projects.ts` and `domains.ts`. Nobody types them in by hand, so they stay accurate as you edit content.

## Folder map

```text
src/
  app/            routes.tsx (route table, lazy pages), RootLayout.tsx
  components/
    layout/       SiteHeader (incl. mobile menu), SiteFooter, Monogram, navigation
    home/         Hero, HeroVisual, ValuePillars, FeaturedProjects, Skills, ExperiencePreview, ContactCta
    projects/     ProjectCard, ProjectFilters, ArchitectureDiagram
    experience/   ExperienceTimeline
    contact/      ContactActions, CopyEmailButton, SocialLinks, contactLinks
    ui/           Button, Badge/StatusBadge/TechTag, SectionHeading, PageIntro, Reveal, ThemeToggle, BrandIcons
  data/           ← your editable content
  hooks/          useTheme, useCopyToClipboard, useDocumentMeta
  lib/            content validation (placeholders/URLs), project selectors and filters
  pages/          Home, About, Projects, ProjectDetail, Experience, Contact, NotFound
  tests/          Vitest suites
e2e/              Playwright smoke tests
public/           logo/ (Artisan logos), favicons, og-image, apple-touch-icon, profile photo, _redirects
scripts/          share-image renderer
```

## SEO

- Each route sets a unique title, a meta description, Open Graph and Twitter tags (`useDocumentMeta`).
- `index.html` has default tags for crawlers that don't run JavaScript.
- **Set `VITE_SITE_URL`** (e.g. `https://yourdomain.com`) in your host's environment, or in a local `.env`, once you have a domain. That enables:
  - canonical and `og:url` tags, plus absolute share-image URLs
  - a generated `sitemap.xml`, and a `Sitemap:` line in `robots.txt`

  Until then, no fake production URL is emitted. `robots.txt` is always generated.
- JSON-LD `Person` data is off until you set `structuredData: true` in `profile.ts`.

## Deployment

You get a static build in `dist/`. Direct links like `/projects/hris` need an SPA fallback, which is already configured for each host:

- **Netlify:** `netlify.toml` plus `public/_redirects`. Connect the repo, or drag `dist/` into the Netlify dashboard.
- **Vercel:** `vercel.json` rewrites. Import the repo; the framework preset is "Vite".
- **Cloudflare Pages:** build command `npm run build`, output directory `dist`. `public/_redirects` handles the fallback.

Add `VITE_SITE_URL` to the host's environment variables before building.

## Before publishing — checklist

- [ ] Preferred public name and title (`profile.ts`)
- [ ] Gmail, LinkedIn, GitHub, Facebook and Instagram (`profile.ts`). These stay hidden until set
- [ ] Résumé PDF (optional)
- [ ] Which projects may be shown publicly. For each one: ownership, your role, implementation status, stack. Then set `verified: true`
- [ ] Employer name and start date (`experience.ts`); education, if wanted
- [ ] Skill depth labels (`skills.ts`)
- [ ] Screenshots that don't reveal sensitive organizational information
- [ ] `VITE_SITE_URL` once a domain exists
- [ ] Final proofread on mobile and desktop
