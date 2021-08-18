const mongoose = require('mongoose');

const DayPlaneSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  totalCalories: {
    type: Number,
  },
  macros: {
    protein: Number,
    carbs: Number,
    fat: Number
  },
  recipes: [{
    type: String,
  }],
  trainings: [{
    type: String,
  }]
});
// Ingredient List from recipes
module.exports = mongoose.model('DayPlan', DayPlaneSchema);