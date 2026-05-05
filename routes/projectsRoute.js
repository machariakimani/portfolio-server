const express = require('express');
const router = express.Router();
const projectsController = require('../controlers/projectsControler');
const verifyJWT = require('../middleware/verifyJWT');
const upload = require('../middleware/upload'); // ✅ added

router.route('/')
    .get(projectsController.getProjects)
    .post(verifyJWT, upload.single('projectImage'), projectsController.createProject); 

router.route('/:id')
    .put(verifyJWT, upload.single('projectImage'), projectsController.updateProject)   
    .delete(verifyJWT, projectsController.deleteProject);

module.exports = router;