const mongoose = require('mongoose');

const TrainingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  duaration: {
    type: Number,
    default: 30
  },
  burntCalories: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model('Training', TrainingSchema);
