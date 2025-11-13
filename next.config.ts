import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: 'standalone',
  env: {
    APP_VERSION: process.env.npm_package_version,
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
      @use "@/styles/global/vars.scss" as *;
      @use "@/styles/global/mixins.scss" as *;
    `,
  },
};

export default nextConfig;
