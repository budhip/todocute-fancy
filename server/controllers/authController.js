const User = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();

var authUser = function(req, res, next) {
  var token = req.body.token;
  console.log(token);
  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    console.log('ini decoded',decoded);
    res.send(decoded)
  })
}

var allUser = function(req, res, next) {
  jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
    if(decoded) {
      req.body.token = token;
      next()
    } else {
      res.send(err)
    }
  })
}

module.exports = {
  authUser,
  allUser
};
