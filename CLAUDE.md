# Claude Code Project Brief — Professional Software Engineer Portfolio

> **Purpose:** Paste this entire document into Claude Code (or ask Claude to read it as a project specification) and implement a complete, production-ready personal portfolio website.
>
> **Primary goal:** Present a credible, polished software engineer / senior programmer portfolio that communicates engineering judgment, business impact, system architecture, and practical delivery—not just a collection of UI screenshots.
>
> **Important:** Follow the instructions below without fabricating my professional history, credentials, project outcomes, employer details, links, or metrics. When information is unknown, use clearly marked editable placeholders.

---

## 1. Your Role and Execution Instructions

You are acting as an **expert product designer, senior frontend engineer, accessibility specialist, and technical copywriter**.

Build my complete personal software engineering portfolio using the requirements below.

1. **Inspect the repository first**. If a project exists, identify its framework, architecture, scripts, and conventions; preserve working features. If the directory is empty, initialize the application.
2. **Implement rather than merely propose**. Create actual pages, components, styles, content data, assets, configuration, and tests.
3. Make sound engineering choices autonomously. Ask questions **only** when an essential external dependency (such as a real domain, API key, or publishing credentials) prevents completion; use an editable placeholder otherwise.
4. Keep the code clean, componentized, maintainable, type-safe, responsive, and easy to extend.
5. Validate the application by running the available install, lint, type-check, test, and production-build commands. Fix failures before presenting the result.
6. At the end, summarize the files created/modified, commands run, any remaining placeholders, and the steps needed to deploy.

### Definition of done

The result must be a **working, professional portfolio**, not a mockup, generic template, static screenshot, or incomplete scaffold. Navigation, project pages, theme controls, interactive elements, responsive behavior, and basic SEO must all work.

---

## 2. Portfolio Owner — Editable Profile

Build the website around the following starting information. Store public-facing copy in a single editable data file (for example `src/data/portfolio.ts`) so I can update it without changing component code.

| Field | Initial content / instruction |
|---|---|
| Display name | `Monsal Dawa` — **verify or replace before publishing** |
| Professional title | `Senior Programmer · Full-Stack Software Engineer` |
| Location | `General Santos City, Philippines` — editable |
| Focus | Enterprise web applications, internal business systems, API development, workflow automation, and thoughtful user interfaces |
| Core experience | React, JavaScript, Tailwind CSS, PHP, Laravel, MySQL, REST APIs, authentication/authorization, and application architecture |
| Exploring / learning | ASP.NET Core / C#, Playwright, and additional infrastructure/networking tools — **do not present these as expert-level skills without confirmation** |
| Email | `[YOUR_EMAIL]` |
| GitHub | `[YOUR_GITHUB_URL]` |
| LinkedIn | `[YOUR_LINKEDIN_URL]` |
| Resume PDF | `/resume.pdf` only after a real resume file has been provided; otherwise hide or disable this action cleanly |
| Professional photo | `/images/profile.jpg` only if provided; otherwise use an elegant monogram or graphic avatar |

### Suggested introduction copy

**Eyebrow:** `SOFTWARE ENGINEER · FULL-STACK DEVELOPMENT`

**Headline:** `Engineering software that makes complex work simpler.`

**Subheadline:** `I design and build secure, scalable web applications that turn operational challenges into reliable digital workflows—from intuitive React interfaces to maintainable backend APIs.`

**Primary call to action:** `Explore My Work`

**Secondary call to action:** `Get in Touch`

The wording should sound assured, specific, and human. Do **not** write unsupported claims such as “10+ years of experience,” “served 100,000 users,” or “increased productivity by 80%.”

---

## 3. Brand and Visual Direction

Create a **premium, contemporary, engineering-focused aesthetic** suitable for recruiters, CTOs, hiring managers, founders, and prospective clients.

### Design principles

- **Minimal, not empty:** clear hierarchy, deliberate whitespace, and meaningful content.
- **Professional and credible:** communicate engineering expertise through thoughtful case studies and concise technical explanations.
- **Modern enterprise quality:** polished enough for a senior engineer; avoid gimmicks and generic startup clichés.
- **Fast and restrained:** use lightweight animation to support understanding, never distract from reading.
- **Consistent throughout:** establish and reuse design tokens for color, spacing, type, radius, shadows, and interaction states.

### Visual system

