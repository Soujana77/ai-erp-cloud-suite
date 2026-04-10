const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
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

module.exports = { register };