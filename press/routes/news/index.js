var express = require('express');
var router = express.Router();
var currentnews = require('./currentnews');
var pastnews = require('./pastnews');
var link = require('./link');

router.use('/current', currentnews);
router.use('/past', pastnews);
router.use('/link', link);

module.exports = router;
