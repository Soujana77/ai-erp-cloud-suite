const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");

// ✅ FIXED import for new express-rate-limit version
const rateLimit = require("express-rate-limit").rateLimit;
const { ipKeyGenerator } = require("express-rate-limit");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const employeeRoutes = require("./modules/employees/employees.routes");
const financeRoutes = require("./modules/finance/finance.routes");
const inventoryRoutes = require("./modules/inventory/inventory.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");

const app = express();

// Important for proxy setups (prevents IP issues)
app.set("trust proxy", 1);

// 🔒 Security headers
app.use(helmet());

// 🌐 Middleware
app.use(cors());
app.use(express.json());

/* =========================
   ⏱️ RATE LIMIT HELPER
   ========================= */
const createRateLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    standardHeaders: true,
    legacyHeaders: false,

    // ✅ FIX: safe IPv6-compatible key generator
    keyGenerator: ipKeyGenerator(),

    handler: (req, res) => {
      return res.status(429).json({
        success: false,
        message: options.message || "Too many requests, please try again later",
      });
    },
  });
};

/* =========================
   🔥 TEST RATE LIMIT ROUTE
   ========================= */
const testLimiter = createRateLimiter({
  windowMs: 10 * 1000,
  max: 2,
  message: "Too many requests",
});

app.get("/test-limit", testLimiter, (req, res) => {
  res.json({
    success: true,
    message: "Request success",
    data: { timestamp: new Date().toISOString() },
  });
});

/* =========================
   🚫 GLOBAL RATE LIMIT
   ========================= */
const apiLimiter = createRateLimiter({
  windowMs: 10 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});

app.use("/api", apiLimiter);

/* =========================
   📌 ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/transactions", financeRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

/* =========================
   🧪 ROOT TEST
   ========================= */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart ERP Backend Running",
  });
});

/* =========================
   ❌ ERROR HANDLER
   ========================= */
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;