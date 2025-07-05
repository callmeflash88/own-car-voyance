import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build",
  images: {
    domains: ["carvoyance-upload.s3.us-west-1.amazonaws.com"],
  },
};

export default nextConfig;
