import { sheetRedirects } from './lib/sheetRedirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
    ],
  },
  async redirects() {
    return [
      ...sheetRedirects,
      {
        source: '/about-we-buy-dead-stocks',
        destination: '/about',
        statusCode: 301,
      },
      {
        source: '/services/free-valuation-services',
        destination: '/get-free-valuation-dead-stocks',
        statusCode: 301,
      },
      {
        source: '/service/free-valuation-services',
        destination: '/get-free-valuation-dead-stocks',
        statusCode: 301,
      },
      {
        source: '/services/electronics-scrap-buyer-in-dubai',
        destination: '/services/electronics-scrap',
        statusCode: 301,
      },
      {
        source: '/service/electronics-scrap-buyer-in-dubai',
        destination: '/services/electronics-scrap',
        statusCode: 301,
      },
      {
        source: '/services/computer-scrap-buyer-in-dubai',
        destination: '/services/computer-scrap',
        statusCode: 301,
      },
      {
        source: '/service/computer-scrap-buyer-in-dubai',
        destination: '/services/computer-scrap',
        statusCode: 301,
      },
      {
        source: '/author/admin',
        destination: '/Blogs',
        statusCode: 301,
      },
      {
        source: '/services/category/dead-stock',
        destination: '/Blogs',
        statusCode: 301,
      },
      {
        source: '/service/category/dead-stock',
        destination: '/Blogs',
        statusCode: 301,
      },
      {
        source: '/services/free-collection-in-uae-convenient-solutions',
        destination: '/services/free-collection',
        statusCode: 301,
      },
      {
        source: '/service/free-collection-in-uae-convenient-solutions',
        destination: '/services/free-collection',
        statusCode: 301,
      },
      {
        source: '/services/free-collection-service-a-game-changer-for-you',
        destination: '/services/free-collection',
        statusCode: 301,
      },
      {
        source: '/service/free-collection-service-a-game-changer-for-you',
        destination: '/services/free-collection',
        statusCode: 301,
      },
      {
        source: '/services/scrap-is-gold-unlocking-hidden-value-of-waste',
        destination: '/services/e-waste',
        statusCode: 301,
      },
      {
        source: '/service/scrap-is-gold-unlocking-hidden-value-of-waste',
        destination: '/services/e-waste',
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      },
      {
        source: '/((?!uploads/).*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
