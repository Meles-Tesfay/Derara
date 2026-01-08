const Request = require('../models/Request');

// Create a new request/inquiry
exports.createRequest = async (req, res) => {
  const { type, subject, description } = req.body;
  try {
    const request = await Request.create({
      user: req.user._id,
      type,
      subject,
      description,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get history of requests for current customer
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
