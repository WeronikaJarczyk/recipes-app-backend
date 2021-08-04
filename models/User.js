const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 8
  }
});

module.exports = mongoose.model('User', UserSchema);
// User
// Login
// Password
// Email -> potwierdzenie
// UserId-> w bazie
// Friends-> Ids + Login
