const express = require('express');
const router = express.Router();
const {createTask, getTasks, getTaskById, updateTask, deleteTask} = require('../controllers/taskController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskById);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
