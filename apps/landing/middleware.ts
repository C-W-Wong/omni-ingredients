import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (_next)
  // - Static files (favicon, assets, etc.)
  matcher: [
    // Match root path
    "/",
    // Match all paths except static files and API
    "/(en|es|zh)/:path*",
    "/((?!api|_next|favicon|assets|.*\\..*).*)"
  ],
};
