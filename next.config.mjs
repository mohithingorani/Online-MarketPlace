/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'awesomesam.dev',
            port: '',
            pathname: '/**',
          },
        ],
      },
      typescript : {
        ignoreBuildErrors : true
      }
};

export default nextConfig;
