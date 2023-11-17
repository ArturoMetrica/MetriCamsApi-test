module.exports = (req, res, next) => {
  if (req.query.sessionid) {
    return res.status(200).json({
      status: false,
      code: 400,
      message: "SessionId must be in headers",
    });
  }
  if (req.get("sessionid")) {
    req.query.sessionid = req.get("sessionid");
  }
  next();
};

/********************* Propiedad de Métrica Móvil SA de CV **************************/