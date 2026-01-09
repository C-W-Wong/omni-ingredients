"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@omm/types";

interface JournalClientProps {
  posts: BlogPost[];
}

export default function JournalClient({ posts }: JournalClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get unique categories from posts
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  // Get featured post (first featured or first post)
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const regularPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  // Initialize scroll animations
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, [filteredPosts]);

  if (posts.length === 0) {
    return (
      <div className="bg-white">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl tracking-tight font-semibold font-playfair">Journal</h1>
            <p className="mt-4 text-lg text-neutral-600">No posts found.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto animate-on-scroll fade-in">
          <h1 className="text-4xl md:text-5xl tracking-tight font-semibold font-playfair">Journal</h1>
          <p className="mt-4 text-lg text-neutral-600">Wellness insights & company updates</p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mt-8 animate-on-scroll scale-in stagger-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === "All" && featuredPost && (
        <section className="max-w-7xl mx-auto px-6 pb-16">
          <Link
            href={`/journal/${featuredPost.slug}`}
            className="group block animate-on-scroll image-reveal"
          >
            <article className="grid lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden bg-neutral-50 border border-neutral-200 transition-all duration-300 hover:shadow-xl">
              <div className="aspect-video lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8 lg:py-12 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-neutral-500 mb-2">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl md:text-3xl tracking-tight font-semibold font-playfair group-hover:text-neutral-600 transition">
                  {featuredPost.title}
                </h2>
                <p className="mt-4 text-neutral-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-sm text-neutral-500">
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime} min read</span>
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        {regularPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500">No posts in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className={`group animate-on-scroll card-reveal stagger-${Math.min(index + 1, 6)}`}
              >
                <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-3">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl tracking-tight font-semibold font-playfair group-hover:text-neutral-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-neutral-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-neutral-500">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto animate-on-scroll blur-slide">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight animate-on-scroll text-reveal stagger-1">Stay informed</h2>
            <p className="mt-4 text-lg opacity-90 animate-on-scroll text-reveal stagger-2">Get the latest wellness tips and company updates delivered to your inbox.</p>

            <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-on-scroll scale-in stagger-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-neutral-900 font-medium rounded-lg hover:opacity-90 transition transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-sm opacity-70 animate-on-scroll fade-in stagger-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
