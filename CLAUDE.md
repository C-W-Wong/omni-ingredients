# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Run both apps (landing on 3000, shop on 3001)
npm run dev:landing   # Run landing app only (port 3000)
npm run dev:shop      # Run shop app only (port 3001)
npm run build         # Build both apps
npm run lint          # Run ESLint on all packages
npm run clean         # Clean all build artifacts and node_modules
```

## Architecture

This is a **Turborepo monorepo** with two Next.js 15 apps and shared packages:

- **React 19** with the React Compiler enabled
- **TypeScript** with strict mode
- **Tailwind CSS 4** via PostCSS plugin
- **Supabase** for authentication and database

### Project Structure

```
my-app/
├── apps/
│   ├── landing/          # Port 3000 - B2B Nutraceutical marketing site
│   │   └── src/app/      # /, /about, /journal, /journal/[slug]
│   └── shop/             # Port 3001 - B2C Skincare e-commerce
│       └── src/app/      # /, /product/[slug], /cart, /login, /account/*
├── packages/
│   ├── ui/               # Shared Header and Footer components
│   ├── supabase/         # Shared Supabase client/server/middleware
│   ├── types/            # Shared TypeScript types (cart, products, blog)
│   └── tailwind-config/  # Shared globals.css with animations
├── turbo.json            # Turborepo task configuration
└── package.json          # npm workspaces root
```

### Apps

**Landing App** (`apps/landing`):
- B2B-focused nutraceutical ingredients site
- Static marketing pages: home, about, journal
- No authentication required
- Path alias: `@/*` maps to `./src/*`

**Shop App** (`apps/shop`):
- B2C skincare e-commerce
- Product catalog, cart, checkout
- User authentication and account management
- Protected routes under `/account/*`
- Path alias: `@/*` maps to `./src/*`

### Shared Packages

**@omm/ui**: Header and Footer components that accept a `variant` prop:
- `variant="landing"`: B2B navigation (Products, About, Journal, Shop link)
- `variant="shop"`: E-commerce navigation (Shop, About, Journal, cart, account)

**@omm/supabase**: Supabase configuration
- `@omm/supabase/client` - Browser client
- `@omm/supabase/server` - Server-side client
- `@omm/supabase/middleware` - Auth session middleware

**@omm/types**: Shared TypeScript types for cart, products, and blog

**@omm/tailwind-config**: Shared globals.css with animation system

### Cross-App Navigation

Environment variables for linking between apps:
```
NEXT_PUBLIC_LANDING_URL=http://localhost:3000
NEXT_PUBLIC_SHOP_URL=http://localhost:3001
```

### Styling Patterns

**Tailwind CSS 4**: Custom CSS must be wrapped in `@layer utilities { }` to work properly.

**Animation System**: IntersectionObserver-based scroll animations defined in `packages/tailwind-config/src/globals.css`:
- Add `animate-on-scroll` + animation class (e.g., `fade-in`, `slide-left`, `scale-in`)
- Use `stagger-1` through `stagger-8` for delayed animations
- The `.animate` class is added via JavaScript when elements enter viewport

**Fonts**: Configured via `next/font/google` with CSS variables `--font-inter` and `--font-playfair`.
