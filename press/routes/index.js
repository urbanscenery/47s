var express = require('express');
var router = express.Router();
var login = require('./login');
var mypage = require('./mypage');
var news = require('./news');
var scheduling = require('./scheduling');
var playback = require('./playback');


router.use('/login', login);
router.use('/mypage', mypage);
router.use('/news', news);
router.use('/scheduling', scheduling);
router.use('/playback', playback);



module.exports = router;
