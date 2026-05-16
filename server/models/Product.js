const mongoose = require('mongoose');

const slugify = (str = '') =>
  String(str)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const escapeRegex = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const SpecsSchema = new mongoose.Schema(
  {
    sizes: { type: [String], default: [] },
    material: { type: String, default: '' },
    finish: { type: String, default: '' },
    application: { type: String, default: '' },
  },
  { _id: false }
);

const PerformanceSchema = new mongoose.Schema(
  {
    airflowRange: { type: String, default: '' },
    throwRange: { type: String, default: '' },
    noiseLevel: { type: String, default: '' },
    pressureDrop: { type: String, default: '' },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    category: { type: String, default: '', trim: true, index: true },
    subCategory: { type: String, default: '', trim: true, index: true },

    shortDescription: { type: String, default: '', trim: true },

    specs: { type: SpecsSchema, default: () => ({}) },
    performance: { type: PerformanceSchema, default: () => ({}) },

    images: { type: [String], default: [] },
    technicalDrawing: { type: String, default: '' },
    datasheetUrl: { type: String, default: '' },

    sortOrder: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

ProductSchema.index({ title: 'text', code: 'text', shortDescription: 'text' });
ProductSchema.index({ category: 1, subCategory: 1, sortOrder: 1 });

// Always produce a unique slug. Order of preference:
//   1. base                  (slugified title or user override)
//   2. base-{code}           (when code disambiguates similar titles)
//   3. base-2, base-3, ...   (numeric suffix)
// One DB hit: regex-fetch every slug starting with `base`, then pick locally.
ProductSchema.pre('validate', async function (next) {
  try {
    if (!this.slug && this.title) {
      this.slug = slugify(this.title);
    } else if (this.slug) {
      this.slug = slugify(this.slug);
    }
    if (!this.slug) return next();

    const base = this.slug;

    // Only resolve when something might collide. If the slug is unchanged on an
    // update, skip the DB lookup.
    if (!this.isNew && !this.isModified('slug')) return next();

    const matches = await this.constructor
      .find({
        slug: new RegExp(`^${escapeRegex(base)}(-.+)?$`),
        ...(this._id ? { _id: { $ne: this._id } } : {}),
      })
      .select('slug')
      .lean();

    const taken = new Set(matches.map((d) => d.slug));

    if (!taken.has(base)) {
      this.slug = base;
      return next();
    }

    const codeSlug = this.code ? slugify(this.code) : '';
    if (codeSlug) {
      const withCode = `${base}-${codeSlug}`;
      if (!taken.has(withCode)) {
        this.slug = withCode;
        return next();
      }
    }

    for (let i = 2; i < 1000; i++) {
      const candidate = `${base}-${i}`;
      if (!taken.has(candidate)) {
        this.slug = candidate;
        return next();
      }
    }

    return next(new Error(`Could not generate a unique slug from "${this.title}"`));
  } catch (err) {
    return next(err);
  }
});

ProductSchema.statics.slugify = slugify;

module.exports = mongoose.model('Product', ProductSchema);
