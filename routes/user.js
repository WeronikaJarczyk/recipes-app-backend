const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const bcrypt = require('bcrypt');
const { calculateCalories } = require('../middleware/calculateCalories');
const { toMinutes } = require('../middleware/toMinutes');
// const jwt = require('jsonwebtoken');

// register/add new user
router.post('/', async (req, res) => {
  const { login, password, email } = req.body;
  try {
    const ifUser = await User.findOne({ login });
    if (ifUser) throw Error('User already exists');
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      login,
      password: hashedPassword,
      email
    });
    await user.save();
    res.status(200).json({ message: "You have successfully registered" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// add info about existing user
router.post('/info', toMinutes, calculateCalories, async (req, res) => {
  // console.log(req.body);
  const { _id } = req.body;
  const { sex, weight, age, height, friends } = req.body.data;
  const calorieNeeds = req.calorieNeeds;
  const water = req.water;
  const levelOfActivity = req.levelOfActivity;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      const userInfo = new UserInfo({
        _id,
        sex,
        weight,
        age,
        height,
        calorieNeeds,
        water,
        levelOfActivity,
        friends
      });
      await userInfo.save();
      res.status(200).json({ message: "Informations were successfully saved", calorieNeeds });
    } else throw Error('User does not exist');
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// update info about user
router.post('/info/update', calculateCalories, async (req, res) => {

  const { _id, sex, weight, age, height, levelOfActivity, friends } = req.body;
  const calorieNeeds = req.calorieNeeds;
  const water = req.water;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      await UserInfo.updateOne({ _id }, { $set: { sex, weight, age, height, levelOfActivity, calorieNeeds, water, friends } });

      res.status(200).json({ message: "Informations were successfully updated" });
    } else throw Error('User does not exist');
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// update info about calories
router.post('/info/calories', async (req, res) => {
  console.log(req.body);
  const { _id, calories } = req.body;

  try {
    const user = await User.findOne({ _id });

    if (user) {
      await UserInfo.updateOne({ _id }, { $set: { calorieNeeds: calories } });

      res.status(200).json({ message: "Informations were successfully updated" });
    } else throw Error('User does not exist');
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// get informations about user
router.get('/info/get', async function (req, res) {
  try {
    const { _id } = req.body;
    const userInfo = await UserInfo.findOne({ _id });

    if (user) {
      res.status(200).json({ userInfo });
    } else throw Error('User does not exist');
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
})

module.exports = router;