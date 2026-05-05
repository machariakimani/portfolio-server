// routes/skillsRoute.js
const express = require('express');
const router = express.Router();
const skillsController = require('../controlers/skillsControler');
const verifyJWT = require('../middleware/verifyJWT');
const upload = require('../middleware/upload');

router.route('/')
  .get(skillsController.getSkills)
  .post(verifyJWT, upload.single('categoryImage'), skillsController.createSkill);  // ✅

router.route('/:id')
  .put(verifyJWT, upload.single('categoryImage'), skillsController.updateSkill)    // ✅
  .delete(verifyJWT, skillsController.deleteSkill);

module.exports = router;