import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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

export default withNextIntl(nextConfig);
