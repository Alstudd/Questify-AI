/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 's3.us-west-2.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        serverActions: true,
    },
    async rewrites() {
        return [
          {
            source: `/api/:path*`,
            destination: `/api/:path*`,
          },
          {
            source: `/:path*`,
            destination: `${process.env.API_URL}/:path*`,
          },
        ];
      },
};

export default nextConfig;
