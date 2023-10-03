const express = require('express');
const indexController = require('../controllers');

const router = express.Router();

router.route('/').get(indexController.dashboard);

router.use('/users', require('./users'));

module.exports = router;
