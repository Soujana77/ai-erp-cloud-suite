export default function Navbar() {
  return (
    <div
      style={{
        height: "60px",
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h3 style={{ margin: 0 }}>Smart ERP System</h3>

      <div style={{ fontSize: "14px", color: "#555" }}>
        Admin Panel
      </div>
    </div>
  );
}