var express = require('express');
var router = express.Router();
var scheduler = require('./scheduler');

router.use('/scheduler', scheduler);

module.exports = router;
