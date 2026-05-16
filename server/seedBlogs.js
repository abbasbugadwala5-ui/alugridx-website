require('dotenv').config();

const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const blogs = [
  {
    title: 'The Importance of Proper Air Distribution in Buildings',
    category: 'HVAC Tips',
    date: 'May 10, 2026',
    excerpt:
      'Proper air distribution is critical for indoor comfort, energy efficiency, and occupant health. Learn why the right diffusers and grilles matter.',
    content:
      'Proper air distribution is critical for indoor comfort, energy efficiency, and occupant health. Learn why the right diffusers and grilles matter.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
    published: true,
  },
  {
    title: 'Benefits of Aluminum Air Grilles for Commercial Spaces',
    category: 'Products',
    date: 'Apr 20, 2026',
    excerpt:
      'Aluminum air grilles offer superior durability, aesthetics, and performance. Explore why they are the preferred choice for commercial projects.',
    content:
      'Aluminum air grilles offer superior durability, aesthetics, and performance. Explore why they are the preferred choice for commercial projects.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80',
    published: true,
  },
  {
    title: 'How to Choose the Right Diffuser for Your Space',
    category: 'Guides',
    date: 'Apr 05, 2026',
    excerpt:
      'Ceiling diffusers, linear slot diffusers, or jet diffusers — how do you choose? This guide breaks down the key factors for every application.',
    content:
      'Ceiling diffusers, linear slot diffusers, or jet diffusers — how do you choose? This guide breaks down the key factors for every application.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80',
    published: true,
  },
  {
    title: 'HVAC Trends in UAE Commercial Construction 2026',
    category: 'Industry',
    date: 'Mar 18, 2026',
    excerpt:
      'The UAE commercial construction boom is driving demand for high-performance HVAC air distribution solutions. What does 2026 look like?',
    content:
      'The UAE commercial construction boom is driving demand for high-performance HVAC air distribution solutions. What does 2026 look like?',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80',
    published: true,
  },
  {
    title: 'Understanding Volume Control Dampers & When You Need Them',
    category: 'Guides',
    date: 'Mar 02, 2026',
    excerpt:
      'VCDs play a crucial role in HVAC balancing and zone control. Learn when to specify them and how they work in your system.',
    content:
      'VCDs play a crucial role in HVAC balancing and zone control. Learn when to specify them and how they work in your system.',
    img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80',
    published: true,
  },
  {
    title: 'Sand Trap Louvers: Protecting Your HVAC in the UAE Desert Climate',
    category: 'Products',
    date: 'Feb 14, 2026',
    excerpt:
      'Sand and dust are a major challenge for HVAC systems in the UAE. Discover how sand trap louvers protect your equipment and extend its life.',
    content:
      'Sand and dust are a major challenge for HVAC systems in the UAE. Discover how sand trap louvers protect your equipment and extend its life.',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=80',
    published: true,
  },
];

async function seedBlogs() {
  await Blog.deleteMany();
  await Blog.insertMany(blogs);
  console.log(`Blogs seeded (${blogs.length})`);
}

if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Mongo Connected');
      await seedBlogs();
      process.exit();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = seedBlogs;
