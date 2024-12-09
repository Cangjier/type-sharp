import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath:process.env.PUBLIC_URL,
  assetPrefix:process.env.PUBLIC_URL
};

export default nextConfig;
