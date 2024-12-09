const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware
const router = express.Router();

router.post('/create', authMiddleware, createTask);     // Protected: Create a task
router.get('/list', authMiddleware, getTasks);           // Protected: Get all tasks
router.get('/:id', authMiddleware, getTaskById);         // Protected: Get task by ID
router.put('/update/:id', authMiddleware, updateTask);   // Protected: Update a task
router.delete('/remove/:id', authMiddleware, deleteTask); // Protected: Delete a task

module.exports = router;
