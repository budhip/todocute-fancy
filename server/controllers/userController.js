const User = require('../models/User');
const genSalt = require('../helpers/generateSalt');

function getAllUsers (req,res) {
  User.find({})
  .then(result => {
    res.send(result)
  })
  .catch(err=> {
    res.send(err)
  })
}

function getSingleUser(req, res) {
  User.find({_id: req.params.id})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function updateUser(req, res) {
  User.update({_id: req.params.id}, {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function deleteUser(req, res) {
  User.deleteOne({_id: req.params.id})
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
}
