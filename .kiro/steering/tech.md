# Technology Stack

## Core Technologies

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.9** - Build tool and dev server
- **React Router 7.9.4** - Client-side routing

## UI & Styling

- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style, neutral base color)
- **Radix UI** - Headless UI primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **class-variance-authority** & **clsx** - Conditional styling utilities

## Form Handling & Validation

- **React Hook Form 7.65.0** - Form state management
- **@hookform/resolvers** - Form validation resolvers

## Code Quality & Formatting

- **ESLint 9.37.0** - Linting with TypeScript ESLint
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **lint-staged 16.2.4** - Pre-commit linting

## Vite Plugins

- **@vitejs/plugin-react-swc** - Fast React refresh with SWC
- **unplugin-auto-import** - Auto-import React, React Router, and UI components
- **unplugin-fonts** - Google Fonts integration
- **vite-plugin-svgr** - Import SVGs as React components (use `?react` query)
- **vite-plugin-compression2** - Build compression
- **unplugin-imagemin** - Image optimization

## Common Commands

```bash
# Development
npm run dev              # Start dev server

# Building
npm run build            # Type check + build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run lint-staged      # Run lint-staged (used in pre-commit)

# Docker
docker-compose up        # Run with Docker
```

## Import Aliases

- `@/*` maps to `./src/*`
- Auto-imports enabled for React hooks, React Router, and Icon component
- UI components can be auto-imported if enabled in vite.config.ts

## Configuration Files

- `vite.config.ts` - Vite configuration and plugins
- `tsconfig.json` - TypeScript compiler options
- `eslint.config.js` - ESLint rules (flat config)
- `.prettierrc.json` - Prettier formatting rules
- `components.json` - shadcn/ui configuration
- `configs/fonts.config.ts` - Google Fonts configuration
