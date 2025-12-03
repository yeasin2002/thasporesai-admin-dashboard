# Quick Jobs Admin Dashboard

A modern, production-ready admin dashboard for managing the Quick Jobs platform. Built with React 19, TypeScript, and Vite for optimal performance and developer experience.

## Overview

This admin dashboard provides comprehensive management tools for the Quick Jobs platform, including user management (customers and contractors), job postings, payment transactions, categories, and locations. The application features a clean, responsive UI with real-time data updates and robust error handling.

## Key Features

### Core Functionality
- **User Management** - Manage customers and contractors with role-based filtering
- **Job Management** - Track and manage job postings with status updates
- **Payment Transactions** - Monitor platform transactions and service fees
- **Category Management** - Create and manage job categories with icons
- **Location Management** - Add and manage service locations with coordinates
- **Dashboard Analytics** - Overview of platform metrics and statistics

### Technical Features
- **Modern Stack** - React 19, TypeScript 5.9, Vite 7.1
- **UI Components** - shadcn/ui with Tailwind CSS 4.1
- **State Management** - TanStack Query v5 for server state
- **API Integration** - Three-layer architecture (types, queries, hooks)
- **Form Handling** - React Hook Form with validation
- **Authentication** - JWT-based auth with Zustand persistence
- **Code Quality** - ESLint, Prettier, Husky pre-commit hooks
- **Docker Support** - Containerized deployment ready
- **Auto Imports** - React hooks and UI components
- **Type Safety** - Full TypeScript coverage

## Vite Plugins That you must need to know for this starter.

### vite-plugin-svgr

This plugin is used to generate SVG images from React components. You can use this plugin in your project.
Example:

```javascript
import Logo from '@/assets/react.svg?react';
// just add ?react query to get the svg component

export const App = () => {
  return (
    <div {...props}>
      <Logo />
      {/* You can use svg components as like normal React components */}
    </div>
  );
};
```

### unplugin-fonts

This plugin is used to generate fonts from Google fonts. You can use this plugin in your project.

How to use ? Open `/config/fonts.config.ts` file and add your fonts like this: name should be exactly same as in Google fonts. If you wan to add custom fonts you can check their doc. [link](https://github.com/cssninjaStudio/unplugin-fonts#readme)

```javascript
{
    name: 'Space Grotesk',
    styles: 'wght@300;400;500;700',
  },
```

### unplugin-auto-import/vite

This plugin is used to auto import modules. You can use this plugin in your project.
auto-import will handle all imports like react, react-router and also shadcn-ui's component in your @component/ui folder , etc. and you can add more.

Example:

```javascript
export function Counter() {
  const [count, setCount] = useState(0); // no need to import react and react-router, auto-import will handle it
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>
      {/*  also,  Button from @/components/ui but you don't need to import it.  */}
    </div>
  );
}
```

## Project Structure

```
src/
├── api/                    # API layer (three-layer architecture)
│   ├── api-types/         # TypeScript interfaces
│   ├── query-list/        # Axios query functions
│   └── api-hooks/         # TanStack Query hooks
├── components/
│   ├── layout/            # Layout components
│   ├── shared/            # Reusable components
│   └── ui/                # shadcn/ui components
├── page/
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
│       ├── user/          # User management
│       ├── job/           # Job management
│       ├── payments/      # Transaction management
│       ├── categories/    # Category management
│       └── locations/     # Location management
├── store/                 # Zustand stores
├── utils/                 # Utility functions
└── data/                  # Static data and constants
```

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Type check + build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run format           # Format code with Prettier
npm run lint-staged      # Run lint-staged (pre-commit)
```

## API Integration

The project uses a three-layer API architecture:

1. **Types Layer** (`api-types/`) - TypeScript interfaces for requests/responses
2. **Query Layer** (`query-list/`) - Pure Axios functions for API calls
3. **Hooks Layer** (`api-hooks/`) - React Query hooks for components

Example:
```typescript
// In your component
import { useUsers } from "@/api/api-hooks/useUsers";

const { data, isLoading, error } = useUsers({
  role: "customer",
  page: 1,
  limit: 10
});
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up

# Build image only
docker build -t quick-jobs-admin .
```

## Tech Stack

- **Frontend**: React 19.2, TypeScript 5.9
- **Build Tool**: Vite 7.1
- **Routing**: React Router 7.9
- **UI Library**: shadcn/ui, Radix UI, Tailwind CSS 4.1
- **State Management**: TanStack Query v5, Zustand
- **Form Handling**: React Hook Form 7.65
- **HTTP Client**: Axios 1.13
- **Icons**: Lucide React, Iconify
- **Animations**: Framer Motion
- **Code Quality**: ESLint 9, Prettier 3.6, Husky 9

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**Note**: This is a client-side rendered (CSR) application. For SEO-critical applications requiring server-side rendering, consider using Next.js, Remix, or similar SSR frameworks.
