import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>Page Not Found | Omni Ingredients</title>
        <meta name="description" content="The page you are looking for does not exist." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f0eb] via-[#faf7f4] to-[#edd8cc] relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#df7a4c]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#edd8cc]/50 rounded-full blur-3xl" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#f5f0eb]/80 rounded-full blur-2xl" />
          </div>

          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-30" />

          <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
            {/* 404 Number with gradient */}
            <div className="relative mb-6">
              <h1
                className="text-[150px] sm:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#2A2118] to-[#df7a4c] leading-none tracking-tighter select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                404
              </h1>
              <div
                className="absolute inset-0 text-[150px] sm:text-[200px] font-bold text-[#df7a4c]/5 leading-none tracking-tighter select-none blur-xl"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                404
              </div>
            </div>

            {/* Badge */}
            <p className="text-sm uppercase tracking-[0.2em] text-[#df7a4c] font-medium mb-4">
              Page Not Found
            </p>

            {/* Title */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-[#2A2118] mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Oops! This page seems to have wandered off
            </h2>

            {/* Description */}
            <p className="text-neutral-600 mb-10 max-w-md mx-auto leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/en"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-[#df7a4c] text-white font-semibold rounded-full hover:bg-[#c86a3f] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Home
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur text-[#2A2118] font-semibold rounded-full hover:bg-white transition-all duration-300 border border-neutral-200 hover:border-neutral-300"
              >
                Contact Support
              </Link>
            </div>

            {/* Quick links */}
            <div className="mt-16 pt-8 border-t border-neutral-200/50">
              <p className="text-sm text-neutral-500 mb-4">Or try these popular pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { href: "/en/about", label: "About Us" },
                  { href: "/en/solutions", label: "Solutions" },
                  { href: "/en/journal", label: "Journal" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-[#df7a4c] hover:text-[#c86a3f] hover:underline transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
