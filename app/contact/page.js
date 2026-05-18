import { buildMetadata } from '@/lib/seo';
import ContactClient from './contact-client';

export const metadata = buildMetadata({
  title: 'Contact Us — Sales & Technical Enquiries',
  description:
    'Contact ALUGRIDX in Ajman, UAE for HVAC product enquiries, quotations and technical support. Phone: +971 58 552 1251 · info@alugridx.com',
  path: '/contact',
  keywords: [
    'contact ALUGRIDX',
    'HVAC quote UAE',
    'air distribution enquiry',
    'Ajman HVAC supplier',
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
