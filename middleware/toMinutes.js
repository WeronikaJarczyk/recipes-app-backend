function toMinutes(req, res, next) {
  const { unit } = req.body;
  if (unit === "h") {
    req.body.time *= 60;
    next();
  } else {
    next();
  }
}

exports.toMinutes = toMinutes;