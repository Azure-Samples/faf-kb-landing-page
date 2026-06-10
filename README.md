# Factory Agents Forge — Knowledge Bases Landing Page

Public landing page for **Factory Agents Forge (FAF) Knowledge Bases** — a production-ready
code pattern library that teaches AI coding agents to generate high-quality,
architecture-consistent code across Python, TypeScript, Java, C#, and IaC.

The site is a single-page app built with [Vite](https://vitejs.dev/), React 19,
TypeScript, and Tailwind CSS, and is deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

The dev server runs at the URL printed in the terminal (default <http://localhost:5173>).

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

## Deployment

Every push to `main` triggers the [`Deploy to GitHub Pages`](.github/workflows/deploy.yml)
workflow, which builds the site and publishes `dist/` to GitHub Pages.

The published URL is <https://azure-samples.github.io/faf-kb-landing-page/>.

> The Vite `base` in [`vite.config.ts`](vite.config.ts) is set to
> `/faf-kb-landing-page/` to match the project-pages sub-path. Update it if the
> repository is renamed or served from a custom domain at the root.

### One-time setup

In the repository settings, under **Settings → Pages**, set the
**Source** to **GitHub Actions**.
