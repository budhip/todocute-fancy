const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nama tidak boleh kosong']
  },
  username: {
    type: String,
    required: [true, 'Username tidak boleh kosong']
  },
  password: {
    type: String,
    required: [true, 'Password tidak boleh kosong']
  },
  email: {
    type: String,
    required: [true, 'Email tidak boleh kosong']
  },
  userIdFb: {
    type: String
  },
  salt: {
    type: String
    // required: [true, 'Salt tidak boleh kosong']
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User
