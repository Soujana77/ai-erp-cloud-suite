// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err); // full error log

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // 🔐 JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // 🧾 Validation Errors (future use)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
  }

  // 🗄️ PostgreSQL Errors (basic handling)
  if (err.code) {
    // Example: duplicate email
    if (err.code === "23505") {
      statusCode = 400;
      message = "Duplicate entry (likely email already exists)";
    }
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: err.message,
  });
};

module.exports = errorHandler;