import { MetadataRoute } from 'next';

const base = 'https://www.wraptorsinc.com';
const slugs = [
  'vehicle-wrapping',
  'auto-detailing',
  'window-tinting',
  'paint-protection',
  'custom-interior',
  'starlight-headliner',
  'racing-stripes',
  'galaxy-ceilings',
  'decals',
  'caliper-painting',
  'wheel-painting',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${base}/about`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    ...slugs.map((s) => ({
      url: `${base}/services/${s}`,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { url: `${base}/locations`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/contact`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${base}/franchises`, priority: 0.75, changeFrequency: 'monthly' as const },
    { url: `${base}/gallery`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/faqs`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/careers`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: 'yearly' as const },
  ];
}
