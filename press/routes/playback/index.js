var express = require('express');
var router = express.Router();
var audio = require('./audio');

router.use('/audio', audio);

module.exports = router;
