require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const enquiryRoutes = require('./routes/enquiry');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://www.alugridx.com'].filter(Boolean),
  methods: ['GET', 'POST'],
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 30 }));
app.use(express.json({ limit: '10kb' }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/alugridx')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err.message));

app.use('/api/enquiry', enquiryRoutes);
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'ALUGRIDX API v2' }));
app.use((_, res) => res.status(404).json({ success: false, message: 'Not found' }));
app.use((err, _, res, __) => res.status(500).json({ success: false, message: 'Server error' }));

app.listen(PORT, () => console.log(`🚀 ALUGRIDX API → http://localhost:${PORT}`));
