const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Coffee Beans', 'Equipment', 'Consulting'
    image: { type: String }, // URL to image
    isVisible: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
