export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "New employee added",
      message: "A new employee record was created successfully in the HR module.",
      time: "2 min ago",
      type: "success",
    },
    {
      id: 2,
      title: "Low stock alert",
      message: "Some inventory items are running low and need replenishment.",
      time: "10 min ago",
      type: "warning",
    },
    {
      id: 3,
      title: "Finance report ready",
      message: "Your latest finance summary is available for review.",
      time: "30 min ago",
      type: "success",
    },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Notification Center</h3>
        <p style={{ color: "#6b7280" }}>
          Track recent ERP activity, alerts, and system updates in one place.
        </p>
      </div>

      <div className="card-grid">
        {notifications.map((item) => (
          <div key={item.id} className="card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <div>
                <h4 style={{ marginBottom: "8px" }}>{item.title}</h4>
                <p style={{ color: "#6b7280", lineHeight: "1.6" }}>{item.message}</p>
              </div>

              <span
                className={`badge ${
                  item.type === "warning" ? "warning" : "success"
                }`}
              >
                {item.type}
              </span>
            </div>

            <p style={{ marginTop: "14px", color: "#94a3b8", fontSize: "0.9rem" }}>
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}