| Element | Requirement |
|---|---|
| Typeface | `Plus Jakarta Sans` for main UI; optionally `JetBrains Mono` for small technical labels/code |
| Default theme | A refined dark theme with a fully supported light-theme toggle |
| Background | Dark: deep near-black/navy; Light: soft off-white |
| Text | High-contrast neutral text; subdued secondary text |
| Accent | One controlled accent (for example indigo, blue, or cyan); avoid excessive accent colors |
| Gradient usage | **No gradients by default.** Use solid colors and subtle borders. Only introduce a gradient if it has a clear functional or visual justification. |
| Surfaces | Subtle cards with precise borders and restrained shadows |
| Corners | Modest, consistent radii; avoid overly rounded controls |
| Icons | `lucide-react` with consistent sizing |
| Motion | Subtle Framer Motion / Motion transitions; respect `prefers-reduced-motion` |
| Layout | Desktop max-width container approximately 1200–1280px, generous gutters |
| Imagery | Prefer authentic project visuals. Where screenshots are missing, use clean, clearly labeled system-diagram illustrations—not fake screenshots. |

### Interaction details

- Sticky navigation with understated separation from the page.
- Precise hover, focus, active, and disabled states.
- Responsive mobile navigation with keyboard support.
- Theme toggle persisted across visits without flashing the wrong theme on load.
- Smooth in-page scrolling while respecting reduced-motion settings.
- Attractive loading, empty, and error states where relevant.
- No particle effects, loud parallax, distracting cursor trails, or endless animations.

---

## 4. Technology Stack

Prefer this stack **unless the existing repository already has a compatible established stack**:

- **React + TypeScript + Vite**
- **Tailwind CSS** (use its conventions and appropriate version)
- **React Router** for project detail routes
- **lucide-react** for icons
- **motion/react** or Framer Motion for subtle interactions
- **React Helmet Async** or a similarly reliable solution for route-level metadata, if compatible with the selected React version
- **Vitest + React Testing Library** for key component/interaction tests
- **Playwright** for a lightweight end-to-end smoke test where feasible

Implementation guidelines:

- Use functional components, strong TypeScript types, and sensible folder separation.
- Prefer native browser behavior, semantic HTML, and small dependencies.
- Use plain Tailwind for visual styling rather than adopting a heavyweight component kit by default.
- Do not expose secrets or require a backend merely to display a portfolio.
- Avoid placeholders that look operational when they are not.

---

## 5. Required Pages and Sections

### A. Home (`/`)

Build the home page in this order:

**1. Navigation**
- Monogram or clean wordmark on the left.
- Links: `Home`, `About`, `Projects`, `Experience`, `Contact`.
- Theme toggle.
- Mobile drawer or accessible menu.
- Active-section highlighting where practical.

**2. Hero**
- Professional role label, high-impact headline, short description.
- Primary CTA to projects, secondary CTA to contact.
- Small availability label only if it is controlled by editable profile data; do not automatically claim availability for work.
- A visual element representing engineering systems (e.g., tidy architecture nodes, abstract code/window composition, or a custom SVG). It should be clean, readable, and not dominate the page.

**3. Short professional value proposition**
- Three concise pillars such as `Reliable Systems`, `Thoughtful UX`, and `Maintainable Architecture`.
- Focus on approach and deliverables, not invented statistics.

**4. Featured projects**
- Show 3–4 most compelling case studies.
- Each card: project name, category, short challenge/solution statement, verified technology tags, status, and link to a real detail page.
- Support a “View All Projects” action.

**5. Engineering skills**
- Group by `Frontend`, `Backend & APIs`, `Databases`, `Tooling & Quality`, and `Infrastructure / Other`.
- Show proficiency categories carefully; avoid arbitrary numeric percentages or unsupported “expert” claims.

**6. Experience / approach preview**
- Concise timeline or role summary with only verifiable dates.
- Link to full About or Experience section.

**7. Contact CTA**
- Clear invitation to discuss engineering roles, projects, or collaborations.
- Functional email link and editable social links.

**8. Footer**
- Name/monogram, short statement, navigation shortcuts, social links, current year generated at runtime.

### B. About (`/about` or home section with anchor)

Include:
- A brief, memorable professional biography.
- Engineering principles: security, maintainability, performance, accessibility, and pragmatic problem-solving.
- What kinds of business problems I work on.
- Current technical focus and areas I am exploring.
- A visually structured skills section.
- A genuine photo only if supplied. Otherwise use a graphic/monogram.

