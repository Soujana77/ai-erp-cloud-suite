const validate = (requiredFields = []) => {
  return (req, res, next) => {
    try {
      const data = req.body;

      // 🔹 Check required fields
      for (let field of requiredFields) {
        if (!data[field] || data[field].toString().trim() === "") {
          const err = new Error(`${field} is required`);
          err.statusCode = 400;
          return next(err);
        }
      }

      // 🔹 Email validation
      if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          const err = new Error("Invalid email format");
          err.statusCode = 400;
          return next(err);
        }
      }

      // 🔹 Number validation (example fields)
      if (data.quantity && isNaN(data.quantity)) {
        const err = new Error("Quantity must be a number");
        err.statusCode = 400;
        return next(err);
      }

      if (data.price && isNaN(data.price)) {
        const err = new Error("Price must be a number");
        err.statusCode = 400;
        return next(err);
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = validate;