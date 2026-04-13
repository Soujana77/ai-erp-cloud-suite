const authService = require("./auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await authService.registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN ✅ ADD THIS
const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    const user = await authService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // TEMP: plain password check
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
        tenant_id: user.tenant_id
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ EXPORT BOTH
module.exports = {
  register,
  login
};