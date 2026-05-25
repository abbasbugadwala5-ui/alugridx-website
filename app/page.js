import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ProductsSection from '@/components/ProductsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import AboutPreview from '@/components/AboutPreview';
import ProjectsPreview from '@/components/ProjectsPreview';
import CatalogueSection from '@/components/CatalogueSection';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Smart HVAC Air Distribution Solutions UAE',
  description:
    'ALUGRIDX manufactures premium HVAC air distribution products — ceiling diffusers, air grilles, linear slot diffusers, louvers and dampers. Based in Ajman, UAE. Serving UAE & GCC.',
  path: '/',
  keywords: [
    'HVAC manufacturer UAE',
    'ceiling diffusers Ajman',
    'aluminum air grilles',
    'linear slot diffusers',
    'sand-trap louvers',
    'volume control dampers',
    'air distribution UAE',
    'ALUGRIDX',
  ],
});

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ProductsSection />
        <WhyChooseUs />
        <AboutPreview />
        <ProjectsPreview />
        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}