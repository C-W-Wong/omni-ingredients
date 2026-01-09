import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: [
    "@omm/supabase",
    "@omm/types",
    "@omm/tailwind-config",
  ],
};

export default nextConfig;
