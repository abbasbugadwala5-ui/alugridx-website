// Centralized SEO config for ALUGRIDX.
// Single source of truth for site URL, brand strings, and metadata builders.
// Override the URL via NEXT_PUBLIC_SITE_URL once you have a live domain.

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://alugridx.com').replace(/\/$/, ''),
  name: 'ALUGRIDX',
  legalName: 'ALUGRIDX Air Conditioning Industry LLC',
  tagline: 'Smart HVAC Air Distribution Solutions',
  description:
    'ALUGRIDX manufactures premium HVAC air distribution products — ceiling diffusers, grilles, linear diffusers, louvers and dampers. Based in Ajman, UAE. Serving UAE & GCC.',
  locale: 'en_AE',
  region: 'AE',
  phone: '+971585521251',
  phoneDisplay: '+971 58 552 1251',
  email: 'info@alugridx.com',
  address: {
    street: 'Building 144, Warehouse 16, Al Jurf 3',
    locality: 'Ajman',
    region: 'Ajman',
    country: 'AE',
    postalCode: '',
  },
  defaultOgImage: '/images/slide1.jpg',
  twitter: '', // add when available
};

// Build a Next.js metadata object for a page.
// Pass overrides for title/description/path/image.
export function buildMetadata({
  title,
  description,
  path = '/',
  image,
  keywords,
  noIndex = false,
} = {}) {
  const url = `${SITE.url}${path === '/' ? '' : path}`;
  const ogImage = image || SITE.defaultOgImage;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE.url}${ogImage}`;
  const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const desc = description || SITE.description;

  return {
    title: title || `${SITE.name} — ${SITE.tagline}`,
    description: desc,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE.name,
      title: fullTitle,
      description: desc,
      locale: SITE.locale,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [ogImageUrl],
    },
  };
}

// JSON-LD: Organization + LocalBusiness schema for the homepage.
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}${SITE.defaultOgImage}`,
    description: SITE.description,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: ['AE', 'SA', 'OM', 'QA', 'KW', 'BH'],
    foundingDate: '2025',
    industry: 'HVAC Manufacturing',
  };
}

// JSON-LD: WebSite schema with internal search action.
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-AE',
  };
}

// JSON-LD: BreadcrumbList helper — pass an array of { name, path } items.
export function breadcrumbSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path ? `${SITE.url}${item.path}` : undefined,
    })),
  };
}
