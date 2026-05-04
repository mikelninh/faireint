# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

FairEint is a German-language, single-page React app that simulates policy reform scenarios. It presents 10 reform areas, citizen personas, political bloc reactions, cost-benefit analysis, and a "2030 vision" backcasting model. All data is static — there is no backend or API.

- **Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Deployment**: GitHub Pages (`base: '/faireint/'` in `vite.config.ts`)
- **CI/CD**: GitHub Actions deploys on every push to `main` (`.github/workflows/deploy.yml`)

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (includes type check)
npm run build

# Preview production build locally
npm run preview

# Lint TypeScript/React files
npm run lint
```

There is **no test runner** configured in this project.

## Architecture

### Entry Point

- `index.html` loads `src/main.tsx` via Vite's dev server
- `src/main.tsx` mounts `App.tsx` under React `StrictMode`

### Single-Page App with No Routing

The entire UI lives in `src/App.tsx` (~1600+ lines). It is a single React component with many inline sub-components and local state hooks. There is no React Router or similar library — navigation is done via anchor links to section IDs within the same page.

### Data Layer

All application data is static TypeScript, stored in `src/data/*.ts`. There are no fetch calls or external data sources:

- `src/data/manifesto.ts` — 10 reform definitions (`Reform` interface) and 6 principles
- `src/data/personas.ts` — 24 citizen personas, 7 political blocs, policy scenarios, and simulation functions (`simulatePolicy`, `simulatePoliticianPolicy`, `getPolicyMetrics`)
- `src/data/voters.ts` — 8 voter profiles with satisfaction scores and deliverables
- `src/data/roadmap.ts` — timeline, cost-benefit items, expert quotes, FAQs, party reactions
- `src/data/path-to-80.ts` — party compromise paths
- `src/data/backcasting.ts` — 7 backcast goals (e.g. Zero Hunger, Health For All) with milestone timelines
- `src/data/innovations.ts` — 7 democracy innovation concepts
- `src/data/reform-generator.ts` — **Idee-Generator**: keyword-matched reform templates with pre-computed persona/party reactions and simulation functions. Templates are drawn from real-world implementations across countries and are matched against user problem input to generate proposals with acceptance scores, net return, and 10-year projections.

When adding new reforms, personas, scenarios, or goals, these are the files to edit. The `App.tsx` file imports and renders them.

### Styling

Tailwind CSS v4 is integrated via the `@tailwindcss/vite` Vite plugin (not PostCSS). Custom theme properties are defined in `src/index.css` using the `@theme` directive.

- Semantic color tokens: `bg`, `bg-alt`, `bg-card`, `ink`, `ink-soft`, `ink-muted`, `border`, `gold`, `green`, `red`, `blue`, `purple`
- Fonts: `font-display` maps to Georgia (serif); `font-body` maps to Inter (sans-serif)
- Custom animations (fade-in, bar-animate, panel-enter, toast, slide-up) are defined in `index.css`
- `prefers-reduced-motion` is respected — all animations disable when the user prefers reduced motion

## Build Verification

Recent verification confirms the project builds cleanly:
- `npm run build` produces `dist/index.html` plus `dist/assets/` containing hashed JS (~380 KB) and CSS (~34 KB) bundles
- No TypeScript or Vite errors on a fresh `npm install` followed by `npm run build`

## TypeScript Constraints

The project uses strict compiler settings. Common pitfalls for agents:

- **`verbatimModuleSyntax: true`** — Type-only imports must use `import type { ... }`. A plain `import` of a type will fail.
- **`noUnusedLocals: true`** and **`noUnusedParameters: true`** — Unused variables and parameters will cause build failures.
- **`erasableSyntaxOnly: true`** — Only TypeScript syntax that can be erased (types, interfaces, enums) is allowed. `namespace`, `parameter properties`, and other non-erasable syntax will fail.
- **`noEmit: true`** — The build only type-checks; Vite handles transpilation.
- **`allowImportingTsExtensions: true`** — Imports must include `.ts` or `.tsx` extensions.
- **`moduleDetection: force`** — All files are treated as modules, even without imports/exports.

## Deployment Notes

- `vite.config.ts` sets `base: '/faireint/'` for GitHub Pages subpath hosting.
- The GitHub Actions workflow builds to `dist/` and deploys via `actions/deploy-pages@v4`.
- Node version in CI is pinned to 24.

## .claude Settings

The project includes a `.claude/settings.local.json` that grants Bash permission for `npx tsc *` commands. This is safe to use for type-checking during development.
