export default function OrgChart() {
  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Organization Chart</h3>
        <p style={{ color: "#6b7280" }}>
          Visualize reporting structure across leadership, managers, and employees.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div className="card" style={{ minWidth: "240px", textAlign: "center" }}>
          <h4>CEO</h4>
          <p style={{ color: "#6b7280" }}>PRASAD KVP</p>
        </div>

        <div style={{ width: "2px", height: "28px", background: "#cbd5e1" }} />

        <div className="card" style={{ minWidth: "240px", textAlign: "center" }}>
          <h4>Manager</h4>
          <p style={{ color: "#6b7280" }}>SOUJANYA</p>
        </div>

        <div style={{ width: "2px", height: "28px", background: "#cbd5e1" }} />

        <div className="card-grid two" style={{ width: "100%", maxWidth: "620px" }}>
          <div className="card" style={{ textAlign: "center" }}>
            <h4>Employee</h4>
            <p style={{ color: "#6b7280" }}>Raj Kumar</p>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <h4>Employee</h4>
            <p style={{ color: "#6b7280" }}>Anjali Sharma</p>
          </div>
        </div>
      </div>
    </div>
  );
}