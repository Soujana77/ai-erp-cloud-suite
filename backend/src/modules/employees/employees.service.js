const db = require("../../config/db");

const createEmployee = async (data) => {
  const { name, role, department } = data;

  const query = `
    INSERT INTO employees (name, role, department)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(query, [name, role, department]);
  return result.rows[0];
};

const getAllEmployees = async () => {
  const result = await db.query("SELECT * FROM employees ORDER BY id ASC");
  return result.rows;
};

const updateEmployee = async (id, data) => {
  const { name, role, department } = data;

  const query = `
    UPDATE employees
    SET name = $1, role = $2, department = $3
    WHERE id = $4
    RETURNING *;
  `;

  const result = await db.query(query, [name, role, department, id]);
  return result.rows[0];
};

const deleteEmployee = async (id) => {
  const result = await db.query(
    "DELETE FROM employees WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
