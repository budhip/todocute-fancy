var express = require('express');
var router = express.Router();

var auth = require('../controllers/authController');

//User info route
router.post('/userinfo', auth.authUser)

module.exports = router;
