const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

// Submit contact form
router.post('/', contactController.submitContactForm);

module.exports = router;