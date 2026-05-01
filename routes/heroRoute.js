// routes/heroRoute.js
const express = require('express');
const router = express.Router();
const heroControler = require('../controlers/heroControler')
const verifyJWT = require('../middleware/verifyJWT')
const upload = require('../middleware/upload')

router.route('/')
  .get(heroControler.getHero)
  
  //router.use(verifyJWT)
  .post(upload.single('heroPortrait'), heroControler.updateHero)
  .put(upload.single('heroPortrait'), heroControler.updateHero)

module.exports = router;