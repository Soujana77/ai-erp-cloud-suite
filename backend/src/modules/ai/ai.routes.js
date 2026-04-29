const express = require("express");

const router = express.Router();

const {
  getPrediction,
} = require("./ai.controller");

router.get("/predict", getPrediction);

module.exports = router;