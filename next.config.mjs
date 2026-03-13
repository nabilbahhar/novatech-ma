/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.dell.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.jabra.com" },
      { protocol: "https", hostname: "psref.lenovo.com" },
      { protocol: "https", hostname: "www.poly.com" },
      { protocol: "https", hostname: "**.hp.com" },
      { protocol: "https", hostname: "**.cisco.com" },
      { protocol: "https", hostname: "**.philips.com" },
      { protocol: "https", hostname: "webobjects2.cdw.com" },
      { protocol: "https", hostname: "c1.neweggimages.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [390, 640, 750, 828, 1080, 1200],
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
