import { buildMetadata } from '@/lib/seo';
import FAQClient from './faq-client';

export const metadata = buildMetadata({
  title: 'FAQs — Common Questions About ALUGRIDX HVAC Products',
  description:
    'Answers to common questions about ALUGRIDX HVAC products, lead times, technical specifications, custom sizing and warranty.',
  path: '/faq',
  keywords: [
    'HVAC FAQs',
    'ALUGRIDX warranty',
    'lead time HVAC',
    'air distribution specifications',
  ],
});

export default function FAQPage() {
  return <FAQClient />;
}
