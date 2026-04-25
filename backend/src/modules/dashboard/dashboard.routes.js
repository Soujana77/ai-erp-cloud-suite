const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const { getDashboard } = require("./dashboard.controller");

// allow admin only
router.get("/", authMiddleware, roleMiddleware([1]), getDashboard);

module.exports = router;