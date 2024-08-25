/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "awesomesam.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  serverActions: {
    bodySizeLimit: "10mb", // Set this to a larger value as needed
  },
};

export default nextConfig;
