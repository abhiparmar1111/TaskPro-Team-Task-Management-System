const express = require('express');
const router = express.Router();
const {createProject, getAllProjects, updateProject, deleteProject } = require('../controllers/projectController') ;
const verifyToken = require("../middleware/authMiddleware");

router.post('/', verifyToken, createProject);
router.get('/', verifyToken, getAllProjects);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

module.exports = router;