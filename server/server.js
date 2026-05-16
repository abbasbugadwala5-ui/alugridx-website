require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const enquiryRoutes = require('./routes/enquiry');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const projectRoutes = require('./routes/projects');
const blogRoutes = require('./routes/blogs');
const productRoutes = require('./routes/products');
const faqRoutes = require('./routes/faqs');
const uploadRoutes = require('./routes/upload');

const app = express();

const PORT = process.env.PORT || 5001;

// MIDDLEWARES
app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json({ limit: '10kb' }));

// Rate limits: only on sensitive write endpoints, not on public reads.
// Generous in development so HMR + Strict-Mode double-fires don't trip 429.
const isProd = process.env.NODE_ENV === 'production';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 10 : 100,        // 10/15min in prod (brute-force guard)
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, try again in a few minutes.' },
});

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 30 : 500,        // form submissions / uploads
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, try again shortly.' },
});

// ROUTES
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/enquiry', writeLimiter, enquiryRoutes);
app.use('/api/upload', writeLimiter, uploadRoutes);

// HEALTH
app.get('/health', (_, res) =>
  res.json({
    status: 'ok',
    service: 'ALUGRIDX API v2',
  })
);

// 404
app.use((_, res) =>
  res.status(404).json({
    success: false,
    message: 'Not found',
  })
);

// ERROR
app.use((err, _, res, __) =>
  res.status(500).json({
    success: false,
    message: 'Server error',
  })
);

// DB CONNECT
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 ALUGRIDX API → http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Mongo Error:', err);
  });