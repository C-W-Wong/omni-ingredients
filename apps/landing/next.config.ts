import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: [
    "@omm/ui",
    "@omm/supabase",
    "@omm/types",
    "@omm/tailwind-config",
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
