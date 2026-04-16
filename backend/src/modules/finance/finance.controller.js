const financeService = require('./finance.service');

const createTransaction = async (req, res) => {
  try {
    const transaction = await financeService.createTransaction(req.body);
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
      error: error.message,
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await financeService.getAllTransactions();
    res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      error: error.message,
    });
  }
};

const getFinanceSummary = async (req, res) => {
  try {
    const summary = await financeService.getFinanceSummary();
    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch finance summary',
      error: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getFinanceSummary,
};