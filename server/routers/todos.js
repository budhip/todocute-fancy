const express = require('express');
const router = express.Router();

const auth = require('../controllers/authController');
const todoCont = require('../controllers/todoController');

router.post('/', todoCont.getAllTaskTodo);

// Route to create new todo
router.post('/', auth.allUser, todoCont.createNewTaskTodo);
// router.post('/', todoCont.createNewTaskTodo);

router.post('/add', todoCont.createNewTaskTodo);

// Route to get one todo
router.get('/:id', auth.allUser, todoCont.getOneTaskTodo);
// router.get('/:id', todoCont.getOneTaskTodo);

// Route to update todo data
router.put('/:id', todoCont.updateSpecifiedTaskTodo);

router.put('/:id/toggle', todoCont.toggleStatus);

// Route to remove todo data
router.delete('/:id', todoCont.removeSpecifiedTaskTodo);

module.exports = router;
