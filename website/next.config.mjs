import createNextIntlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'th.bing.com',
              port: '',
              pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                port: '',
                pathname: '/**',
              },
        ]
    }
};

const withNextIntl = createNextIntlPlugin();


export default withNextIntl(nextConfig);