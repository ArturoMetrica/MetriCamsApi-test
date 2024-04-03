module.exports = (res, statusCode, status, message, data) => {
  res.status(statusCode).json({
    status,
    message,
    data
  });
}