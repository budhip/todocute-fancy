const User = require('../models/User');
const genSalt = require('../helpers/generateSalt');

function signup(req,res){
  var salt = genSalt.genRandomString(8);
  var hash = genSalt.createHash(req.body.password, salt);
  User.create({
    name: req.body.name,
    username: req.body.username,
    password: hash,
    email:req.body.email,
    userIdFb: '',
    salt: salt
  })
  .then((data) => {
    res.status(200).json({message: 'Success create'})
  })
  .catch((err) => {
    return res.status(400).send({
      message: err.message
    })
  })
}

module.exports = {
  signup
}
