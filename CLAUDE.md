# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Run all apps (landing:3000, shop:3001, admin:3002)
npm run dev:landing   # Run landing app only (port 3000)
npm run dev:shop      # Run shop app only (port 3001)
npm run dev:admin     # Run admin app only (port 3002)
npm run build         # Build all apps
npm run lint          # Run ESLint on all packages
npm run clean         # Clean all build artifacts and node_modules
```

## Architecture

**Turborepo monorepo** with three Next.js 15 apps and shared packages. React 19 with React Compiler, TypeScript strict mode, Tailwind CSS 4, Supabase for auth/database.

### Apps

**Landing** (`apps/landing` - port 3000): B2B nutraceutical ingredients marketing site with i18n support (en/es/zh). Static marketing pages. No auth required.

**Shop** (`apps/shop` - port 3001): B2C skincare e-commerce. Product catalog, cart, checkout. Supabase auth with protected `/account/*` routes.

**Admin** (`apps/admin` - port 3002): Internal dashboard for managing products, blog, quotes, contacts. Requires admin role via `admin_users` table. Uses TipTap for rich text editing.

All apps use path alias `@/*` mapping to `./src/*`.

### Shared Packages

- **@omm/ui**: Header, Footer, QuoteModal components. Header/Footer accept `variant="landing"|"shop"` prop to switch between B2B and B2C navigation.
- **@omm/supabase**: Supabase client configuration with three entry points:
  - `@omm/supabase/client` - Browser client (createBrowserClient)
  - `@omm/supabase/server` - Server client (createServerClient with cookie handling)
  - `@omm/supabase/middleware` - Auth session middleware (updateSession)
- **@omm/types**: Shared TypeScript types for cart, products, blog
- **@omm/tailwind-config**: Shared `globals.css` with animation system

### i18n (Landing App)

Uses `next-intl` with locale prefix routing (`/en/about`, `/es/about`, `/zh/about`).

- **Config**: `src/i18n/routing.ts` (locales, default), `src/i18n/request.ts` (server-side message loading)
- **Messages**: `src/messages/{en,es,zh}.json` - hierarchical structure with keys per page (common, home, about, solutions, contact, etc.)
- **Middleware**: `apps/landing/middleware.ts` handles locale detection and routing
- **Pattern**: Layouts extract translations from messages and pass them as props to shared UI components (Header, Footer)

### Authentication & Authorization

**Shop**: Supabase auth via shared middleware. Protects `/account/*` routes, redirects to `/login`.

**Admin**: Custom middleware checks both auth status AND admin role:
1. `supabase.auth.getUser()` for authentication
2. Queries `admin_users` table for role (admin/super_admin)
3. Non-auth → `/login`, non-admin → `/access-denied`
4. Server Actions use `requireAdmin()` guard from `src/lib/auth-guard.ts`

### API Routes & Data Flow

**Quote submission** (`apps/landing/src/app/api/quote/route.ts`):
- POST handler with server-side validation
- Saves to `quote_requests` table using service role client (bypasses RLS)
- Fires `send-quote-email` Edge Function asynchronously (non-blocking)

**Contact submission** (`apps/landing/src/app/api/contact/route.ts`):
- Same pattern, saves to `contact_submissions` table
- Fires `send-contact-email` Edge Function

**Admin Server Actions** (`apps/admin/src/actions/`):
- CRUD operations for quotes, contacts, products, blog, authors, categories
- All guarded with `requireAdmin()` and use service role client

### Edge Functions

Located in `supabase/functions/`. Deno-based, deployed to Supabase.

- **send-quote-email**: Sends admin notification + customer confirmation via Resend API
- Called from API routes as fire-and-forget (doesn't block form submission)

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL          # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anonymous/public key
SUPABASE_SERVICE_ROLE_KEY         # Server-only, bypasses RLS
NEXT_PUBLIC_LANDING_URL           # Landing app URL (http://localhost:3000)
NEXT_PUBLIC_SHOP_URL              # Shop app URL (http://localhost:3001)
RESEND_API_KEY                    # Edge Function email sending (Supabase secret)
```

`NEXT_PUBLIC_*` variables are exposed to the browser. Service role key must stay server-side only.

### Cross-App Navigation

Apps link to each other using `NEXT_PUBLIC_LANDING_URL` and `NEXT_PUBLIC_SHOP_URL` environment variables. Shared Header/Footer receive these as `shopUrl`/`landingUrl` props.

### Styling Patterns

**Tailwind CSS 4**: Custom CSS must be wrapped in `@layer utilities { }`.

**Animation System** (`packages/tailwind-config/src/globals.css`): IntersectionObserver-based scroll animations. Add `animate-on-scroll` + animation class (`fade-in`, `slide-left`, `scale-in`) with optional `stagger-1` through `stagger-8` delays.

**Fonts**: `next/font/google` with CSS variables `--font-inter` and `--font-playfair`.
