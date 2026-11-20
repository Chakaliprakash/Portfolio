# Prakash Chakali — Portfolio

A dark editorial engineering portfolio built with Next.js App Router, TypeScript, Tailwind CSS 4, Framer Motion, and Lucide. The visual direction is **Dark Editorial Engineering**: charcoal surfaces, warm high-contrast typography, a single signal-lime accent, fine rules, technical labels, and asymmetric layouts. It is intended to read like an independent engineering journal—not a generic template.

## Stack

- Next.js 15 App Router + React 19 + TypeScript
- Tailwind CSS 4 (design tokens and utility foundation) + custom responsive CSS
- Framer Motion for restrained reveal and route-adjacent interactions
- lucide-react icons, next/font, static case-study routes
- CSS architectural hero illustration (no heavy 3D runtime; keeps the hero light and readable)
- Static export for GitHub Pages and Vercel

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

### Vercel (recommended)

1. Import `Chakaliprakash/Portfolio` into Vercel.
2. Keep the framework preset as Next.js and the root directory as `./`.
3. Build command: `npm run build`.
4. Deploy. No environment variables are required for the portfolio's current functionality.

### GitHub Pages

The repository workflow exports the site to `out/` with `GITHUB_PAGES=true` and deploys it to GitHub Pages under `/Portfolio`. The Next config uses the base path only in that workflow; Vercel uses the root path.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

The GitHub Actions workflow runs the static export before publishing. Run the three checks locally before merging future changes.

## Known content gaps to complete

- Professional experience entries (company, title, dates, and verifiable impact) were not present in the portfolio content used for this rebuild, so no employment history has been fabricated.
- Add a personal portrait if desired; the current design intentionally uses a typographic identity instead of stock imagery.
- Add a verified X/Twitter URL if you use one.
- Add live project URLs and real outcome metrics only when available.
- Verify the resume PDF you want to publish; the existing repository resume path is retained.

## Credits

No external stock photography is used. Project preview panels are original CSS compositions. Fonts are served through `next/font` from Google Fonts at build time. Icons are from Lucide.
