# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

No test framework is configured.

## Architecture

Personal portfolio website for Karun Agarwal built with Next.js 15 (App Router), React 19, Tailwind CSS 4, and TypeScript. Path alias `@/*` maps to project root.

### Routes

- `/` — Main portfolio page (client component using mode system)
- `/blogs` — Server component that aggregates RSS feeds from Substack and Medium (`app/lib/blogs.ts`), revalidates hourly
- `/riyaz` — Interactive Indian classical music sargam practice tool with Web Audio API (`app/components/riyaz/AudioEngine.ts`). Has its own theme system via `RiyazThemeContext` (light/dark/system), scoped to `/riyaz` only — does not use the main site's mode system
- `/robotics` — Interest form page for a robotics lab, server component with static content

### Key Patterns

**Mode System (homepage only)**: The site has a "human" and "cat" mode toggle that changes all content. Managed via:
- `app/contexts/ModeContext.tsx` — React context providing `mode` ('human' | 'cat') and `toggleMode()`
- `app/data/content.ts` — All text content keyed by mode, including `content`, `experienceData`, and `projectsData`

Components read the current mode via `useMode()` hook and render content from the appropriate mode key.

**Server Actions**: Form submissions use Next.js server actions (`app/actions/submitForm.ts`) with Zod validation, submitting to AppSheet API. Requires `APPSHEET_APPLICATION_ID`, `APPSHEET_API_KEY`, and `APPSHEET_TABLE_NAME` env vars.

**Riyaz Theme vs Site Mode**: These are separate systems. The Riyaz theme (`RiyazThemeContext`) controls light/dark appearance on `/riyaz` and persists to `localStorage` as `riyaz-theme`. The homepage mode system (`ModeContext`) switches between human/cat content. A FOUC-prevention script in `app/layout.tsx` applies the Riyaz theme only on `/riyaz` paths.
