const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Faq = require('../models/Faq');

router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const faq = await Faq.create(req.body);
    res.json({ success: true, data: faq });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!faq) {
      return res.status(404).json({ success: false, message: 'FAQ not found' });
    }
    res.json({ success: true, data: faq });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
