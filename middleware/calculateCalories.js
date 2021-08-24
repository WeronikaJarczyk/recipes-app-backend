function calculateCalories(req, res, next) {

  const { sex, weight, age, height, timesPerWeek, tempo, trainingType, time, unit } = req.body.data;

  const sexFactor = (sex === "female") ? -161 : 5;
  // Basal Metabolic Rate
  const BMR = (9.99 * weight) + (6.25 * height) - (4.92 * age) + sexFactor;
  // default: sitting job
  const NEAT = 300;
  const training = (trainingType === "Strength") ? strengthTraining(tempo) : aerobicTraining(tempo);
  //*1.1 -> + 10% for thermal effect 
  const totalCalories = Math.round((BMR + NEAT + (training * time * timesPerWeek / 7)) * 1.1);

  req.calorieNeeds = totalCalories;
  req.water = waterNeeds(weight, time, timesPerWeek);
  req.levelOfActivity = { timesPerWeek, tempo, trainingType, time, unit };

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

function waterNeeds(weight, time, timesPerWeek) {

  const base = weight * 0.03;
  const exerciseTime = time * timesPerWeek / 7;

  return Math.round((base + ((exerciseTime / 30) * 0.35)) * 100) / 100;
}

exports.calculateCalories = calculateCalories;