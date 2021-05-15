const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

router.use(authMiddleware)

const Project = require('../models/project');
const Task = require('../models/task');

router.get('/', async (req, res) => {

    try {
        const projects = await Project.find().populate(['user', 'tasks']);
        return res.status(200).json(projects);
    } catch (err) {
        return res.status(500).json({ error: 'Error loading projects' });
    }

});

router.get('/:projectId', async (req, res) => {

    try {
        const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);
        return res.status(200).json(project);
    } catch (err) {
        return res.status(500).json({ error: 'Error loading project' });
    }

});

router.post('/', async (req, res) => {

    try {

        const { title, description, tasks } = req.body;

        const project = await Project.create({ title, description, user: req.userId });

        await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id });
                await projectTask.save();
                project.tasks.push(projectTask);
            }) 
        );

        await project.save();

        return res.status(200).json({ project: project });
    } catch (err) {
        return res.status(500).json({ error: 'Error creating new project' });
    }

});

router.put('/:projectId', async (req, res) => {

    try {

        const { title, description, tasks } = req.body;

        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            title,
            description
        },
        {new: true});

        project.tasks = [];
        await Task.remove({ project: project._id });

        await Promise.all(tasks.map(async task => {
                const projectTask = new Task({ ...task, project: project._id });
                await projectTask.save();
                project.tasks.push(projectTask);
            }) 
        );

        await project.save();

        return res.status(200).json({ project: project });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Error updating project'});
    }

});

router.delete('/:projectId', async (req, res) => {

    try {
        await Project.findByIdAndRemove(req.params.projectId);
        return res.status(200).json();
    } catch (err) {
        return res.status(500).json({ error: 'Error deleting project' });
    }

});







module.exports = app => app.use('/projects', router);