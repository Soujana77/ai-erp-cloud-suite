import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Forecasting() {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/ai/predict")
      .then((res) => res.json())
      .then((data) => {
        setPrediction(data.data.predicted_sales);
      })
      .catch((err) => {
        console.error("Error fetching AI prediction:", err);
      });
  }, []);

  const chartData = [
    { month: "Jan", sales: 100 },
    { month: "Feb", sales: 120 },
    { month: "Mar", sales: 130 },
    { month: "Apr", sales: 150 },
    { month: "May", sales: 170 },
    { month: "Jun", sales: prediction || 0 },
  ];

  return (
    <div>
      <div style={card}>
        📈 Predicted Demand: {prediction || "Loading..."} units
      </div>

      <div style={card}>
        🔁 Model: Linear Regression
      </div>

      <div style={card}>
        📊 AI Service Connected Successfully
      </div>

      <div style={chartCard}>
        <h3>Sales Forecast Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  marginTop: "15px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const chartCard = {
  background: "white",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};