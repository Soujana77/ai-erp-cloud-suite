export default function BIDashboard() {
  return (
    <div>
      

      <div style={grid}>
        <div style={card}>Sales Trend</div>
        <div style={card}>Revenue Pie</div>
        <div style={card}>Inventory Heatmap</div>
        <div style={card}>Profit Funnel</div>
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "15px",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "10px",
};