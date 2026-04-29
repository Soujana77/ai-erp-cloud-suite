const axios = require("axios");

const getPrediction = async (req, res) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5001/predict"
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error("AI Service Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to connect to AI service",
    });
  }
};

module.exports = {
  getPrediction,
};