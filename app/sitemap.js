import { SITE } from '@/lib/seo';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

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

async function fetchProductSlugs() {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data || [])
      .filter((p) => p.active !== false && p.slug)
      .map((p) => ({ slug: p.slug, updatedAt: p.updatedAt }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  const staticEntries = staticRoutes.map((r) => ({
    url: `${SITE.url}${r.path === '/' ? '' : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productEntries = (await fetchProductSlugs()).map((p) => ({
    url: `${SITE.url}/products/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
