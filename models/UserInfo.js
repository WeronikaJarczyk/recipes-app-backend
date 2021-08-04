// UserInfo:
//   weight
//   Age
//   Height
//   BMI
//   CalorieNeeds
//   UserId

const mongoose = require('mongoose');

const UserInfoSchema = mongoose.Schema({
  _id: String,
  weight: Number,
  age: Number,
  height: Number,
  BMI: Number,
  calorieNeeds: Number,
  friends: [{
    _id: String,
    login: String
  }]
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);