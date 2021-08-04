const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserInfo = require('../models/UserInfo');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const { login, password, email, friends } = req.body;
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

router.post('/info', async (req, res) => {

  const { _id, weight, age, height, friends } = req.body;
  try {
    const user = await User.findOne({ _id });

    if (user) {
      const userInfo = new UserInfo({
        _id,
        weight,
        age,
        height,
        BMI: 20,
        calorieNeeds: 2500,
        friends
      });
      await userInfo.save();
      res.status(200).json({ message: "Informations were successfully saved" });
    } else throw Error('User does not exist');
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;