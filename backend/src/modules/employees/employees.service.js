const db = require("../../config/db");


// CREATE EMPLOYEE
const createEmployee = async (data) => {

  const {
    user_id,
    department,
    salary,
  } = data;

  const query = `
  
    INSERT INTO employees
    (
      user_id,
      department,
      salary
    )

    VALUES ($1, $2, $3)

    RETURNING *;

  `;

  const result = await db.query(
    query,
    [
      user_id,
      department,
      salary,
    ]
  );

  return result.rows[0];
};


// GET ALL EMPLOYEES
const getAllEmployees = async () => {

  const query = `

    SELECT

      employees.id,

      users.name,

      roles.role_name AS role,

      employees.department,

      employees.salary

    FROM employees

    JOIN users
      ON employees.user_id = users.id

    JOIN roles
      ON users.role_id = roles.id

    ORDER BY employees.id ASC;

  `;

  const result = await db.query(query);

  return result.rows;
};


// UPDATE EMPLOYEE
const updateEmployee = async (
  id,
  data
) => {

  const {
    department,
    salary,
  } = data;

  const query = `

    UPDATE employees

    SET
      department = $1,
      salary = $2

    WHERE id = $3

    RETURNING *;

  `;

  const result = await db.query(
    query,
    [
      department,
      salary,
      id,
    ]
  );

  return result.rows[0];
};


// DELETE EMPLOYEE
const deleteEmployee = async (id) => {

  const result = await db.query(

    `
      DELETE FROM employees

      WHERE id = $1

      RETURNING *;
    `,

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