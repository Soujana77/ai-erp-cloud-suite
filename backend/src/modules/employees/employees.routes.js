const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth.middleware");
const roleMiddleware = require("../../middleware/role.middleware");
const {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("./employees.controller");

router.get("/", authMiddleware, getAllEmployees);
router.post("/", authMiddleware, roleMiddleware([1]), createEmployee);
router.put("/:id", authMiddleware, roleMiddleware([1]), updateEmployee);
router.delete("/:id", authMiddleware, roleMiddleware([1]), deleteEmployee);

module.exports = router;