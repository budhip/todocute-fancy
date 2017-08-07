var express = require('express');
var router = express.Router();

var auth = require('../controllers/authController');
var userCont = require('../controllers/userController');

// Route to get all user
router.get('/', userCont.getAllUsers);

// Route to create new user
// router.post('/', userctrl.create);

// Route to get one user
router.get('/:id', auth.authUser, userCont.getSingleUser);
// router.get('/:id', userCont.getSingleUser);

// Route to update user data
router.put('/:id', auth.authUser, userCont.updateUser);
// router.put('/:id', userCont.updateUser);

// Route to remove user data
router.delete('/:id', auth.authUser, userCont.deleteUser);
// router.delete('/:id', userCont.deleteUser);

module.exports = router;
