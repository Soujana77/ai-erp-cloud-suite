const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const employeeRoutes = require("./modules/employees/employees.routes");
const financeRoutes = require("./modules/finance/finance.routes");
const inventoryRoutes = require("./modules/inventory/inventory.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");

const app = express();
app.set("trust proxy", 1);

// 🔒 Security headers
app.use(helmet());

// 🌐 Middleware
app.use(cors());
app.use(express.json());

// ⏱️ Rate limiting helper — creates limiter with standardized error response
const createRateLimiter = (options) => {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    keyGenerator: options.keyGenerator || ((req) => req.ip),
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      return res.status(429).json({
        success: false,
        message: options.message || "Too many requests, please try again later"
      });
    }
  });
};

/* =========================
   🔥 TEST RATE LIMIT ROUTE
   ========================= */
// Strict limiter for testing: 2 requests per 10 seconds
const testLimiter = createRateLimiter({
  windowMs: 10 * 1000,
  max: 2,
  message: "Too many requests"
});

app.get("/test-limit", testLimiter, (req, res) => {
  res.json({
    success: true,
    message: "Request success",
    data: { timestamp: new Date().toISOString() }
  });
});

/* =========================
   🚫 GLOBAL RATE LIMIT
   ========================= */
// Applied to all /api routes: 100 requests per 10 seconds
const apiLimiter = createRateLimiter({
  windowMs: 10 * 1000,
  max: 100,
  keyGenerator: (req) => req.ip,
  message: "Too many requests, please try again later"
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
    message: "Smart ERP Backend Running"
  });
});

/* =========================
   ❌ ERROR HANDLER
   ========================= */
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;
