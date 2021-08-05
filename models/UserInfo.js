// UserInfo:
// sex  
//   weight
//   Age
//   Height
//   CalorieNeeds
//   UserId

const mongoose = require('mongoose');

const UserInfoSchema = mongoose.Schema({
  _id: String,
  sex: String,
  weight: Number,
  age: Number,
  height: Number,
  levelOfActivity: {
    timesPerWeek: Number,
    tempo: String,
    // tempo: No exercise, Light, Moderate, Intense
    trainingType: String,
    // type: strength, aerobic
    time: Number
    // in minutes
  },
  calorieNeeds: Number,
  friends: [{
    _id: String,
    login: String
  }]
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);