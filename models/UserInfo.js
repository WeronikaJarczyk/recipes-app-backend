
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
    time: Number,
    // in minutes
    unit: String
  },
  calorieNeeds: Number,
  water: Number,
  friends: [{
    _id: String,
    login: String
  }]
});

module.exports = mongoose.model('UserInfo', UserInfoSchema);