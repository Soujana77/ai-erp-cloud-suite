import MainLayout from "../../layout/MainLayout";

export default function Inventory() {
  const items = [
    { id: 1, name: "Laptop", stock: 25, status: "Available" },
    { id: 2, name: "Monitor", stock: 8, status: "Low Stock" },
    { id: 3, name: "Keyboard", stock: 40, status: "Available" },
  ];

  return (
    <MainLayout>
      <h2>Inventory</h2>
      <p style={{ color: "#666" }}>Track stock and resources</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Item</th>
            <th style={th}>Stock</th>
            <th style={th}>Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={td}>{item.id}</td>
              <td style={td}>{item.name}</td>
              <td style={td}>{item.stock}</td>
              <td style={td}>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

const tableStyle = {
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse",
  background: "white",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const th = {
  textAlign: "left",
  padding: "12px",
  background: "#f3f4f6",
};

const td = {
  padding: "12px",
  borderTop: "1px solid #eee",
};