const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const employeeRoutes = require("./modules/employees/employees.routes");
const financeRoutes = require("./modules/finance/finance.routes");
const inventoryRoutes = require("./modules/inventory/inventory.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
require("./config/db");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Smart ERP Backend Running 🚀");
});

// PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});