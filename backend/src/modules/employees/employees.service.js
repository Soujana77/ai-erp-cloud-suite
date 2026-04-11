const db = require('../../config/db');

const createEmployee = async (data) => {
  const { user_id, department, salary } = data;

  const query = `
    INSERT INTO employees (user_id, department, salary)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [user_id, department, salary];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getAllEmployees = async () => {
  const result = await db.query('SELECT * FROM employees ORDER BY id ASC');
  return result.rows;
};

const updateEmployee = async (id, data) => {
  const { user_id, department, salary } = data;

  const query = `
    UPDATE employees
    SET user_id = $1, department = $2, salary = $3
    WHERE id = $4
    RETURNING *;
  `;

  const values = [user_id, department, salary, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

const deleteEmployee = async (id) => {
  const query = `DELETE FROM employees WHERE id = $1 RETURNING *;`;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};