const db = require('../../config/db');

// CREATE
const createTransaction = async (data) => {
  const { title, amount, type } = data;

  const query = `
    INSERT INTO transactions (title, amount, type)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(query, [title, amount, type]);
  return result.rows[0];
};

// GET ALL
const getAllTransactions = async () => {
  const result = await db.query(
    'SELECT * FROM transactions ORDER BY id DESC'
  );
  return result.rows;
};

// RECENT
const getRecentTransactions = async (limit = 5) => {
  const result = await db.query(
    'SELECT * FROM transactions ORDER BY created_at DESC LIMIT $1',
    [limit]
  );
  return result.rows;
};

// SUMMARY (USED BY DASHBOARD)
const getFinanceSummary = async () => {
  const result = await db.query(`
    SELECT
      COALESCE(SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE WHEN transaction_type = 'expense' THEN amount ELSE 0 END), 0) AS expense
    FROM transactions
  `);

  const summary = result.rows[0];

  return {
    totalRevenue: Number(summary.income),
    totalExpenses: Number(summary.expense),
    balance: Number(summary.income) - Number(summary.expense),
  };
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getRecentTransactions,
  getFinanceSummary,
};