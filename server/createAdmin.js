require('dotenv').config({ path: __dirname + '/.env' });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Admin = require('./models/Admin');

const username = process.env.ADMIN_USERNAME || 'admin';
const password = process.env.ADMIN_PASSWORD;

if (!password) {
  console.error(
    '❌ ADMIN_PASSWORD not set in server/.env\n' +
    '   Add: ADMIN_PASSWORD=your-strong-password   (and optionally ADMIN_USERNAME=...)\n' +
    '   Then re-run: node createAdmin.js'
  );
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not set in server/.env');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    const hashed = await bcrypt.hash(password, 10);

    const exists = await Admin.findOne({ username });
    if (exists) {
      console.log(`Admin "${username}" already exists`);
      process.exit();
    }

    await Admin.create({ username, password: hashed });
    console.log(`✅ Admin "${username}" created`);
    process.exit();
  })
  .catch((err) => {
    console.error('Mongo error:', err.message);
    process.exit(1);
  });
