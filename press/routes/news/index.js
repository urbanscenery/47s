var express = require('express');
var router = express.Router();
var currentnews = require('./currentnews');
var presentnews = require('./presentnews');

router.use('/current', currentnews);
router.use('/past', pastnews);

module.exports = router;