### C. Projects (`/projects`)

- Display all projects in a well-designed responsive grid or list.
- Include working filters (e.g., `All`, `Enterprise Systems`, `Backend / APIs`, `Tools`, `In Progress`) where applicable.
- Optional search if it materially improves usability.
- Support each project’s individual route at `/projects/:slug`.
- Keep status labels accurate: `Production`, `Internal Use`, `In Development`, `Concept`, or `Status To Verify`—do not guess.
- Do not include dummy projects presented as real work.

### D. Project Case Study (`/projects/:slug`)

Make each project detail page more valuable than a simple screenshot gallery.

Include sections for:
1. **Overview:** what the system is and its intended users.
2. **Problem:** the business workflow or technical pain point.
3. **My role:** specific responsibilities only where confirmed.
4. **Solution:** major modules and user workflows.
5. **Architecture:** frontend, backend, database, integration and authentication approach (only supported facts).
6. **Technical challenges:** a few realistic engineering considerations, clearly framed as examples until confirmed.
7. **Security and reliability:** data access, auditability, validation, performance considerations, if genuinely implemented.
8. **Results:** measurable outcomes only when evidence is supplied. Otherwise describe deliverables or intended benefits without invented numbers.
9. **Visuals:** actual screenshots or labeled architecture diagrams; tasteful placeholders where missing.
10. **Stack and links:** repository/demo only if actual public URLs are provided. Private systems should be labeled `Private / Internal Project` rather than exposing a dead link.
11. **Next / previous project navigation** and CTA to contact.

Do not disclose confidential source code, company data, employee data, credentials, internal IP addresses, or sensitive infrastructure details.

### E. Experience (`/experience` or anchored section)

- Timeline layout supporting role, organization, location, dates, summary, and key responsibilities.
- Start with `Senior Programmer` as an editable role entry if appropriate, but leave organization name and tenure as placeholders until verified.
- Do not invent previous employers, promotions, degrees, certifications, or awards.
- Include an optional education section driven by editable content.

### F. Contact (`/contact` or anchored section)

- Prominent `mailto:` link to the configured email.
- GitHub and LinkedIn links only when valid URLs are configured.
- Optional contact form **only** if it is wired to a real provider/backend and appropriately validates inputs and communicates submission failures. Otherwise use an excellent email-based contact experience; never display fake “Message sent” success notices.
- Include a `Copy Email` control if an email is configured and accessible status feedback.

### G. Not Found (`*`)

Design a branded 404 page with a working return-home action.

---

## 6. Starter Portfolio Projects

The following are **candidate case studies**. They are based on system areas I have worked with or discussed. **Verify each project’s ownership, personal contribution, feature completion, deployment status, and publicity permissions before presenting it as completed work.** Build the content data model so individual projects can be hidden until ready.

### Project 01 — Unified Enterprise Portal

**Category:** Enterprise Web Platform / Single-Entry Workspace

**Working description:** A centralized application interface for employees to access multiple business systems through a unified entry point.

**Potential capabilities to verify:**
- Authentication and role-aware navigation
- Access to multiple internal applications
- User profile and account management
- Responsive dashboards, system modules, light/dark UI

**Possible technologies:** React, Vite, Tailwind CSS, Laravel API, Sanctum, MySQL.

**Case study angle:** Information architecture, seamless module access, user experience consistency, and secure access patterns.

### Project 02 — Human Resource Information System (HRIS)

**Category:** Enterprise Systems / HR Technology

**Working description:** A human-resources application supporting employee records, organization management, and leave workflows.

**Potential capabilities to verify:**
- Employee profiles and employment data
- Companies, divisions, departments, sections, and positions
- Leave balances, requests, approvals, and status tracking
- Role-based workflows and document attachments

**Possible technologies:** React, Laravel, MySQL, REST APIs.

**Case study angle:** Workflow state management, complex data relationships, authorization, and administrative usability.

### Project 03 — CICTD Helpdesk

**Category:** Internal Operations / Service Management

**Working description:** A request-management platform intended to digitize IT concerns, equipment/service requests, assignments, and tracking.

**Potential capabilities to verify:**
- Request intake, status transitions, and technician workflow
- Permission-based access and routing
- Operational dashboards and action history

**Possible technologies:** Mark as `To Verify` until confirmed.

**Case study angle:** Service workflow clarity, operational transparency, and maintainable permissions.

### Project 04 — Official Business Management System (OBMS)

