function toMinutes(req, res, next) {

  const { unit } = req.body.data;
  console.log(unit);
  if (unit === "hour") {
    req.body.data.time *= 60;
    next();
  } else {
    next();
  }
}

exports.toMinutes = toMinutes;