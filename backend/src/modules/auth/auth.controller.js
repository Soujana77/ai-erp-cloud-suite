const authService = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../../utils/response");

// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ✅ FIXED VALIDATION
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      const err = new Error("All fields required");
      err.statusCode = 400;
      return next(err);
    }

    const user = await authService.registerUser(name, email, password);

    return successResponse(res, "User registered successfully", user);

  } catch (error) {
    return next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ✅ ADDED VALIDATION
    if (!email?.trim() || !password?.trim()) {
      const err = new Error("All fields required");
      err.statusCode = 400;
      return next(err);
    }

    const user = await authService.getUserByEmail(email);

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err = new Error("Invalid password");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
        tenant_id: user.tenant_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return successResponse(res, "Login successful", { token });

  } catch (error) {
    return next(error);
  }
};

// EXPORT
module.exports = {
  register,
  login
};