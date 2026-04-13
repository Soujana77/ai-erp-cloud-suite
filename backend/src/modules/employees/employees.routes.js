const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth.middleware');
const roleMiddleware = require('../../middleware/role.middleware');
const employeeController = require('./employees.controller');

router.get('/', authMiddleware, employeeController.getAllEmployees);
router.post('/', authMiddleware, roleMiddleware([1]), employeeController.createEmployee);
router.put('/:id', authMiddleware, roleMiddleware([1]), employeeController.updateEmployee);
router.delete('/:id', authMiddleware, roleMiddleware([1]), employeeController.deleteEmployee);

module.exports = router;