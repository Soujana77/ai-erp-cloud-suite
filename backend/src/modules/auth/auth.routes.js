const express = require("express");
const router = express.Router();

const { register, login, refresh, logout } = require("./auth.controller");
const validate = require("../../middleware/validate");

router.post("/register", validate(["name", "email", "password"]), register);
router.post("/login", validate(["email", "password"]), login);
router.post("/refresh", refresh);

// 🔥 THIS LINE WAS MISSING
router.post("/logout", logout);

module.exports = router;