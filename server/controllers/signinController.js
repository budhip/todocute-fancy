const User = require('../models/User');
const genSalt = require('../helpers/generateSalt');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const FB = require('fb');
const fb = new FB.Facebook({version: 'v2.8'});

function signin(req, res, next) {
  if (req.headers.accesstoken != undefined) {
    var token = req.headers.accesstoken
    FB.setAccessToken(req.headers.accesstoken);
    let userIdFbFromLogin = req.headers.id
    console.log(`
      token: ${req.headers.accesstoken}
      id: ${req.headers.id}
      first_name: ${req.headers.first_name}
      email: ${req.headers.email}
      name: ${req.headers.name}
      `);
    User.findOne({
      userIdFb: userIdFbFromLogin
    })
    .then(user => {
      if (!user) {
        console.log('bukan user, harus create')
        var salt = genSalt.genRandomString(8)
        var hash = genSalt.createHash(req.headers.first_name, salt)
        User.create({
          name: req.headers.name,
          username: req.headers.first_name,
          password: hash,
          email:req.headers.email,
          userIdFb: req.headers.id,
          salt: salt
        })
        .then(jadiUser => {
          console.log('jadi user',jadiUser);
          var token = jwt.sign({accesstoken: req.headers.accesstoken, username: req.headers.first_name, email:req.headers.email, userIdFb: req.headers.id}, process.env.SECRET_JWT);
          res.send({
            token: token,
            id: jadiUser._id,
            name: req.headers.name,
            username: req.headers.first_name,
            email: req.headers.email
          });
        })
        .catch(err => {
          res.send(err)
        })
      }
      if (user) {
        console.log('user dari login fb')
        console.log(user);
        console.log(userIdFbFromLogin);
        console.log(user.userIdFb);
        if(user.userIdFb == userIdFbFromLogin) {
          var token = jwt.sign({accesstoken: req.headers.accesstoken, id: user._id, username: user.username, email:user.email, userIdFb: user.userIdFb}, process.env.SECRET_JWT);
          res.send({
            token:token,
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          });
        } else {
          res.send('Maaf username atau password salah')
        }
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  if (req.headers.accesstoken == undefined) {
    User.findOne({
      username: req.body.username
    })
    .then(user=> {
      console.log('==============ini adalah user');
      var saltUserLogin = user.salt;
      console.log(saltUserLogin);
      var passwordUserLogin = req.body.password;

      var getPasswordUser = genSalt.createHash(passwordUserLogin, saltUserLogin)
      console.log('ini passwordUserLogin', getPasswordUser);
      console.log('ini user.password', user.password);
      if(user.password == getPasswordUser) {
        console.log(user._id);
        var token = jwt.sign({id: user._id, username: user.username, email:user.email}, process.env.SECRET_JWT);
        res.send({
          id: user.id,
          token: token,
          name: user.name,
          username: user.username,
          email: user.email
        });
      } else {
        res.send('Maaf username atau password salah')
      }
    })
    .catch(err => {
      res.send("Maaf username tidak terdaftar")
    })
  }

}

module.exports = {
  signin
}
