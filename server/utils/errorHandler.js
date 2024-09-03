const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Server error';
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Invalid input data';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Resource not found';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate key error';
  }
  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).json({
      message,
      stack: err.stack
    });
  }
  res.status(statusCode).json({ message });
};

module.exports = errorHandler;
