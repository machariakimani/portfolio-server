// routes/projectsRoute.js
const express = require('express');
const router = express.Router();
const projectsControler = require('../controlers/projectsControler');
const verifyJWT = require('../middleware/verifyJWT');
const upload = require('../middleware/upload');

router.route('/')
  .get(projectsControler.getProjects)
  .post(verifyJWT, upload.single('projectImage'), projectsControler.createProject);

router.route('/:id')
  .put(verifyJWT, upload.single('projectImage'), projectsControler.updateProject)
  .delete(verifyJWT, projectsControler.deleteProject);

module.exports = router;