const express = require('express');
const router = express.Router();
const managerCtrl = require('../controllers/managerController');
const employeeCtrl = require('../controllers/employeeController');
const customerCtrl = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/authMiddleware');

// --- MANAGER ROUTES ---
router.post('/services', protect, authorize('manager', 'admin'), managerCtrl.createService);
router.get('/services', managerCtrl.getServices); // Public-ish, but managed by manager
router.put('/services/:id', protect, authorize('manager', 'admin'), managerCtrl.updateService);
router.delete('/services/:id', protect, authorize('manager', 'admin'), managerCtrl.deleteService);

router.post('/tasks', protect, authorize('manager', 'admin'), managerCtrl.assignTask);
router.get('/tasks/all', protect, authorize('manager', 'admin'), managerCtrl.getAllTasks);
router.get('/requests/all', protect, authorize('manager', 'admin'), managerCtrl.getAllRequests);
router.put('/requests/:id/respond', protect, authorize('manager', 'admin'), managerCtrl.respondToRequest);

// --- EMPLOYEE ROUTES ---
router.get('/tasks/my', protect, authorize('employee', 'manager', 'admin'), employeeCtrl.getMyTasks);
router.put('/tasks/:id/status', protect, authorize('employee', 'manager', 'admin'), employeeCtrl.updateTaskStatus);

// --- CUSTOMER ROUTES ---
router.post('/requests', protect, authorize('customer', 'admin'), customerCtrl.createRequest);
router.get('/requests/my', protect, authorize('customer', 'admin'), customerCtrl.getMyRequests);

module.exports = router;
