const express = require("express");
const router = express.Router();

const { register, login, refresh } = require("./auth.controller");
const validate = require("../../middleware/validate");

router.post("/register", validate(["name", "email", "password"]), register);
router.post("/login", validate(["email", "password"]), login);

// 🔥 THIS LINE WAS MISSING OR WRONG
router.post("/refresh", refresh);

module.exports = router;