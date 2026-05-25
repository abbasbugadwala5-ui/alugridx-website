import { buildMetadata } from '@/lib/seo';
import ProductDetailClient from './product-detail-client';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

async function fetchProductServer(slug) {
  try {
    const res = await fetch(
      `${API_BASE}/api/products/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductServer(slug);

  if (!product) {
    return buildMetadata({
      title: 'Product Not Found',
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const title = `${product.title}${product.code ? ` (${product.code})` : ''}`;
  const description =
    product.shortDescription ||
    `${product.title} — premium HVAC air distribution product by ALUGRIDX, manufactured in Ajman, UAE.`;

  return buildMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    image: product.images?.[0],
    keywords: [
      product.title,
      product.code,
      product.category,
      product.subCategory,
      'HVAC',
      'ALUGRIDX',
    ].filter(Boolean),
  });
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
