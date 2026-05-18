import { buildMetadata } from '@/lib/seo';
import ProductsClient from './products-client';

export const metadata = buildMetadata({
  title: 'HVAC Products — Diffusers, Grilles, Louvers & Dampers',
  description:
    'Browse ALUGRIDX premium HVAC air distribution products: ceiling diffusers, linear slot diffusers, supply & return air grilles, louvers, sand-trap louvers, and volume control dampers — manufactured in Ajman, UAE.',
  path: '/products',
  keywords: [
    'HVAC products UAE',
    'ceiling diffusers',
    'linear slot diffusers',
    'supply air grilles',
    'return air grilles',
    'louvers',
    'volume control dampers',
    'aluminum diffusers Ajman',
  ],
});

export default function ProductsPage() {
  return <ProductsClient />;
}
