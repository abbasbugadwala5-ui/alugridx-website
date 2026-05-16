const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    location: String,
    products: String,
    year: String,
    img: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  'Project',
  ProjectSchema
);
