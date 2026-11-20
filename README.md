# Prakash Chakali — Portfolio

A dark editorial engineering portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, Framer Motion, and Lucide. The visual direction is **Dark Editorial Engineering**: charcoal surfaces, warm high-contrast typography, a single signal-lime accent, fine rules, technical labels, and asymmetric layouts. It is intended to read like an independent engineering journal—not a generic template.

## Stack

- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS 4 (design tokens and utility foundation) + custom responsive CSS
- Framer Motion for restrained reveal and route-adjacent interactions
- lucide-react icons, next/font, static case-study routes
- CSS architectural hero illustration (no heavy 3D runtime; keeps the hero light and readable)
- Native Next.js runtime on Vercel (not `output: "export"`)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit portfolio content

All editable profile and project content lives in `data/content.ts`.

- Update `profile` for your positioning, bio, location, contact details, education, availability, and resume path.
- Update `skills` to change grouped skills.
- Update `certifications` to maintain your credentials.
- Update `projects` to change project cards and case studies.

### Add a project

Add one object to the `projects` array with a unique `slug`, `number`, `name`, `category`, `summary`, `problem`, `approach`, `result`, `stack`, `role`, `github`, and `visual`. The case-study page and sitemap are generated from this typed data automatically. Use a verified `live` URL only when the project is deployed.

## Contact form

The contact section includes a working form. Create a Formspree form and set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel Project Settings → Environment Variables. Without this variable, the form safely opens a prefilled email draft instead. Never commit private API keys.

## Deployment

### Vercel (production)

1. Import or connect `Chakaliprakash/Portfolio` in Vercel.
2. Framework preset: Next.js; root directory: `./`.
3. Build command and install command: let Vercel auto-detect (`npm run build`).
4. Use Node.js 22.x.
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain if you use a custom domain. The default is the Vercel project domain.
6. Push to `main`; Vercel automatically builds and deploys production.

The app deliberately uses the normal Next.js runtime. Do not set `output: "export"`: generated Open Graph image and metadata routes need the Next.js deployment runtime.

### GitHub Actions

The GitHub Actions workflow runs typecheck, ESLint, and a normal production Next.js build. It is a quality gate only; Vercel owns production deployment.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Known content gaps to complete

- Professional experience entries (company, title, dates, and verifiable impact) were not present in the portfolio content used for this rebuild, so no employment history has been fabricated.
- Add a personal portrait if desired; the current design intentionally uses a typographic identity instead of stock imagery.
- Add a verified X/Twitter URL if you use one.
- Add live project URLs and real outcome metrics only when available.
- Verify the resume PDF you want to publish; the existing repository resume path is retained.

## Credits

No external stock photography is used. Project preview panels are original CSS compositions. Fonts are served through `next/font` from Google Fonts at build time. Icons are from Lucide.
