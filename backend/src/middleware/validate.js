// middleware/validate.js

const validate = (fields) => {
  return (req, res, next) => {
    for (let field of fields) {
      if (!req.body[field] || !req.body[field].trim()) {
        const err = new Error(`${field} is required`);
        err.statusCode = 400;
        return next(err);
      }
    }
    next();
  };
};

module.exports = validate;