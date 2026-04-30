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

const getTransactionSummary = async () => {
  const result = await db.query(`
    SELECT
      COALESCE(SUM(CASE WHEN transaction_type = 'income' THEN amount ELSE 0 END), 0) AS income,
      COALESCE(SUM(CASE WHEN transaction_type = 'expense' THEN amount ELSE 0 END), 0) AS expense
    FROM transactions
  `);

  const summary = result.rows[0];

  return {
    income: Number(summary.income),
    expense: Number(summary.expense),
    balance: Number(summary.income) - Number(summary.expense),
  };
};

const getRevenueTrend = async () => {

  const result = await db.query(`

    SELECT
      TO_CHAR(created_at, 'Mon') AS month,

      SUM(amount)::INTEGER AS revenue

    FROM transactions

    WHERE transaction_type = 'income'

    GROUP BY month, DATE_PART('month', created_at)

    ORDER BY DATE_PART('month', created_at)

  `);

  return result.rows;
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getRecentTransactions,
  getTransactionSummary,
  getRevenueTrend
};

