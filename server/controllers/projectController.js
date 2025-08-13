const { Project, Task } = require('../models');
const { Sequelize } = require('sequelize');


exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        const project = await Project.create({ title, description, userId });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
};

exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { userId: req.user.id },
        attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('Tasks.id')), 'taskCount']
                ]
            },
            include: [
                {
                    model: Task,
                    attributes: [],
                     where: { status: { [Sequelize.Op.ne]: 'done' } },
                     required: false
                }
            ],
            group: ['Project.id']
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const project = await Project.findOne({ where: { id } });
        if (!project) return res.status(404).json({ error: 'Project not found' });

        project.title = title || project.title;
        project.description = description || project.description;

        await project.save();
        res.json(project);

    } catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const project = await Project.findOne({ where: { id, userId } });
        if (!project) return res.status(404).json({ error: 'Project not found' });

        await project.destroy();
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
};