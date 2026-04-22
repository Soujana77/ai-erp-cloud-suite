export default function OrgChart() {
  return (
    <div style={container}>
      <h2 style={title}>Organization Chart</h2>

      {/* CEO */}
      <div style={nodeRoot}>
        <div style={card}>👑 CEO - John Smith</div>
      </div>

      {/* Level 1 */}
      <div style={line} />

      <div style={level}>
        <div style={card}>👨‍💼 Manager - Sarah Lee</div>
      </div>

      {/* Level 2 */}
      <div style={line} />

      <div style={levelDeep}>
        <div style={card}>👨‍💻 Employee - Raj Kumar</div>
        <div style={card}>👩‍💻 Employee - Anjali Sharma</div>
      </div>
    </div>
  );
}

/* ========== STYLES ========== */

const container = {
  padding: "20px",
  fontFamily: "Arial",
};

const title = {
  marginBottom: "20px",
};

const nodeRoot = {
  display: "flex",
  justifyContent: "center",
};

const level = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const levelDeep = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const card = {
  background: "#ffffff",
  padding: "12px 20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid #eee",
  minWidth: "180px",
  textAlign: "center",
};

const line = {
  width: "2px",
  height: "25px",
  background: "#ccc",
  margin: "10px auto",
};