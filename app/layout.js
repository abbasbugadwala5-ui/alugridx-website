import { Barlow, Inter } from 'next/font/google';
import './globals.css';
import RevealInit from '@/components/RevealInit';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { SITE, buildMetadata, organizationSchema, websiteSchema } from '@/lib/seo';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} UAE`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  generator: 'Next.js',
  keywords: [
    'HVAC',
    'air distribution',
    'ceiling diffusers',
    'air grilles',
    'linear slot diffusers',
    'supply air grilles',
    'return air grilles',
    'louvers',
    'sand-trap louvers',
    'volume control dampers',
    'non-return dampers',
    'aluminum diffusers',
    'HVAC UAE',
    'Ajman HVAC',
    'Dubai HVAC',
    'GCC HVAC',
    'ALUGRIDX',
  ],
  category: 'HVAC Manufacturing',
  creator: SITE.legalName,
  publisher: SITE.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Air Distribution Solutions`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.defaultOgImage],
  },
  robots: {
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
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/images/logo.png' },
    ],
    shortcut: '/images/logo.png',
  },
  other: {
    'geo.region': 'AE-AJ',
    'geo.placename': 'Ajman',
    'geo.position': '25.4052;55.5136',
    'ICBM': '25.4052, 55.5136',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#0D1B3E' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  const orgJsonLd = organizationSchema();
  const siteJsonLd = websiteSchema();

  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body className="font-body bg-white text-slate antialiased">
        <RevealInit />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
