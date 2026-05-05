const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

router.post('/', async (req, res) => {
  try {
    const { name, email, company, phone, subject, message } = req.body;
    if (!name || !email) return res.status(400).json({ success: false, message: 'Name and email required.' });
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ success: false, message: 'Invalid email.' });

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || '';
    const enquiry = await Enquiry.create({ name: name.trim(), email: email.trim().toLowerCase(), company: company?.trim() || '', phone: phone?.trim() || '', subject: subject || 'General Enquiry', message: message?.trim() || '', ip });

    console.log(`📩 Enquiry: ${enquiry.name} <${enquiry.email}> [${enquiry.subject}]`);
    res.status(201).json({ success: true, message: 'Enquiry received. We will respond within 1 business day.', id: enquiry._id });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: Object.values(err.errors).map(e => e.message).join('. ') });
    }
    res.status(500).json({ success: false, message: 'Server error. Email us at info@alugridx.com' });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const [data, total] = await Promise.all([
      Enquiry.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
      Enquiry.countDocuments(),
    ]);
    res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch { res.status(500).json({ success: false, message: 'Server error' }); }
});

module.exports = router;
