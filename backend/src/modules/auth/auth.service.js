const pool = require("../../config/db");
const bcrypt = require("bcrypt");

const registerUser = async (name, email, password) => {
  // 1. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 2. Insert into DB
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );

  return result.rows[0];
};

module.exports = { registerUser };