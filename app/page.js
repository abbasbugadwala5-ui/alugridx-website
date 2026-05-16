import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsSection from '@/components/ProductsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import AboutPreview from '@/components/AboutPreview';
import ProjectsPreview from '@/components/ProjectsPreview';
import CatalogueSection from '@/components/CatalogueSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ALUGRIDX — Smart HVAC Air Distribution Solutions UAE',
  description: 'ALUGRIDX manufactures premium ceiling diffusers, air grilles, linear diffusers, louvers and dampers. Based in Ajman, UAE. Serving UAE & GCC.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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