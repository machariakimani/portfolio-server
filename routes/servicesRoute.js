// routes/servicesRoute.js
const express = require('express');
const router = express.Router();
const servicesControler = require('../controlers/servicesControler');
const verifyJWT = require('../middleware/verifyJWT');
const upload = require('../middleware/upload'); // your multer-cloudinary config

router.route('/')
  .get(servicesControler.getServices)
  .post(verifyJWT, upload.single('serviceImage'), servicesControler.createService);

router.route('/:id')
  .put(verifyJWT, upload.single('serviceImage'), servicesControler.updateService)
  .delete(verifyJWT, servicesControler.deleteService);

module.exports = router;