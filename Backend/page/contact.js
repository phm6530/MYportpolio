const express = require('express');
const router = express.Router();
const contactController = require('../Controller/contactController');

router.post('/', contactController.requestMail);

module.exports = router;
