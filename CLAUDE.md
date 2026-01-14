# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a personal portfolio website for Karun Agarwal built with Next.js 15 (App Router), React 19, and Tailwind CSS 4.

### Key Patterns

**Mode System**: The site has a "human" and "cat" mode toggle that changes all content. This is managed via:
- `app/contexts/ModeContext.tsx` - React context providing `mode` ('human' | 'cat') and `toggleMode()`
- `app/data/content.ts` - All text content keyed by mode, including `content`, `experienceData`, and `projectsData`

Components read the current mode via `useMode()` hook and render content from the appropriate mode key.

**Server Actions**: Form submissions use Next.js server actions (`app/actions/submitForm.ts`) with Zod validation, submitting to AppSheet API.

**Path Alias**: `@/*` maps to the project root.
