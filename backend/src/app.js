const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const employeeRoutes = require("./modules/employees/employees.routes");
const financeRoutes = require("./modules/finance/finance.routes");
const inventoryRoutes = require("./modules/inventory/inventory.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/transactions", financeRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart ERP Backend Running",
  });
});

// Error middleware (must be last)
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;