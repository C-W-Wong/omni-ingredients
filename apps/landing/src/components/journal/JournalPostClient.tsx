"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@omm/types";

interface JournalPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function JournalPostClient({ post, relatedPosts }: JournalPostClientProps) {
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
  }, []);

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-600">
          <Link href="/" className="hover:text-neutral-900 transition">Home</Link>
          <span>/</span>
          <Link href="/journal" className="hover:text-neutral-900 transition">Journal</Link>
          <span>/</span>
          <span className="text-neutral-900 truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 pb-20">
        <header className="text-center mb-12 animate-on-scroll fade-in stagger-1">
          <span className="inline-block text-xs uppercase tracking-widest text-neutral-500 bg-neutral-100 rounded-full py-1.5 px-4 mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight font-semibold font-playfair leading-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-neutral-500">
            {post.author && (
              <>
                <span>By {post.author}</span>
                <span>·</span>
              </>
            )}
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} min read</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12 animate-on-scroll image-reveal stagger-2">
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-2xl"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none animate-on-scroll slide-up stagger-3 prose-headings:font-playfair prose-headings:tracking-tight prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-neutral-600 prose-p:leading-relaxed prose-li:text-neutral-600 prose-strong:text-neutral-900 prose-a:text-[#df7a4c] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share & Tags */}
        <div className="mt-12 pt-8 border-t border-neutral-200 animate-on-scroll fade-in stagger-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-neutral-500">Share:</span>
              <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </button>
              <button className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
            </div>
            <Link
              href="/journal"
              className="text-sm text-neutral-600 hover:text-neutral-900 transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back to Journal
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl md:text-3xl tracking-tight font-semibold font-playfair mb-8 animate-on-scroll text-reveal">
              More from the Journal
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.slug}
                  href={`/journal/${relatedPost.slug}`}
                  className={`group animate-on-scroll card-reveal stagger-${index + 1}`}
                >
                  <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-4 left-4 text-xs font-medium bg-white/90 backdrop-blur-sm rounded-full py-1.5 px-3">
                        {relatedPost.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg tracking-tight font-semibold font-playfair group-hover:text-neutral-600 transition line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-3 text-sm text-neutral-500">
                        <span>{relatedPost.date}</span>
                        <span>·</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
