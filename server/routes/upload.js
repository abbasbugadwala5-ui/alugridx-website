const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const auth = require('../middleware/auth');
const { cloudinary, isConfigured } = require('../utils/cloudinary');

const router = express.Router();

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: (req) => ({
    folder: req.body?.folder || 'alugridx/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'],
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  }),
});

const upload = multer({
  storage: imageStorage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB per image
});

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: (req) => ({
    folder: req.body?.folder || 'alugridx/datasheets',
    resource_type: 'raw',
    format: 'pdf',
  }),
});

const pdfUpload = multer({
  storage: pdfStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB per PDF
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') return cb(null, true);
    cb(new Error('Only PDF files are accepted for datasheets.'));
  },
});

function requireCloudinary(_req, res, next) {
  if (!isConfigured) {
    return res.status(503).json({
      success: false,
      message:
        'Image upload service is not configured. Set CLOUDINARY_* env vars on the server.',
    });
  }
  next();
}

function fileToPayload(file) {
  return {
    url: file.path || file.secure_url,
    publicId: file.filename || file.public_id,
    originalName: file.originalname,
    width: file.width,
    height: file.height,
    bytes: file.size,
    format: file.format,
    resourceType: file.resource_type,
  };
}

// Single image — field name: "image"
router.post(
  '/image',
  auth,
  requireCloudinary,
  upload.single('image'),
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No image file received.' });
    }
    res.json({ success: true, data: fileToPayload(req.file) });
  }
);

// Multiple images — field name: "images" (max 10)
router.post(
  '/images',
  auth,
  requireCloudinary,
  upload.array('images', 10),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No image files received.' });
    }
    res.json({ success: true, data: req.files.map(fileToPayload) });
  }
);

// PDF datasheet — field name: "file"
router.post(
  '/datasheet',
  auth,
  requireCloudinary,
  pdfUpload.single('file'),
  (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No PDF file received.' });
    }
    res.json({ success: true, data: fileToPayload(req.file) });
  }
);

// Delete an asset by Cloudinary public_id.
// Use ?resourceType=raw for PDFs and other non-image assets.
router.delete('/:publicId(*)', auth, requireCloudinary, async (req, res) => {
  try {
    const resourceType = req.query.resourceType === 'raw' ? 'raw' : 'image';
    const result = await cloudinary.uploader.destroy(req.params.publicId, {
      resource_type: resourceType,
    });
    res.json({ success: result.result === 'ok', data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Surface multer errors as JSON instead of HTML
router.use((err, _req, res, _next) => {
  if (err) {
    const status = err.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
    return res
      .status(status)
      .json({ success: false, message: err.message || 'Upload failed.' });
  }
});

module.exports = router;
