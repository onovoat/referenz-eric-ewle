import type { MetadataRoute } from 'next';

const SITE_URL = 'https://ericewle.at';

// Locales: de (Default, ohne Prefix) und en (/en) – localePrefix 'as-needed'.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = { de: SITE_URL, en: `${SITE_URL}/en` };

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages },
    },
  ];
}
