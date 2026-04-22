const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refresh,
  logout
} = require("./auth.controller");

const validate = require("../../middleware/validate");

// REGISTER
router.post("/register", validate(["name", "email", "password"]), register);

// LOGIN
router.post("/login", validate(["email", "password"]), login);

// REFRESH TOKEN
router.post("/refresh", refresh);

// LOGOUT
router.post("/logout", logout);

module.exports = router;