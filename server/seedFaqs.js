require('dotenv').config();

const mongoose = require('mongoose');
const Faq = require('./models/Faq');

const faqs = [
  {
    question: 'What materials are your products made of?',
    answer:
      'All ALUGRIDX products are manufactured using premium-grade aluminum — lightweight, durable, and corrosion-resistant. Finished with powder coating for long-lasting protection and a clean aesthetic.',
    order: 1,
    active: true,
  },
  {
    question: 'Are your products compliant with international standards?',
    answer:
      'Yes. All our products are designed and manufactured to comply with ASHRAE standards and international HVAC performance requirements.',
    order: 2,
    active: true,
  },
  {
    question: 'Do you provide customized solutions?',
    answer:
      'Absolutely. We offer custom sizes, custom powder-coat colors, and bespoke configurations to match your specific project requirements.',
    order: 3,
    active: true,
  },
  {
    question: 'What is the delivery timeframe?',
    answer:
      'Standard products are typically delivered within 7–14 working days across UAE & GCC. Lead times for custom orders vary based on specifications and quantities.',
    order: 4,
    active: true,
  },
  {
    question: 'Do you offer technical support?',
    answer:
      'Yes. Our team of engineers provides pre-sale consultation, technical specifications support, and post-sale installation guidance.',
    order: 5,
    active: true,
  },
  {
    question: 'What warranty do you offer?',
    answer:
      'ALUGRIDX offers a 1-year warranty on all products, covering defects in materials and workmanship including aluminum gauge quality and powder coating durability.',
    order: 6,
    active: true,
  },
  {
    question: 'Can you supply products for large-scale projects?',
    answer:
      'Yes. We have the manufacturing capacity to handle large-scale commercial, industrial, and infrastructure projects. Contact us to discuss volume pricing.',
    order: 7,
    active: true,
  },
  {
    question: 'Do you distribute outside UAE?',
    answer:
      'Yes. We deliver across the GCC region including Saudi Arabia, Kuwait, Bahrain, Qatar, Oman, and beyond. Contact us for international shipping enquiries.',
    order: 8,
    active: true,
  },
];

async function seedFaqs() {
  await Faq.deleteMany();
  await Faq.insertMany(faqs);
  console.log(`FAQs seeded (${faqs.length})`);
}

if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log('Mongo Connected');
      await seedFaqs();
      process.exit();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}

module.exports = seedFaqs;
