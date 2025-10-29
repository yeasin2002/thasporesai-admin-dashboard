# Project Structure

## Root Organization

```
├── src/                    # Source code
├── public/                 # Static assets (favicon, etc.)
├── configs/                # Configuration files (fonts, etc.)
├── dist/                   # Build output
├── .kiro/                  # Kiro AI assistant settings
├── .husky/                 # Git hooks
└── [config files]          # Root-level configs
```

## Source Directory (`src/`)

```
src/
├── api/                 # Images, SVGs, static files
│   │── api-hooks/       # react hooks with tanstack query and axios 
│   │── query-list/       # query list and types with axios 
├── assets/                 # Images, SVGs, static files
├── components/             # React components
│   ├── layout/            # Layout components (AuthLayout, DashboardLayout)
│   ├── shared/            # Shared/reusable components
│   ├── ui/                # shadcn/ui components
│   └── index.ts           # Component exports
├── constants/              # Application constants
├── data/                   # Static data (menu items, mock data)
├── helpers/                # Helper functions
├── hooks/                  # Custom React hooks
├── page/                   # Page components
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── NotFound.tsx       # 404 page
│   └── RootErrorBoundary.tsx
├── store/                  # State management
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions (cn.ts for className merging)
├── validations/            # Form validation schemas
├── App.tsx                 # Root component with routing
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Key Conventions

### File Naming
- Components: PascalCase (e.g., `LoginPage.tsx`, `DashboardLayout.tsx`)
- Utilities/Helpers: camelCase (e.g., `cn.ts`, `demo.ts`)
- Index files: Use `index.ts` for barrel exports

### Component Organization
- Layout components go in `components/layout/`
- Reusable components go in `components/shared/`
- shadcn/ui components go in `components/ui/`
- Page-level components go in `page/` with subdirectories by feature

### Routing Structure
- Authentication routes: `/`, `/register`, `/forgot-password`, `/otp`, `/reset-password`
- Dashboard routes: `/dashboard/*` with nested routes
- All routes use `react-router` v7 with `BrowserRouter`
- Error boundaries configured at route level

### Import Patterns
- Use `@/` alias for imports from `src/` (e.g., `import { Button } from "@/components/ui/button"`)
- Auto-imports enabled for React hooks and React Router
- SVG imports: Use `?react` query to import as component (e.g., `import Logo from '@/assets/logo.svg?react'`)

### Styling
- Tailwind CSS utility classes
- Use `cn()` utility from `@/utils/cn` for conditional class merging
- CSS variables for theming (configured in `index.css`)
- Component variants managed with `class-variance-authority`

### Type Safety
- Strict TypeScript mode enabled
- Type definitions in `src/types/`
- Auto-generated types in `auto-imports.d.ts` (do not edit manually)
