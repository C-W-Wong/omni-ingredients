import Link from "next/link";
import { createAdminClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

async function getStats() {
  const supabase = createAdminClient();

  const [
    { count: totalProducts },
    { count: activeProducts },
    { count: totalPosts },
    { count: publishedPosts },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("is_published", true),
  ]);

  return {
    totalProducts: totalProducts || 0,
    activeProducts: activeProducts || 0,
    inactiveProducts: (totalProducts || 0) - (activeProducts || 0),
    totalPosts: totalPosts || 0,
    publishedPosts: publishedPosts || 0,
    draftPosts: (totalPosts || 0) - (publishedPosts || 0),
  };
}

async function getRecentProducts() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, slug, is_active, updated_at")
    .order("updated_at", { ascending: false })
    .limit(5);
  return data || [];
}

async function getRecentPosts() {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, is_published, created_at")
    .order("created_at", { ascending: false })
    .limit(5);
  return data || [];
}

export default async function DashboardPage() {
  const [stats, recentProducts, recentPosts] = await Promise.all([
    getStats(),
    getRecentProducts(),
    getRecentPosts(),
  ]);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          subtitle={`${stats.activeProducts} active, ${stats.inactiveProducts} inactive`}
          href="/products"
        />
        <StatCard
          title="Active Products"
          value={stats.activeProducts}
          variant="success"
          href="/products"
        />
        <StatCard
          title="Total Blog Posts"
          value={stats.totalPosts}
          subtitle={`${stats.publishedPosts} published, ${stats.draftPosts} drafts`}
          href="/blog"
        />
        <StatCard
          title="Published Posts"
          value={stats.publishedPosts}
          variant="success"
          href="/blog"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Link
          href="/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Product
        </Link>
        <Link
          href="/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Blog Post
        </Link>
      </div>

      {/* Recent Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <p className="text-gray-500 text-sm">No products yet</p>
            ) : (
              recentProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{product.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {product.is_active ? "Active" : "Inactive"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h2>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-gray-500 text-sm">No blog posts yet</p>
            ) : (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{post.title}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.is_published
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  variant = "default",
  href
}: {
  title: string;
  value: number;
  subtitle?: string;
  variant?: "default" | "success";
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className={`text-3xl font-bold mt-2 ${
        variant === "success" ? "text-green-600" : "text-gray-900"
      }`}>
        {value}
      </p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </Link>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}
