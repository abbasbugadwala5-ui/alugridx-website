import { buildMetadata } from '@/lib/seo';
import BlogClient from './blog-client';

export const metadata = buildMetadata({
  title: 'Blog & News — HVAC Insights and Product Guides',
  description:
    'ALUGRIDX blog: HVAC insights, product guides, technical notes and air-distribution industry news from the UAE & GCC.',
  path: '/blog',
  keywords: [
    'HVAC blog',
    'air distribution guides',
    'HVAC industry news UAE',
    'ALUGRIDX news',
  ],
  noIndex: true,
});

export default function BlogPage() {
  return <BlogClient />;
}
