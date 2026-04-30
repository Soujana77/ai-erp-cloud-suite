const pool = require("../../config/db");
const bcrypt = require("bcryptjs");

// REGISTER
const registerUser = async (
  name,
  email,
  password,
  role_id,
  tenant_id
) => {

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const result = await pool.query(

    `INSERT INTO users
    (
      tenant_id,
      role_id,
      name,
      email,
      password
    )

    VALUES ($1, $2, $3, $4, $5)

    RETURNING
    id,
    tenant_id,
    role_id,
    name,
    email`,

    [
      tenant_id,
      role_id,
      name,
      email,
      hashedPassword
    ]
  );

  return result.rows[0];
};

// GET USER
const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

module.exports = {
  registerUser,
  getUserByEmail
};