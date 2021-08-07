const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const { toMinutes } = require('../middleware/toMinutes');

// add recipe
router.post('/', toMinutes, async (req, res) => {
  try {
    const { userId, name, calories, macros,
      makingTime, ingredients, description } = req.body;

    const recipe = new Recipe({
      userId,
      name,
      calories,
      macros,
      makingTime,
      ingredients,
      description
    });

    await recipe.save();
    res.status(200).json({ message: "Recipe successfully added" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }

});

// get recipes
router.get('/get', async (req, res) => {
  try {
    const { userId } = req.body;
    const recipes = await Recipe.find({ userId });
    console.log(recipes);
  } catch {

  }
});

module.exports = router;
