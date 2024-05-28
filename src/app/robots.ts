import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://athleti.fi';

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/about-us',
        '/contact-us',
        '/login',
        '/logout',
        '/news',
        '/privacy-policy',
        '/register',
        '/resolve-auth',
        '/sign-up',
        '/terms-of-use',
      ],
      disallow: ['/dashboard', '/profile', '/settings', '/help-support'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
