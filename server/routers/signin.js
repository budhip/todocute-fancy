const express = require('express');
const router = express.Router();
const signinCont = require('../controllers/signinController')

router.post('/', signinCont.signin);

module.exports = router;