**Category:** Workflow Automation / Location-Enabled Applications

**Working description:** A system concept or implementation for managing official business trips and approval workflows.

**Potential capabilities to verify:**
- Trip creation, start/finish lifecycle
- Timestamped location/evidence capture
- Review and approval workflow
- Route mapping and activity history

**Possible technologies:** Mark as `To Verify` until confirmed.

**Case study angle:** Multi-step approvals, evidence integrity, location privacy, and mobile-friendly workflows.

### Project 05 — Payease Payroll Platform

**Category:** Payroll / Backend Systems

**Working description:** A payroll system initiative emphasizing maintainable backend architecture and high-volume data processing.

**Potential capabilities to verify:**
- Modular API architecture
- Payroll entities and validation
- Maintainability, auditability, and scalability considerations

**Possible technologies:** Laravel, PHP, MySQL (verify actual implementation).

**Case study angle:** Domain modeling, API organization, transaction safety, and performance-aware design.

**Publication warning:** If the initiative is not built, label it transparently as `Planned / In Development` or hide it. Do not fabricate payroll calculations, product launches, or customers.

### Project 06 — Additional Work (optional)

Create the data structure to add later projects such as biometric log collection, application testing automation, or other enterprise utilities **only after confirming which are suitable to publish**.

---

## 7. Content Architecture and Data Model

Keep personal and project content separate from page templates.

Suggested shape (adapt to project conventions):

```ts
type ProjectStatus =
  | 'production'
  | 'internal'
  | 'in-development'
  | 'concept'
  | 'to-verify';

interface PortfolioProject {
  slug: string;
  title: string;
  category: string;
  summary: string;
  status: ProjectStatus;
  featured: boolean;
  publish: boolean;
  role?: string;
  technologies: string[];
  problem?: string;
  solution?: string;
  architecture?: string[];
  challenges?: string[];
  outcomes?: string[];
  images?: Array<{ src: string; alt: string; caption?: string }>;
  demoUrl?: string;
  repositoryUrl?: string;
}
```

Recommended content files:

```text
src/
  app/
  components/
    layout/
    ui/
    home/
    projects/
  data/
    profile.ts
    projects.ts
    experience.ts
    skills.ts
  pages/
    HomePage.tsx
    AboutPage.tsx
    ProjectsPage.tsx
    ProjectDetailPage.tsx
    ExperiencePage.tsx
    ContactPage.tsx
    NotFoundPage.tsx
  hooks/
  lib/
  styles/
  tests/
public/
  images/
  favicon.svg
README.md
```

The exact file structure is flexible, but content editing must remain straightforward.

---

## 8. Accessibility, Responsive Design, and Performance

### Accessibility

- Follow **WCAG 2.2 AA** where practical.
- Semantic landmarks: `header`, `nav`, `main`, `section`, `footer`.
- Exactly one meaningful H1 per page; logical heading hierarchy.
- All controls keyboard accessible, with visible focus rings.
- Use appropriate aria labels for icon-only controls.
- Maintain readable contrast (at least 4.5:1 for normal text; 3:1 for large text and relevant non-text UI indicators).
- Respect reduced-motion preferences.
- Descriptive alt text for meaningful images; decorative imagery should not be announced.
- Avoid hover-only disclosure of essential information.
- Navigation should remain operable without JavaScript-dependent visual tricks.

### Responsive quality

Test at minimum:

- **360px** small mobile
- **390px** common mobile
- **768px** tablet
- **1366px** laptop
- **1920px** desktop

There must be **no unexpected horizontal scrolling**. Project cards, hero compositions, menu, headings, and code/architecture sections must remain readable at every width.

### Performance

- Aim for high Lighthouse scores, particularly Performance, Accessibility, Best Practices, and SEO. Do not claim achieved scores unless actually measured.
- Optimize/resize images; use lazy-loading for offscreen media.
- Minimize layout shift and excessive font loading.
- Avoid oversized libraries and expensive animations.
- Provide a usable, meaningful screen even if images fail to load.
- Respect network constraints; avoid unnecessary client-side requests.

---

## 9. SEO, Metadata, and Sharing

Implement:

- Meaningful unique page titles and meta descriptions.
- Open Graph and Twitter/X sharing metadata, with a fallback share image if an asset can be built locally.
- Correct canonical URL **only after** a real deployed domain is configured; no fake production URL.
- `robots.txt` and `sitemap.xml` appropriate to the final deployment arrangement.
- Semantic, crawlable copy and descriptive link labels.
- A favicon and consistent brand identity.
- Optional JSON-LD `Person` / `WebSite` structured data, using only verified facts.

