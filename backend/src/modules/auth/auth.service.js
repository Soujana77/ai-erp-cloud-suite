const pool = require("../../config/db");
const bcrypt = require("bcrypt");

// REGISTER
const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (tenant_id, role_id, name, email, password)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email`,
    [1, 3, name, email, hashedPassword]
  );

  return result.rows[0];
};

// 🔥 ADD THIS FUNCTION
const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

// ✅ EXPORT BOTH FUNCTIONS
module.exports = {
  registerUser,
  getUserByEmail
};