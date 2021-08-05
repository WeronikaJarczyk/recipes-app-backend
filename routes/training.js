const express = require('express');
const router = express.Router();
const Training = require('../models/Training');

router.post('/add', toMinutes, async (req, res) => {
  try {
    const { name, duration, burntCalories } = req.body;
    console.log(duration);
    const training = new Training({
      name,
      duration,
      burntCalories
    });

    await training.save();
    res.status(200).json({ message: "Training successfully added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

function toMinutes(req, res, next) {
  const { unit } = req.body;
  if (unit === "h") {
    req.body.duration *= 60;
    next();
  } else {
    next();
  }
}
module.exports = router;