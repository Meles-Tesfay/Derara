const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // e.g., 'Quote', 'Inquiry', 'Support'
    subject: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['open', 'in-review', 'responded', 'closed'],
      default: 'open',
    },
    response: { type: String }, // Response from manager/employee
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
