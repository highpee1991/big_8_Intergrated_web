import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Cloudinary-hosted product/brand images. The hostname is always
    // res.cloudinary.com regardless of cloud name (the cloud name is a path
    // segment, not part of the host), so this works without needing your
    // actual Cloudinary credentials in this file.
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;