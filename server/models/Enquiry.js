const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
  company: { type: String, trim: true, default: '' },
  phone: { type: String, trim: true, default: '' },
  subject: { type: String, default: 'General Enquiry' },
  message: { type: String, trim: true, maxlength: 2000, default: '' },
  status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  ip: { type: String, default: '' },
}, { timestamps: true });

enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ status: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
