const express = require("express");
const router = express.Router();

// TEMP TEST ROUTE
router.get("/", (req, res) => {
  res.send("Auth route working ✅");
});

module.exports = router;