const financeService = require('./finance.service');

const validateTransactionInput = (body) => {
  const { title, amount, type } = body;

  if (!title || amount === undefined || !type) {
    return 'Title, amount and type are required';
  }

  if (String(title).trim() === '') {
    return 'Title cannot be empty';
  }

  if (isNaN(amount) || Number(amount) < 0) {
    return 'Amount must be a valid non-negative number';
  }

  if (!['income', 'expense'].includes(type)) {
    return "Type must be 'income' or 'expense'";
  }

  return null;
};

const createTransaction = async (req, res) => {
  try {
    const validationError = validateTransactionInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
        data: null,
      });
    }

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
      data: null,
      error: error.message,
    });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await financeService.getAllTransactions();

    res.status(200).json({
      success: true,
      message: 'Transactions fetched successfully',
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
      data: null,
      error: error.message,
    });
  }
};

const getTransactionSummary = async (req, res) => {
  try {
    const summary = await financeService.getTransactionSummary();

    res.status(200).json({
      success: true,
      message: 'Transaction summary fetched successfully',
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction summary',
      data: null,
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
<<<<<<< HEAD
  getFinanceSummary,
=======
  getTransactionSummary,
>>>>>>> 9311bf2 (implemented advanced CRUD modules properly in backend)
};