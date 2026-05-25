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

  // --- Supply Air Registers (deflection variants) ---
  p({
    code: 'SAR-DD-H',
    title: 'Supply Air Register Double Deflection Horizontal',
    category: 'Grilles & Registers',
    subCategory: 'Supply Air Registers',
    shortDescription:
      'Double deflection supply register with horizontal front blades for precise airflow control.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Supply air distribution in HVAC systems',
    },
    img: '/images/products/sar-dd-h.jpg',
    sortOrder: 10,
  }),
  p({
    code: 'SAR-DD-V',
    title: 'Supply Air Register Double Deflection Vertical',
    category: 'Grilles & Registers',
    subCategory: 'Supply Air Registers',
    shortDescription:
      'Double deflection supply register with vertical blade arrangement for multidirectional airflow.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Commercial HVAC supply systems',
    },
    img: '/images/products/sar-dd-v.jpg',
    sortOrder: 11,
  }),
  p({
    code: 'SAR-SD-H',
    title: 'Supply Air Register Single Deflection Horizontal',
    category: 'Grilles & Registers',
    subCategory: 'Supply Air Registers',
    shortDescription:
      'Single deflection horizontal supply register for directional airflow control.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Wall-mounted supply air systems',
    },
    img: '/images/products/sar-sd-h.jpg',
    sortOrder: 12,
  }),
  p({
    code: 'SAR-SD-V',
    title: 'Supply Air Register Single Deflection Vertical',
    category: 'Grilles & Registers',
    subCategory: 'Supply Air Registers',
    shortDescription:
      'Vertical single deflection register for focused airflow applications.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'HVAC air supply systems',
    },
    img: '/images/products/sar-sd-v.jpg',
    sortOrder: 13,
  }),

  // --- Return Air Grilles / Registers ---
  p({
    code: 'RAG-HF',
    title: 'Return Air Grille Fixed Horizontal',
    category: 'Grilles & Registers',
    subCategory: 'Return Air Grilles',
    shortDescription:
      'Return air grille with fixed 45° horizontal blades for consistent airflow return.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Return air HVAC systems',
    },
    img: '/images/products/rag-hf.jpg',
    sortOrder: 20,
  }),
  p({
    code: 'RAG-V',
    title: 'Return Air Grille Vertical',
    category: 'Grilles & Registers',
    subCategory: 'Return Air Grilles',
    shortDescription:
      'Adjustable vertical blade return air grille for directional airflow control.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Commercial return air systems',
    },
    img: '/images/products/rag-v.jpg',
    sortOrder: 21,
  }),
  p({
    code: 'RAG-H',
    title: 'Return Air Grille Horizontal',
    category: 'Grilles & Registers',
    subCategory: 'Return Air Grilles',
    shortDescription:
      'Horizontal blade return air grille designed for smooth airflow return.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'HVAC return air systems',
    },
    img: '/images/products/rag-h.jpg',
    sortOrder: 22,
  }),
  p({
    code: 'RAR-H',
    title: 'Return Air Register with OBD',
    category: 'Grilles & Registers',
    subCategory: 'Return Air Registers',
    shortDescription:
      'Return air register with integrated opposed blade damper for airflow balancing.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Air return balancing systems',
    },
    img: '/images/products/rar-h.jpg',
    sortOrder: 23,
  }),
  p({
    code: 'EAG-SD',
    title: 'Exhaust Air Grille',
    category: 'Grilles & Registers',
    subCategory: 'Exhaust Air Grilles',
    shortDescription:
      '45° fixed blade exhaust grille designed for efficient exhaust airflow.',
    specs: {
      material: 'Aluminum or stainless steel',
      finish: 'Powder-coated',
      application: 'Bathrooms, kitchens, industrial exhaust',
    },
    img: '/images/products/eag-sd.jpg',
    sortOrder: 24,
  }),

  // --- Linear Slot Diffusers (additional variants) ---
  p({
    code: 'ELSD',
    title: 'Exhaust Linear Slot Diffuser',
    category: 'Diffusers',
    subCategory: 'Linear Slot Diffusers',
    shortDescription:
      'Exhaust linear slot diffuser for concealed modern ventilation systems.',
    specs: {
      material: 'Extruded aluminum',
      finish: 'Powder-coated white',
      application: 'Exhaust ventilation systems',
    },
    img: '/images/products/elsd.jpg',
    sortOrder: 32,
  }),
  p({
    code: 'DLSD',
    title: 'Dummy Linear Slot Diffuser',
    category: 'Diffusers',
    subCategory: 'Linear Slot Diffusers',
    shortDescription:
      'Non-active dummy slot diffuser for aesthetic ceiling alignment.',
    specs: {
      material: 'Extruded aluminum',
      finish: 'Powder-coated white',
      application: 'Architectural ceiling design',
    },
    img: '/images/products/dlsd.jpg',
    sortOrder: 33,
  }),

  // --- Door / Egg-Crate ---
  p({
    code: 'DTG',
    title: 'Door Transfer Grille',
    category: 'Grilles & Registers',
    subCategory: 'Door Grilles',
    shortDescription:
      'Door transfer grille designed for air circulation between rooms.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Doors and partition ventilation',
    },
    img: '/images/products/dtg.jpg',
    sortOrder: 40,
  }),
  p({
    code: 'ECR',
    title: 'Egg Crate Register',
    category: 'Grilles & Registers',
    subCategory: 'Egg Crate Grilles',
    shortDescription:
      'Egg crate style return air register for high free area airflow.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Return air systems',
    },
    img: '/images/products/ecr.jpg',
    sortOrder: 50,
  }),
  p({
    code: 'ECG',
    title: 'Egg Crate Grille',
    category: 'Grilles & Registers',
    subCategory: 'Egg Crate Grilles',
    shortDescription:
      'High airflow egg crate grille for return and exhaust applications.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated white',
      application: 'Commercial HVAC return air',
    },
    img: '/images/products/ecg.png',
    sortOrder: 51,
  }),

  // --- Louver variants ---
  p({
    code: 'EL-B',
    title: 'Exhaust Louver with Bird Screen',
    category: 'Louvers',
    subCategory: 'Weather Louvers',
    shortDescription:
      'Exhaust and intake air louver with integrated bird screen protection.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Outdoor ventilation systems',
    },
    img: '/images/products/el-b.jpg',
    featured: true,
    sortOrder: 60,
  }),
  p({
    code: 'EL-S',
    title: 'Exhaust Louver with Insect Screen',
    category: 'Louvers',
    subCategory: 'Weather Louvers',
    shortDescription:
      'Air louver with integrated insect screen for clean airflow protection.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Fresh air intake systems',
    },
    img: '/images/products/el-s.jpg',
    sortOrder: 61,
  }),
  p({
    code: 'EL-Y',
    title: 'Louver with Volume Control Damper',
    category: 'Louvers',
    subCategory: 'Weather Louvers',
    shortDescription:
      'Exhaust or intake louver with integrated opposed blade volume control damper.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Adjustable airflow systems',
    },
    img: '/images/products/el-y.jpg',
    sortOrder: 62,
  }),
  p({
    code: 'EL-F',
    title: 'Filtered Exhaust Louver',
    category: 'Louvers',
    subCategory: 'Filtered Louvers',
    shortDescription:
      'Exhaust or intake louver with removable washable air filter.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Filtered ventilation systems',
    },
    img: '/images/products/el-f.jpg',
    sortOrder: 63,
  }),
  p({
    code: 'EL-FV',
    title: 'Filtered Exhaust Louver with Damper',
    category: 'Louvers',
    subCategory: 'Filtered Louvers',
    shortDescription:
      'Filtered louver with removable washable filter and opposed blade damper.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Controlled filtered ventilation',
    },
    img: '/images/products/el-fv.jpg',
    sortOrder: 64,
  }),
  p({
    code: 'EL-T',
    title: 'Twin Bank Exhaust Louver',
    category: 'Louvers',
    subCategory: 'Weather Louvers',
    shortDescription:
      'Dual bank louver designed for varying weather conditions.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'External weather louvers',
    },
    img: '/images/products/el-t.jpg',
    sortOrder: 65,
  }),

  // --- Dampers / Gravity Louver ---
  p({
    code: 'NRD-RC-F',
    title: 'Non Return Damper (Flanged)',
    category: 'Dampers',
    subCategory: 'Back Draft Dampers',
    shortDescription:
      'Flanged duct-mounted non-return damper for preventing reverse airflow.',
    specs: {
      material: 'Galvanized steel and aluminum',
      finish: 'Mill finish',
      application: 'Duct backdraft prevention',
    },
    img: '/images/products/nrd-rc-f.png',
    sortOrder: 90,
  }),
  p({
    code: 'GL-RC-E',
    title: 'Gravity Louver',
    category: 'Louvers',
    subCategory: 'Gravity Louvers',
    shortDescription:
      'Gravity operated back draught louver for external wall installation.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'External exhaust systems',
    },
    img: '/images/products/gl-rc-e.png',
    sortOrder: 91,
  }),

  // --- Round / Swirl Ceiling Diffusers ---
  p({
    code: 'SCD',
    title: 'Supply Round Ceiling Diffuser',
    category: 'Diffusers',
    subCategory: 'Round Ceiling Diffusers',
    shortDescription:
      'Round ceiling diffuser with butterfly damper for radial air supply.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Ceiling supply air systems',
    },
    img: '/images/products/scd.png',
    featured: true,
    sortOrder: 100,
  }),
  p({
    code: 'RCD',
    title: 'Return Round Ceiling Diffuser',
    category: 'Diffusers',
    subCategory: 'Round Ceiling Diffusers',
    shortDescription:
      'Round return diffuser for ceiling mounted air extraction.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Return air extraction systems',
    },
    img: '/images/products/rcd.jpg',
    sortOrder: 101,
  }),
  p({
    code: 'RSD',
    title: 'Round Swirl Diffuser',
    category: 'Diffusers',
    subCategory: 'Swirl Diffusers',
    shortDescription:
      'High-capacity swirl diffuser designed for rapid air induction and long throw.',
    specs: {
      material: 'Sheet steel / aluminum',
      finish: 'RAL 9010 powder-coated',
      application: 'Airports, halls, commercial HVAC systems',
    },
    img: '/images/products/rsd.png',
    featured: true,
    sortOrder: 102,
  }),

  // --- Filter Housing ---
  p({
    code: 'AFV-8',
    title: 'Ceiling Housing with HEPA Filter',
    category: 'Filters',
    subCategory: 'HEPA Filter Housings',
    shortDescription:
      'Ceiling mounted HEPA filter housing for ultra-clean environments.',
    specs: {
      material: 'Galvanized steel',
      finish: 'Powder-coated',
      application: 'Hospitals, clean rooms, laboratories',
    },
    img: '/images/products/afv-8.png',
    sortOrder: 103,
  }),

  // --- Jet Diffusers ---
  p({
    code: 'JD-EBT',
    title: 'Jet Diffuser Eyeball Type',
    category: 'Diffusers',
    subCategory: 'Jet Diffusers',
    shortDescription:
      'Eyeball type jet diffuser for long throw air distribution in large spaces.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Airports, malls, theaters, exhibition halls',
    },
    performance: {
      throwRange: 'Up to 25 m',
    },
    img: '/images/products/jd-ebt.png',
    featured: true,
    sortOrder: 110,
  }),
  p({
    code: 'JD-RT',
    title: 'Jet Diffuser Ring Type',
    category: 'Diffusers',
    subCategory: 'Jet Diffusers',
    shortDescription:
      'Ring type jet diffuser with adjustable 360° airflow pattern.',
    specs: {
      material: 'Aluminum',
      finish: 'RAL 9010 / RAL 9016',
      application: 'Large commercial HVAC systems',
    },
    img: '/images/products/jd-rt.png',
    sortOrder: 111,
  }),

  // --- Flowbar Slot Diffusers ---
  p({
    code: 'FBD-F',
    title: 'Flowbar Slot Diffuser Flange Type',
    category: 'Diffusers',
    subCategory: 'Flowbar Diffusers',
    shortDescription:
      'High airflow Flowbar slot diffuser for ceiling applications.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'High airflow commercial spaces',
    },
    img: '/images/products/fbd-f.png',
    sortOrder: 120,
  }),
  p({
    code: 'FBD50-HF',
    title: 'Flowbar Slot Diffuser Hidden Frame',
    category: 'Diffusers',
    subCategory: 'Flowbar Diffusers',
    shortDescription:
      'Hidden frame Flowbar diffuser with adjustable airflow pattern.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Architectural ceiling systems',
    },
    img: '/images/products/fbd50-hf.png',
    sortOrder: 121,
  }),
  p({
    code: 'FBD50-PHF',
    title: 'Flowbar Slot Diffuser Plaster Hidden Frame',
    category: 'Diffusers',
    subCategory: 'Flowbar Diffusers',
    shortDescription:
      'Plaster hidden frame Flowbar diffuser for seamless ceiling integration.',
    specs: {
      material: 'Aluminum',
      finish: 'Powder-coated',
      application: 'Premium architectural interiors',
    },
    img: '/images/products/fbd50-phf.png',
    sortOrder: 122,
  }),

  // --- HVAC Units ---
  p({
    code: 'BPTU',
    title: 'Bypass Terminal Unit',
    category: 'HVAC Units',
    subCategory: 'VAV Terminal Units',
    shortDescription:
      'Variable air volume bypass terminal unit designed for airflow control and balancing.',
    specs: {
      material: 'Galvanized steel',
      finish: 'Mill finish',
      application: 'Commercial VAV air conditioning systems',
    },
    performance: {
      airflowRange: '24 – 1900 L/s',
    },
    img: '/images/products/bptu.png',
    featured: true,
    sortOrder: 130,
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
