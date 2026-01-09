"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Products",
  "/products/new": "New Product",
  "/categories": "Categories",
  "/blog": "Blog Posts",
  "/blog/new": "New Blog Post",
  "/blog-categories": "Blog Categories",
  "/authors": "Authors",
};

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  // Get page title
  const getTitle = () => {
    // Check exact matches first
    if (routeTitles[pathname]) {
      return routeTitles[pathname];
    }

    // Check for dynamic routes
    if (pathname.startsWith("/products/") && pathname !== "/products/new") {
      return "Edit Product";
    }
    if (pathname.startsWith("/blog/") && pathname !== "/blog/new") {
      return "Edit Blog Post";
    }
    if (pathname.startsWith("/authors/")) {
      return "Edit Author";
    }

    return "Admin";
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const crumbs: { label: string; href: string }[] = [
      { label: "Dashboard", href: "/" }
    ];

    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;

      // Skip UUIDs in breadcrumbs, show "Edit" instead
      if (segment.match(/^[0-9a-f-]{36}$/i)) {
        crumbs.push({ label: "Edit", href: currentPath });
      } else if (segment === "new") {
        crumbs.push({ label: "New", href: currentPath });
      } else {
        const label = routeTitles[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
        crumbs.push({ label, href: currentPath });
      }
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="admin-header bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{getTitle()}</h1>
        {breadcrumbs.length > 1 && (
          <nav className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-gray-700">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-gray-600 hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </>
        )}

        {/* Mobile menu button - can be enhanced later */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
