const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  calories: {
    type: Number,
  },
  macros: {
    protein: Number,
    carbs: Number,
    fat: Number
  },
  makingTime: Number,
  ingredients: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);