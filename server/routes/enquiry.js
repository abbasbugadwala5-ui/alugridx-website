const express  = require('express');
const router   = express.Router();
const Enquiry  = require('../models/Enquiry');
const auth     = require('../middleware/auth');
const { sendEnquiryNotification } = require('../utils/email');

// ── POST /api/enquiry ─────────────────────────────────────────
// Called by every form on the website (contact, catalogue, homepage)
// 1. Validates input
// 2. Saves to MongoDB
// 3. Sends email notification (non-blocking — won't fail the request)
// ─────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;

    // ── Validation ──
    if (!name || !name.trim())  return res.status(400).json({ success: false, message: 'Name is required.' });
    if (!email || !email.trim()) return res.status(400).json({ success: false, message: 'Email is required.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });

    // ── Save to database ──
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '';

    const enquiry = await Enquiry.create({
      name    : name.trim(),
      email   : email.trim().toLowerCase(),
      company : company?.trim()   || '',
      phone   : phone?.trim()     || '',
      subject : subject?.trim()   || 'General Enquiry',
      message : message?.trim()   || '',
      ip,
    });

    console.log(`📩  New enquiry saved | ${enquiry.name} <${enquiry.email}> | ${enquiry.subject}`);

    // ── Send email notification (fire & forget — won't block response) ──
    if (process.env.SMTP_HOST || process.env.GMAIL_USER) {
      sendEnquiryNotification(enquiry).catch(err =>
        console.error('Email send error (non-fatal):', err.message)
      );
    } else {
      console.warn('⚠️  Email not configured — set SMTP_* or GMAIL_* in .env to enable emails');
    }

    // ── Respond to client ──
    return res.status(201).json({
      success : true,
      message : 'Thank you! Your enquiry has been received. We will respond within 1 business day.',
      id      : enquiry._id,
    });

  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join(' ');
      return res.status(400).json({ success: false, message: messages });
    }
    console.error('Enquiry POST error:', err.message);
    return res.status(500).json({
      success : false,
      message : 'Server error. Please email us directly at info@alugridx.com',
    });
  }
});

// ── GET /api/enquiry ──────────────────────────────────────────
// Used by admin panel dashboard + enquiries page
// Add authentication middleware here before going live
// ─────────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, parseInt(req.query.limit) || 25);
    const status = req.query.status; // optional filter: new | read | replied | archived
    const query  = status ? { status } : {};

    const [data, total] = await Promise.all([
      Enquiry.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Enquiry.countDocuments(query),
    ]);

    return res.json({
      success    : true,
      data,
      pagination : { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error('Enquiry GET error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── PATCH /api/enquiry/:id/status ─────────────────────────────
// Admin panel: update enquiry status (new → read → replied → archived)
// ─────────────────────────────────────────────────────────────
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['new', 'read', 'replied', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${allowed.join(', ')}` });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found.' });

    return res.json({ success: true, data: enquiry });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;