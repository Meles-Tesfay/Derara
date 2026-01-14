const Task = require('../models/Task');

// Get tasks assigned to current employee
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.clerkId }); // Clerk ID
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task status and add report
exports.updateTaskStatus = async (req, res) => {
  const { status, report } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user.clerkId }, // Clerk ID
      { status, report },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
