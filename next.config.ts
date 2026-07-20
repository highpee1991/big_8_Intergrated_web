import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // V1 imagery is served from /public. When we move to remote assets
    // (Cloudinary, Supabase Storage, etc.) in a later phase, add their
    // hostnames here — nothing else about the <Image> usage needs to change.
    remotePatterns: [
      // { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
