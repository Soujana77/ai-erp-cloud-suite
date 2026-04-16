const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role_id; // from JWT

      if (!allowedRoles.includes(userRole)) {
        const err = new Error("Access denied");
        err.statusCode = 403;
        return next(err);
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = authorizeRoles;