---

## 10. Suggested Components

Build reusable components, as needed, such as:

- `SiteHeader`, `MobileNav`, `SiteFooter`
- `ThemeToggle`
- `HeroSection`, `SectionHeading`
- `ProjectCard`, `ProjectGrid`, `ProjectFilters`, `ProjectStatus`
- `TechnologyTag`, `SkillGroup`
- `ExperienceTimeline`
- `ContactLinks`, `CopyEmailButton`
- `RevealOnScroll` (motion-reduced friendly)
- `PageContainer`, `Button`, `Badge`, `EmptyState`
- `ScrollToTop`, `SkipToContent`

Avoid overengineering simple UI or creating dozens of wrappers with no real reuse.

---

## 11. Engineering Quality Requirements

- TypeScript strict mode where practical.
- Consistent formatting and ESLint rules.
- Sensible route-based code splitting if beneficial.
- All external links use safe attributes where appropriate.
- No broken image references or dead links.
- No public sample data with confidential internal information.
- No meaningless placeholder testimonials, fabricated GitHub activity graphs, fake counters, bogus certificates, or fictional employer logos.
- Validate URLs and hide unconfigured action buttons.
- Test filtering, navigation, theme toggling, mobile menu behavior, and 404 handling.
- Make all calls to action genuinely functional.
- Include a useful README with project overview, commands, folder map, content editing instructions, build, and deployment.

### Acceptance checklist

- [ ] App boots without runtime or console errors.
- [ ] All declared routes load and navigation works.
- [ ] Portfolio looks polished in light and dark mode.
- [ ] User can switch themes; preference persists.
- [ ] Layout is responsive at specified widths.
- [ ] Featured projects and filters use real typed data.
- [ ] Each published project opens a rich case study.
- [ ] Unverified projects are hidden or transparently labeled.
- [ ] Contact controls work; no fake form submissions.
- [ ] Accessibility basics and keyboard flows pass.
- [ ] SEO tags, favicon, and share metadata are present.
- [ ] Tests, linting, type-check, and production build pass where configured.
- [ ] README documents how to edit my content and deploy.

---

## 12. Deployment and Deliverables

Build a static-deployable application suitable for **Vercel, Netlify, or Cloudflare Pages**. Configure SPA route fallback/rewrites as needed for direct links to project detail pages.

Deliver:

1. Complete source code with working routes and responsive designs.
2. Editable content data populated with the draft information above.
3. Rich case-study templates and initial candidate project entries.
4. Theme system, accessibility features, and subtle polished interactions.
5. SEO metadata and suitable public assets.
6. Automated tests where practical.
7. `README.md` with local setup, edit guide, and deployment steps.
8. A final summary of verification results and the **exact content that must be confirmed before publication**.

---

## 13. Suggested Work Plan for Claude

Proceed through these phases without waiting for another prompt:

**Phase 1 — Audit and architecture:** inspect the repo, select a compatible structure, define tokens, content types, and routes.

**Phase 2 — Design foundation:** typography, theme system, navigation, containers, buttons, cards, responsive behavior.

**Phase 3 — Pages and content:** hero, profile, skills, projects index, case studies, experience, contact, footer, 404.

**Phase 4 — Polish:** motion, transitions, focus states, empty states, mobile details, images/graphics, SEO.

**Phase 5 — Quality assurance:** run checks, inspect for layout regressions, fix errors, test key interactions, verify build.

**Phase 6 — Handoff:** document setup, customization, deployment, and unverified content.

**Start now. Build the portfolio end-to-end. Do not stop after creating a plan or asking me to choose a generic design.**

---

## 14. Final Publishing Checklist for Me (the Portfolio Owner)

Before going live, I should review:

- [ ] Preferred public name and title
- [ ] Email, GitHub, LinkedIn, and website/domain
- [ ] Real resume and professional photo (optional)
- [ ] Which projects may be shown publicly
- [ ] Exact implementation status and technical stack of each project
- [ ] Accurate dates, employers, education, and achievements
- [ ] Screenshots that do not reveal sensitive organizational information
- [ ] Links to public code or live demos where available
- [ ] Spelling, mobile appearance, accessibility, and SEO preview

**End of Claude Code brief.**
