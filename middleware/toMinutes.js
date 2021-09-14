function toMinutes(req, res, next) {

  const { unit } = req.body.data;

  if (unit === "hour") {
    req.body.data.time *= 60;
    next();
  } else {
    next();
  }
}

exports.toMinutes = toMinutes;