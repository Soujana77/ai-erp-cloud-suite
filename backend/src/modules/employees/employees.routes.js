const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/auth.middleware');
const roleMiddleware = require('../../middleware/role.middleware');
const employeeController = require('./employees.controller');

router.get('/', authMiddleware, employeeController.getAllEmployees);
router.post('/', authMiddleware, roleMiddleware(['admin']), employeeController.createEmployee);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), employeeController.updateEmployee);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), employeeController.deleteEmployee);

module.exports = router;