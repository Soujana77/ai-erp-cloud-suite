const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      console.log("User role:", req.user); // 👈 ADD THIS

      const userRole = req.user.role_id;

      if (!allowedRoles.includes(userRole)) {
        const err = new Error("Access denied: insufficient permissions");
        err.statusCode = 403;
        return next(err);
      }

      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = roleMiddleware;