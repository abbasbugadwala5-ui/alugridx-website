const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Enquiry = require('../models/Enquiry');
const Product = require('../models/Product');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Faq = require('../models/Faq');

router.get('/stats', auth, async (req, res) => {
  try {
    const [enquiries, products, projects, blogs, faqs, newEnquiries] = await Promise.all([
      Enquiry.countDocuments(),
      Product.countDocuments(),
      Project.countDocuments(),
      Blog.countDocuments(),
      Faq.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
    ]);

    const recent = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: { enquiries, products, projects, blogs, faqs, newEnquiries, recent },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
