import { buildMetadata } from '@/lib/seo';
import CatalogueClient from './catalogue-client';

export const metadata = buildMetadata({
  title: 'Request Catalogue — ALUGRIDX 2026 HVAC Product Catalogue',
  description:
    'Request the ALUGRIDX 2026 product catalogue with complete technical specs, dimensional drawings, k-factors, throw and noise data across all HVAC product series.',
  path: '/catalogue',
  keywords: [
    'HVAC catalogue',
    'ALUGRIDX catalogue 2026',
    'air distribution datasheet',
    'product specifications UAE',
  ],
});

export default function CataloguePage() {
  return <CatalogueClient />;
}
