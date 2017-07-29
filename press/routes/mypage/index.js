var express = require('express');
var router = express.Router();
var category = require('./category');
var alltimes = require('./alltimes');
var main = require('./main');

router.use('/category', category);
router.use('/alltimes', alltimes);
router.use('/main', main);

module.exports = router;
