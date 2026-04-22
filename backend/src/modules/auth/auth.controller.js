const authService = require("./auth.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../../utils/response");
const {
  addRefreshToken,
  isValidRefreshToken,
  removeRefreshToken
} = require("../../utils/tokenStore");

// REGISTER
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new Error("All fields required");
      err.statusCode = 400;
      return next(err);
    }

    const user = await authService.registerUser(name, email, password);

    return successResponse(res, "User registered successfully", user);
  } catch (err) {
    return next(err);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
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

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    addRefreshToken(refreshToken);

    return successResponse(res, "Login successful", {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return next(err);
  }
};

// REFRESH
const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const err = new Error("Refresh token required");
      err.statusCode = 400;
      return next(err);
    }

    if (!isValidRefreshToken(refreshToken)) {
      const err = new Error("Invalid refresh token");
      err.statusCode = 403;
      return next(err);
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return successResponse(res, "Token refreshed", { accessToken });
  } catch (err) {
    return next(err);
  }
};

// LOGOUT
const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const err = new Error("Refresh token required");
      err.statusCode = 400;
      return next(err);
    }

    removeRefreshToken(refreshToken);

    return successResponse(res, "Logged out successfully");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};