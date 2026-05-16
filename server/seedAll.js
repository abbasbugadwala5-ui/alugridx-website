require('dotenv').config();

const mongoose = require('mongoose');

const seedProducts = require('./seedProducts');
const seedProjects = require('./seedProjects');
const seedBlogs = require('./seedBlogs');
const seedFaqs = require('./seedFaqs');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Mongo Connected');

    await seedProducts();
    await seedProjects();
    await seedBlogs();
    await seedFaqs();

    console.log('All collections seeded');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
