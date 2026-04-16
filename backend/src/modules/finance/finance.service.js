const db = require('../../config/db');

const createTransaction = async (data) => {
  const { title, amount, type } = data;

  const query = `
    INSERT INTO transactions (title, amount, type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [title, amount, type];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getAllTransactions = async () => {
  const result = await db.query('SELECT * FROM transactions ORDER BY id DESC');
  return result.rows;
};

const getRecentTransactions = async (limit = 5) => {
  const result = await db.query(
    'SELECT * FROM transactions ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows;
};

const getFinanceSummary = async () => {
  const incomeResult = await db.query(
    "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE transaction_type='income'"
  );
  const expenseResult = await db.query(
    "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE transaction_type='expense'"
  );

  const totalIncome = parseFloat(incomeResult.rows[0].coalesce);
  const totalExpense = parseFloat(expenseResult.rows[0].coalesce);

  return {
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
  };
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getRecentTransactions,
  getFinanceSummary,
};