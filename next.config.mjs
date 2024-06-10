/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {key: 'referrer-policy', value: 'mp-referrer'}
                ]
            }
        ]
    },
    images: {
        domains: [
          "avatars.githubusercontent.com",
          "lh3.googleusercontent.com",
        ],
      },
};

export default nextConfig;
