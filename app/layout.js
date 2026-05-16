import { Barlow, Inter } from 'next/font/google';
import './globals.css';
import RevealInit from '@/components/RevealInit';

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
  title: { default: 'ALUGRIDX — Air Distribution Solutions UAE', template: '%s | ALUGRIDX' },
  description: 'ALUGRIDX manufactures premium HVAC air distribution products — ceiling diffusers, grilles, linear diffusers, louvers & dampers. Based in Ajman, UAE.',
  keywords: ['HVAC', 'ceiling diffusers', 'air grilles', 'linear diffusers', 'louvers', 'dampers', 'UAE', 'Ajman', 'Dubai', 'ALUGRIDX'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body className="font-body bg-white text-slate antialiased">
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
