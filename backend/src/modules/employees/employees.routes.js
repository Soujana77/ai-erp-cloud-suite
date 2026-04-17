const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth.middleware');
const roleMiddleware = require('../../middleware/role.middleware');
const employeeController = require('./employees.controller');

// READ → all authenticated users
router.get('/', authMiddleware, employeeController.getAllEmployees);

// CREATE → admin only
router.post('/', authMiddleware, roleMiddleware([1, 2]), employeeController.createEmployee);

// UPDATE → admin only
router.put('/:id', authMiddleware, roleMiddleware([1, 2]), employeeController.updateEmployee);

// DELETE → admin only
router.delete('/:id', authMiddleware, roleMiddleware([1]), employeeController.deleteEmployee);

module.exports = router;