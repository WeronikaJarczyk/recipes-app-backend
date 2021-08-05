const express = require('express');
const router = express.Router();
const { toMinutes } = require('../middleware/toMinutes');
const Training = require('../models/Training');

router.post('/add', toMinutes, async (req, res) => {
  try {
    const { name, duration, burntCalories, userId } = req.body;

    const training = new Training({
      name,
      duration,
      burntCalories,
      userId
    });

    await training.save();
    res.status(200).json({ message: "Training successfully added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const { userId } = req.body;

    const userTrainings = await Training.find({ userId });

    const trainings = await Training.find({ userId: "" });

    res.status(200).json({ trainings, userTrainings });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;