const express = require('express');
const router = express.Router();
const DayPlan = require('../models/DayPlan');

router.post('/', async (req, res) => {
  try {
    const { userId, date, totalCalories, macros, recipes, trainings } = req.body;

    const plan = new DayPlan({
      userId,
      date,
      totalCalories,
      macros,
      recipes,
      trainings
    });

    await plan.save();
    res.status(200).json({ message: "Plan successfully added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.post('/update', async (req, res) => {
  try {
    const { _id, date, totalCalories, macros, recipes, trainings } = req.body;

    await DayPlan.updateOne({ _id }, { $set: { date, totalCalories, macros, recipes, trainings } });

    await plan.save();
    res.status(200).json({ message: "Plan successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const { userId } = req.body;

    const plans = await DayPlan.find({ userId });

    res.status(200).json({ plans });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;