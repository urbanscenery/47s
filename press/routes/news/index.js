var express = require('express');
var router = express.Router();
var login = require('./category');
router.use('/category', login);

module.exports = router;
