const roleMiddleware = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      if (!req.user || req.user.role_id == null) {
        return res.status(403).json({
          success: false,
          message: "Access denied: role not found",
        });
      }

      const userRole = Number(req.user.role_id);

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = roleMiddleware;