require('dotenv').config();

const mongoose = require('mongoose');
const Project = require('./models/Project');

// Entries use the schema field `img` (frontend reads `proj.img`).
// Year stored as string to match existing schema.
const projects = [
  {
    title: 'Commercial Tower Installation',
    category: 'Commercial',
    year: '2026',
    location: 'Dubai, UAE',
    products: 'Ceiling Diffusers, Linear Grilles',
    img: '/images/projects/dubai-commercial-tower.jpg',
    description:
      'Premium HVAC air distribution system installation for a high-rise commercial tower in Dubai, featuring ALUGRIDX ceiling diffusers and linear grilles integrated into a luxury marble lobby design.',
  },
  {
    title: 'Industrial Facility Installation',
    category: 'Industrial',
    year: '2025',
    location: 'Ajman, UAE',
    products: 'Louvers, VCD, NRD',
    img: '/images/projects/ajman-industrial.jpg',
    description:
      'Complete HVAC air distribution package for a large industrial manufacturing facility in Ajman, including exhaust louvers, volume control dampers, and non-return dampers.',
  },
  {
    title: 'Luxury Residential Tower',
    category: 'Residential',
    year: '2025',
    location: 'Abu Dhabi, UAE',
    products: 'Ceiling Diffusers, Grilles',
    img: '/images/projects/abudhabi-residential.jpg',
    description:
      'Premium residential tower in Abu Dhabi featuring ALUGRIDX ceiling diffusers and return grilles across all units, delivering whisper-quiet comfort with architectural integration.',
  },
  {
    title: '5-Star Hospitality Project',
    category: 'Hospitality',
    year: '2025',
    location: 'Sharjah, UAE',
    products: 'Linear Slot Diffusers',
    img: '/images/projects/sharjah-hospitality.jpg',
    description:
      'Linear slot diffuser installation across the lobby, ballroom, and guest corridors of a 5-star hotel in Sharjah, providing seamless air distribution with premium aesthetic finish.',
  },
  {
    title: 'Airport Expansion Project',
    category: 'Commercial',
    year: '2024',
    location: 'Dubai, UAE',
    products: 'Jet Diffusers, Louvers',
    img: '/images/projects/dubai-airport.jpg',
    description:
      'Long-throw jet diffusers and architectural louvers supplied for Dubai airport terminal expansion, engineered for high-volume air distribution across departure halls.',
  },
  {
    title: 'Shopping Mall Installation',
    category: 'Commercial',
    year: '2024',
    location: 'Ras Al Khaimah, UAE',
    products: 'Ceiling Diffusers, Grilles',
    img: '/images/projects/rak-mall.jpg',
    description:
      'Comprehensive HVAC air terminal package for a major shopping mall in Ras Al Khaimah, covering atrium, retail floors, and back-of-house ventilation.',
  },
  {
    title: 'Industrial Park Installation',
    category: 'Industrial',
    year: '2024',
    location: 'Fujairah, UAE',
    products: 'Sand Trap Louvers, VCD',
    img: '/images/projects/fujairah-industrial-park.jpg',
    description:
      'Sand trap louvers and volume control dampers installed across multiple warehouse units in a Fujairah industrial park, engineered for Gulf climate dust and sand protection.',
  },
  {
    title: 'Residential Compound Project',
    category: 'Residential',
    year: '2024',
    location: 'Dubai, UAE',
    products: 'Ceiling Diffusers, Registers',
    img: '/images/projects/dubai-residential.jpg',
    description:
      'HVAC air distribution products supplied for a luxury villa compound in Dubai, including ceiling diffusers and supply air registers across all units.',
  },
  {
    title: 'Business Centre Installation',
    category: 'Commercial',
    year: '2023',
    location: 'Ajman, UAE',
    products: 'Linear Diffusers, Dampers',
    img: '/images/projects/ajman-business-centre.jpg',
    description:
      'Linear slot diffusers and volume control dampers installed across multiple floors of a Class A business centre in Ajman, providing balanced airflow with architectural integration.',
  },
];

async function seedProjects() {
  await Project.deleteMany();
  await Project.insertMany(projects);
  console.log(`Projects seeded (${projects.length})`);
}

if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Mongo Connected');
      await seedProjects();
      process.exit();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = seedProjects;
