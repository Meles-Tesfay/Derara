const Service = require('../models/Service');
const Task = require('../models/Task');
const Request = require('../models/Request');
const User = require('../models/User');

// --- Service Management (COFFEE UI CONTENT) ---

exports.createService = async (req, res) => {
  const { name, description, category, image, isVisible } = req.body;
  try {
    const service = await Service.create({
      name,
      description,
      category,
      image,
      isVisible,
      createdBy: req.user._id,
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Task Management (Operations) ---

exports.assignTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      assignedTo,
      dueDate,
      assignedBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Request Management ---

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({}).populate('user', 'name email');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.respondToRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { response: req.body.response, status: 'responded' },
      { new: true }
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
