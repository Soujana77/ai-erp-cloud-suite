export default function Forecasting() {
  return (
    <div>
      

      <div style={card}>
        📈 Predicted Demand: 1,240 units
      </div>

      <div style={card}>
        🔁 Model: Prophet v2.1
      </div>

      <div style={card}>
        📊 Confidence: 92%
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