const db = require('../../config/db');

const createEmployee = async (data) => {
  const { name, email, department, salary } = data;

  const query = `
    INSERT INTO employees (name, email, department, salary)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [name, email, department, salary];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getAllEmployees = async () => {
  const result = await db.query('SELECT * FROM employees ORDER BY id ASC');
  return result.rows;
};

const updateEmployee = async (id, data) => {
  const { name, email, department, salary } = data;

  const query = `
    UPDATE employees
    SET name = $1, email = $2, department = $3, salary = $4
    WHERE id = $5
    RETURNING *;
  `;

  const values = [name, email, department, salary, id];
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