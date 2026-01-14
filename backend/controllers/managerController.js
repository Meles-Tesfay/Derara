const Service = require('../models/Service');
const Task = require('../models/Task');
const Request = require('../models/Request');
const Product = require('../models/Product');
const Testimonial = require('../models/Testimonial');
const Certificate = require('../models/Certificate');
const Blog = require('../models/Blog');
const Contact = require('../models/Contact');
const Gallery = require('../models/Gallery');
const Hero = require('../models/Hero');
const Feature = require('../models/Feature');
const About = require('../models/About');
const ContactInfo = require('../models/ContactInfo');

// Helper for generic CRUD
const createItem = (Model) => async (req, res) => {
  try {
    const item = await Model.create({ ...req.body, createdBy: req.user.clerkId });
    res.status(201).json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const getItems = (Model) => async (req, res) => {
  try {
    const items = await Model.find({});
    res.json(items);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateItem = (Model) => async (req, res) => {
  try {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const deleteItem = (Model) => async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: `${Model.modelName} removed` });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- Service Management ---
exports.createService = createItem(Service);
exports.getServices = getItems(Service);
exports.updateService = updateItem(Service);
exports.deleteService = deleteItem(Service);

// --- Product Management ---
exports.createProduct = createItem(Product);
exports.getProducts = getItems(Product);
exports.updateProduct = updateItem(Product);
exports.deleteProduct = deleteItem(Product);

// --- Testimonial Management ---
exports.createTestimonial = createItem(Testimonial);
exports.getTestimonials = getItems(Testimonial);
exports.updateTestimonial = updateItem(Testimonial);
exports.deleteTestimonial = deleteItem(Testimonial);

// --- Certificate Management ---
exports.createCertificate = createItem(Certificate);
exports.getCertificates = getItems(Certificate);
exports.updateCertificate = updateItem(Certificate);
exports.deleteCertificate = deleteItem(Certificate);

// --- Blog Management ---
exports.createBlog = createItem(Blog);
exports.getBlogs = getItems(Blog);
exports.updateBlog = updateItem(Blog);
exports.deleteBlog = deleteItem(Blog);

// --- Gallery Management ---
exports.createGalleryItem = createItem(Gallery);
exports.getGalleryItems = getItems(Gallery);
exports.updateGalleryItem = updateItem(Gallery);
exports.deleteGalleryItem = deleteItem(Gallery);

// --- Hero (Home Page Carousel) Management ---
exports.createHero = createItem(Hero);
exports.getHeroes = getItems(Hero);
exports.updateHero = updateItem(Hero);
exports.deleteHero = deleteItem(Hero);

// --- Feature Management ---
exports.createFeature = createItem(Feature);
exports.getFeatures = getItems(Feature);
exports.updateFeature = updateItem(Feature);
exports.deleteFeature = deleteItem(Feature);

// --- About Management ---
exports.createAbout = createItem(About);
exports.getAbouts = getItems(About);
exports.updateAbout = updateItem(About);
exports.deleteAbout = deleteItem(About);

// --- ContactInfo Management ---
exports.createContactInfo = createItem(ContactInfo);
exports.getContactInfos = getItems(ContactInfo);
exports.updateContactInfo = updateItem(ContactInfo);
exports.deleteContactInfo = deleteItem(ContactInfo);

// --- Contact Inquiry Management ---
exports.getAllContacts = async (req, res) => {
  try {
    const items = await Contact.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.deleteContact = deleteItem(Contact);
exports.respondToContact = async (req, res) => {
  try {
    const item = await Contact.findByIdAndUpdate(
      req.params.id,
      { response: req.body.response, status: 'responded' },
      { new: true }
    );
    res.json(item);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- Task Management ---
exports.assignTask = async (req, res) => {
  const { title, description, assignedTo, dueDate } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      assignedTo,
      dueDate,
      assignedBy: req.user.clerkId
    });
    res.status(201).json(task);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- Request Management ---
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.respondToRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { response: req.body.response, status: 'responded' },
      { new: true }
    );
    res.json(request);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
