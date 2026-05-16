require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/Product');

// Helper — keep entries terse; the model fills defaults and resolves
// slug collisions automatically (see Product pre-validate hook).
const p = (entry) => ({
  ...entry,
  images: entry.images || (entry.img ? [entry.img] : []),
});

const products = [
  p({
    code: 'SAD',
    title: 'Square Ceiling Diffuser',
    category: 'Diffusers',
    subCategory: 'Square Ceiling Diffusers',
    shortDescription:
      'Square face ceiling diffuser with adjustable air pattern. Aluminum powder-coated, ASHRAE-compliant.',
    specs: {
      sizes: ['150', '225', '300', '375', '450', '525', '600'],
      material: 'Extruded aluminum, powder-coated',
      finish: 'RAL 9010 white (standard), custom colors on request',
      application: 'Supply and return air in commercial ceilings',
    },
    performance: {
      airflowRange: '50 – 1100 L/s',
      throwRange: '1.0 – 7.5 m',
      noiseLevel: 'NC 20 – 35',
      pressureDrop: '15 – 75 Pa',
    },
    img: '/images/CD.jpeg',
    sortOrder: 10,
    featured: true,
  }),
  p({
    code: 'RAD',
    title: 'Round/Square Ceiling Diffuser',
    category: 'Diffusers',
    subCategory: 'Round Ceiling Diffusers',
    shortDescription:
      'Round neck with square face — uniform 4-way blow pattern, ideal for high-ceiling commercial spaces.',
    specs: {
      sizes: ['200', '250', '300', '400', '500'],
      material: 'Spun aluminum, powder-coated',
      finish: 'RAL 9010 white, anodized optional',
      application: '4-way uniform air distribution',
    },
    img: '/images/CD.jpeg',
    sortOrder: 20,
  }),
  p({
    code: 'SLSD',
    title: 'Square Linear Slot Diffuser',
    category: 'Diffusers',
    subCategory: 'Linear Slot Diffusers',
    shortDescription:
      '1–4 slot architectural linear diffuser. Plaster-in frames and adjustable deflection vanes available.',
    specs: {
      sizes: ['1-slot', '2-slot', '3-slot', '4-slot — lengths to 3000 mm'],
      material: 'Extruded aluminum',
      finish: 'Black core, white frame; custom RAL on request',
      application: 'Continuous architectural ceiling line',
    },
    img: '/images/SLSD RLSD.jpeg',
    sortOrder: 30,
    featured: true,
  }),
  p({
    code: 'RLSD',
    title: 'Round Linear Slot Diffuser',
    category: 'Diffusers',
    subCategory: 'Linear Slot Diffusers',
    shortDescription:
      'Continuous slot diffuser for round duct integration. High induction ratio, architectural finish.',
    specs: {
      sizes: ['Custom lengths to 3000 mm'],
      material: 'Extruded aluminum',
      finish: 'Anodized or powder-coated',
      application: 'Architectural ceiling lines, exposed duct runs',
    },
    img: '/images/SLSD RLSD.jpeg',
    sortOrder: 40,
  }),
  p({
    code: 'SAR',
    title: 'Supply Air Register',
    category: 'Grilles & Registers',
    subCategory: 'Supply Registers',
    shortDescription:
      'Single-deflection blade with integral volume control damper. Surface or duct-mount.',
    specs: {
      sizes: ['150×150 – 1200×600 (and custom)'],
      material: 'Extruded aluminum',
      finish: 'Powder-coated RAL 9010',
      application: 'Wall and ceiling supply air',
    },
    img: '/images/SAG.jpeg',
    sortOrder: 50,
  }),
  p({
    code: 'SAG',
    title: 'Supply Air Grille',
    category: 'Grilles & Registers',
    subCategory: 'Double-Deflection Supply Grilles',
    shortDescription:
      'Horizontal + vertical adjustable double-deflection blades for full air-pattern control.',
    specs: {
      sizes: ['200×100 – 1500×600 (and custom)'],
      material: 'Extruded aluminum',
      finish: 'Anodized natural; powder-coated optional',
      application: 'Wall-mounted supply air',
    },
    img: '/images/SAG.jpeg',
    sortOrder: 60,
  }),
  p({
    code: 'RAG',
    title: 'Return Air Grille',
    category: 'Grilles & Registers',
    subCategory: 'Return Grilles',
    shortDescription:
      'Fixed 0° / 45° blade return grille. High free area, optional filter frame.',
    specs: {
      sizes: ['200×100 – 1500×600 (and custom)'],
      material: 'Extruded aluminum',
      finish: 'Powder-coated white',
      application: 'Wall and ceiling return air',
    },
    img: '/images/RAG.jpeg',
    sortOrder: 70,
  }),
  p({
    code: 'SLBR',
    title: 'Linear Bar Register',
    category: 'Grilles & Registers',
    subCategory: 'Linear Bar Grilles',
    shortDescription:
      'Continuous linear bar grille. Floor, wall, and ceiling mounting. Available with 0°, 15°, 22.5°, 30° blade deflection.',
    specs: {
      sizes: ['Custom lengths to 3000 mm'],
      material: 'Extruded aluminum',
      finish: 'Anodized natural; powder-coated optional',
      application: 'Architectural integration — floor, sill, ceiling',
    },
    img: '/images/SLBR.jpeg',
    sortOrder: 80,
  }),
  p({
    code: 'EAL',
    title: 'Exhaust Air Louver',
    category: 'Louvers',
    subCategory: 'Weather Louvers',
    shortDescription:
      'Drainable-blade weather louver with bird mesh. Rain defeat tested for UAE coastal conditions.',
    specs: {
      sizes: ['200×200 – 3000×3000 (modular)'],
      material: 'Extruded aluminum, heavy-gauge frame',
      finish: 'Mill, anodized, or powder-coated',
      application: 'Fresh air intake and exhaust louvers',
    },
    img: '/images/EAL STL.jpeg',
    sortOrder: 90,
  }),
  p({
    code: 'STL',
    title: 'Sand Trap Louver',
    category: 'Louvers',
    subCategory: 'Sand-Trap Louvers',
    shortDescription:
      'Multi-stage labyrinth louver engineered for Gulf desert climates. Removes airborne sand and dust before it enters the AHU.',
    specs: {
      sizes: ['400×400 – 3000×3000 (modular)'],
      material: 'Extruded aluminum, heavy-gauge frame',
      finish: 'Mill, anodized, or powder-coated',
      application: 'AHU intakes in sandy / arid environments',
    },
    performance: {
      airflowRange: 'Face velocity 1.5 – 2.5 m/s',
      pressureDrop: '40 – 110 Pa at design velocity',
    },
    img: '/images/EAL STL.jpeg',
    sortOrder: 5,
    featured: true,
  }),
  p({
    code: 'VCD',
    title: 'Volume Control Damper',
    category: 'Dampers',
    subCategory: 'Volume Control Dampers',
    shortDescription:
      'Opposed or parallel blade VCD. Manual quadrant or motorized actuator. Precise duct airflow balancing.',
    specs: {
      sizes: ['100×100 – 2000×1500 (and round)'],
      material: 'Galvanized steel frame, aluminum blades',
      finish: 'Mill galvanized',
      application: 'In-duct flow regulation and balancing',
    },
    img: '/images/VCD.jpeg',
    sortOrder: 100,
  }),
  p({
    code: 'NRD',
    title: 'Non-Return Damper',
    category: 'Dampers',
    subCategory: 'Backdraft Dampers',
    shortDescription:
      'Gravity-operated backdraft damper. Low pressure drop, prevents reverse airflow on fan shutdown.',
    specs: {
      sizes: ['100×100 – 1500×1000'],
      material: 'Aluminum blades, galvanized frame',
      finish: 'Mill',
      application: 'Exhaust fan discharge, fresh air shut-off',
    },
    img: '/images/NRD.jpeg',
    sortOrder: 110,
  }),
];

async function seedProducts() {
  await Product.deleteMany();
  // Sequential create so the pre-validate hook fires per doc and resolves
  // slug collisions against already-inserted records in this run.
  for (const entry of products) {
    await Product.create(entry);
  }
  console.log(`Products seeded (${products.length})`);
}

if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Mongo Connected');
      await seedProducts();
      process.exit();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = seedProducts;
