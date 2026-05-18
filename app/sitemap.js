import { SITE } from '@/lib/seo';

// Static routes — keep in sync with [app/](app/) directory structure.
const staticRoutes = [
  { path: '/',          changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/about',     changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products',  changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/projects',  changeFrequency: 'monthly', priority: 0.7 },
  { path: '/catalogue', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog',      changeFrequency: 'weekly',  priority: 0.6 },
  { path: '/faq',       changeFrequency: 'monthly', priority: 0.5 },
  { path: '/contact',   changeFrequency: 'yearly',  priority: 0.8 },
];

export default async function sitemap() {
  const now = new Date();

  return staticRoutes.map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
