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

module.exports = {
  createTransaction,
  getAllTransactions,
};