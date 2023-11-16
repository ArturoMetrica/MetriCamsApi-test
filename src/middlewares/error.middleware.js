const handleNotFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const handleError = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: false,
    message: errorMessage,
    data: null
  });
};

module.exports = {
  handleNotFound,
  handleError
};