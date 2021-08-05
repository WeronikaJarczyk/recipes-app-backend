function calculateCalories(req, res, next) {
  const { sex, weight, age, height, levelOfActivity } = req.body;

  const { timesPerWeek, tempo, trainingType, time } = levelOfActivity;

  const sexFactor = (sex === "female") ? -161 : 5;
  // Basal Metabolic Rate
  const BMR = (9.99 * weight) + (6.25 * height) - (4.92 * age) + sexFactor;
  // default: sitting job
  const NEAT = 300;
  const training = (trainingType === "Strength") ? strengthTraining(tempo) : aerobicTraining(tempo);
  //*1.1 -> + 10% for thermal effect 
  const totalCalories = Math.round((BMR + NEAT + (training * time * timesPerWeek / 7)) * 1.1);

  req.calorieNeeds = totalCalories;
  next();
}

function strengthTraining(tempo) {
  // tempo: No exercise, Light, Moderate, Intense
  switch (tempo) {
    case "Light":
      return 8;
    case "Moderate":
      return 10;
    case "Intense":
      return 12;
    default:
      return 0;
  }
}

function aerobicTraining(tempo) {
  // tempo: No exercise, Light, Moderate, Intense
  switch (tempo) {
    case "Light":
      return 4;
    case "Moderate":
      return 8;
    case "Intense":
      return 12;
    default:
      return 0;
  }
}

exports.calculateCalories = calculateCalories;