/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";

const productionHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: blob:;",
      "media-src 'self' blob:;",
      "font-src 'self' data:;",
      "connect-src 'self' https:;",
      "frame-ancestors 'none';",
      "base-uri 'self';",
      "form-action 'self'",
    ].join(" "),
  },
];

// Development keeps HMR ('unsafe-eval'), local video, and host preview iframes
// working while still sending the baseline hardening headers.
const devHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
      "style-src 'self' 'unsafe-inline';",
      "img-src 'self' data: blob:;",
      "media-src 'self' blob:;",
      "font-src 'self' data:;",
      "connect-src 'self' https:;",
      "base-uri 'self';",
      "form-action 'self'",
    ].join(" "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Next.js 16 blocks dev-only assets from hosts other than the one the
  // server was started with. Allow the local IP so HMR isn't rejected
  // (which surfaces as a console error / dev-indicator "1 Issue").
  allowedDevOrigins: ["127.0.0.1", "192.168.**", "*.local"],
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: isProduction ? productionHeaders : devHeaders,
      },
    ];
  },
};

export default nextConfig;
