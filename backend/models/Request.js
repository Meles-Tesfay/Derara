const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    user: { type: String, required: true }, // Clerk User ID (String)
    type: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    phone: { type: String },
    status: {
      type: String,
      enum: ['open', 'in-review', 'responded', 'closed'],
      default: 'open',
    },
    response: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
