require('dotenv').config();

const mongoose = require('mongoose');
const Project = require('./models/Project');

const projects = [
  {
    title: 'Dubai Commercial Tower',
    category: 'Commercial',
    location: 'Dubai, UAE',
    year: '2026',
    products: 'Ceiling Diffusers, Linear Grilles',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  },
  {
    title: 'Ajman Industrial Complex',
    category: 'Industrial',
    location: 'Ajman, UAE',
    year: '2025',
    products: 'Louvers, VCD, NRD',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80',
  },
  {
    title: 'Abu Dhabi Luxury Residences',
    category: 'Residential',
    location: 'Abu Dhabi, UAE',
    year: '2025',
    products: 'Ceiling Diffusers, Grilles',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80',
  },
  {
    title: 'Sharjah 5-Star Hotel',
    category: 'Hospitality',
    location: 'Sharjah, UAE',
    year: '2025',
    products: 'Linear Slot Diffusers',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80',
  },
  {
    title: 'Dubai Airport Expansion',
    category: 'Commercial',
    location: 'Dubai, UAE',
    year: '2024',
    products: 'Jet Diffusers, Louvers',
    img: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=700&q=80',
  },
  {
    title: 'RAK Shopping Mall',
    category: 'Commercial',
    location: 'Ras Al Khaimah, UAE',
    year: '2024',
    products: 'Ceiling Diffusers, Grilles',
    img: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700&q=80',
  },
  {
    title: 'Fujairah Industrial Park',
    category: 'Industrial',
    location: 'Fujairah, UAE',
    year: '2024',
    products: 'Sand Trap Louvers, VCD',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  },
  {
    title: 'Dubai Residential Compound',
    category: 'Residential',
    location: 'Dubai, UAE',
    year: '2024',
    products: 'Ceiling Diffusers, Registers',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=80',
  },
  {
    title: 'Ajman Business Centre',
    category: 'Commercial',
    location: 'Ajman, UAE',
    year: '2023',
    products: 'Linear Diffusers, Dampers',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=700&q=80',
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
