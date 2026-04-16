const express = require('express');
const router = express.Router();
const financeController = require('./finance.controller');

router.post('/', financeController.createTransaction);
router.get('/summary', financeController.getTransactionSummary);
router.get('/', financeController.getAllTransactions);
router.get('/summary', financeController.getFinanceSummary);

module.exports = router;