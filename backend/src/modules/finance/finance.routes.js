const express = require('express');
const router = express.Router();
const financeController = require('./finance.controller');

router.post('/', financeController.createTransaction);
router.get('/', financeController.getAllTransactions);

module.exports = router;