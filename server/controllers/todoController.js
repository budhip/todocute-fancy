var Todo = require('../models/Todo');
var verTok = require('../helpers/verifyToken')

var getAllTaskTodo = function(req, res) {
  console.log('ini token getAllTaskTodo', req.body.token);
  verTok.userInfo(req.body.token, function(result) {
    Todo.find({ creator: result.id }, (err, todos) => {
      res.send(todos)
    })
  });
}

var createNewTaskTodo = function(req, res) {
  var task = req.body.task;
  var tglTaskTodo = req.body.tglTaskTodo;
  var tags = req.body.tags.split(',');
  tags = tags.map(tag => tag.trim());
  verTok.userInfo(req.body.token, function(result) {
    var newTodo = new Todo({
      task: task,
      tglTaskTodo: tglTaskTodo,
      creator: result.id,
      status: false,
      tags: tags
    })
    newTodo.save((err, todo) => {
      if(err) {
        res.send(err.errors)
      } else res.send(todo)
    })
  })
}

var getOneTaskTodo = function(req, res) {
  Todo.find({_id: req.params.id}, (err, todo) => {
    res.send(todo)
  })
}

var updateSpecifiedTaskTodo = function(req, res) {
  verTok.userInfo(req.body.token, function(result) {
    Todo.findById(req.params.id, (err, todo) => {
      if(err) {
        res.send(err)
      } else {
        if(todo.creator == result.id) {
          todo.task = req.body.task;
          todo.status = req.body.status;
          todo.tglTaskTodo = req.body.tglTaskTodo;
          todo.tags = req.body.tags;
          todo.save((err, newTodo) => {
            if(err) {
              res.send(err.errors)
            } else res.send(newTodo)
          })
        } else {
          res.send(todo)
        }
      }
    })
  })
}

var toggleStatus = function(req, res) {
  Todo.findById(req.params.id, (err, todo) => {
    if(err) {
      res.send(err)
    } else {
      todo.status = req.body.status;
      todo.save((err, newTodo) => {
        if(err) {
          res.send(err.errors)
        } else res.send(newTodo)
      })
    }
  })
}

var removeSpecifiedTaskTodo = function(req, res) {
  Todo.findById(req.params.id, (err, todo) => {
    if(err) {
      res.send(err)
    } else {
      Todo.remove({_id: todo._id}, (err, todo) => {
        if(err) {
          res.send(err)
        } else res.send(todo)
      })
    }
  })
}

module.exports = {
  getAllTaskTodo,
  createNewTaskTodo,
  getOneTaskTodo,
  updateSpecifiedTaskTodo,
  removeSpecifiedTaskTodo,
  toggleStatus
};
