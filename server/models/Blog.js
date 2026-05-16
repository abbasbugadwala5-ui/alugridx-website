const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    excerpt: String,
    content: String,
    published: { type: Boolean, default: false },
    date: String,
    img: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Blog',
  BlogSchema
);
