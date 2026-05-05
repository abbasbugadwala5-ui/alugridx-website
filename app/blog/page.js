import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogueSection from '@/components/CatalogueSection';
import { ArrowRight } from 'lucide-react';

const posts = [
  { title: 'The Importance of Proper Air Distribution in Buildings', date: 'May 10, 2026', category: 'HVAC Tips', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', excerpt: 'Proper air distribution is critical for indoor comfort, energy efficiency, and occupant health. Learn why the right diffusers and grilles matter.' },
  { title: 'Benefits of Aluminum Air Grilles for Commercial Spaces', date: 'Apr 20, 2026', category: 'Products', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80', excerpt: 'Aluminum air grilles offer superior durability, aesthetics, and performance. Explore why they are the preferred choice for commercial projects.' },
  { title: 'How to Choose the Right Diffuser for Your Space', date: 'Apr 05, 2026', category: 'Guides', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80', excerpt: 'Ceiling diffusers, linear slot diffusers, or jet diffusers — how do you choose? This guide breaks down the key factors for every application.' },
  { title: 'HVAC Trends in UAE Commercial Construction 2026', date: 'Mar 18, 2026', category: 'Industry', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80', excerpt: 'The UAE commercial construction boom is driving demand for high-performance HVAC air distribution solutions. What does 2026 look like?' },
  { title: 'Understanding Volume Control Dampers & When You Need Them', date: 'Mar 02, 2026', category: 'Guides', img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80', excerpt: 'VCDs play a crucial role in HVAC balancing and zone control. Learn when to specify them and how they work in your system.' },
  { title: 'Sand Trap Louvers: Protecting Your HVAC in the UAE Desert Climate', date: 'Feb 14, 2026', category: 'Products', img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=80', excerpt: 'Sand and dust are a major challenge for HVAC systems in the UAE. Discover how sand trap louvers protect your equipment and extend its life.' },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="bg-navy py-12">
          <div className="container">
            <div className="breadcrumb mb-3 text-white/50">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Blog & News</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl">Blog & News</h1>
            <p className="text-white/60 mt-2">HVAC insights, product guides, and industry news</p>
          </div>
        </div>

        <section className="section section-light">
          <div className="container">
            {/* Featured post */}
            <div className="card overflow-hidden mb-10 group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image src={posts[0].img} alt={posts[0].title} fill className="object-cover product-card-img" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="badge mb-3">{posts[0].category}</span>
                  <h2 className="font-heading font-bold text-dark text-2xl md:text-3xl mb-3 group-hover:text-navy transition-colors leading-snug">
                    {posts[0].title}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-5">{posts[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-muted text-xs">{posts[0].date}</span>
                    <Link href="/blog" className="btn-primary text-sm py-2 px-5">
                      Read More <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(1).map((post, i) => (
                <div key={i} className="card overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={post.img} alt={post.title} fill className="object-cover product-card-img" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge">{post.category}</span>
                      <span className="text-muted text-xs">{post.date}</span>
                    </div>
                    <h3 className="font-heading font-bold text-dark text-base mb-2 group-hover:text-navy transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <Link href="/blog" className="inline-flex items-center gap-1.5 text-navy text-sm font-semibold hover:gap-3 transition-all">
                      Read More <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CatalogueSection />
      </main>
      <Footer />
    </>
  );
}
