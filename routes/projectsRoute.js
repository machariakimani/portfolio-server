const express = require('express');
const router = express.Router();
const projectsController = require('../controlers/projectsControler');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(projectsController.getProjects)
    .post(verifyJWT, projectsController.createProject);

router.route('/:id')
    .put(verifyJWT, projectsController.updateProject)
    .delete(verifyJWT, projectsController.deleteProject);

module.exports = router;
