export default function Security() {
  const items = [
    {
      title: "XSS Protection Enabled",
      description: "Frontend sanitization and secure rendering are active.",
      status: "Protected",
    },
    {
      title: "Rate Limiting Active",
      description: "API requests are monitored to prevent abuse and overload.",
      status: "Active",
    },
    {
      title: "JWT Authentication Active",
      description: "Secure token-based login is enabled for protected routes.",
      status: "Verified",
    },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Security Overview</h3>
        <p style={{ color: "#6b7280" }}>
          Monitor protection layers and authentication health across the ERP platform.
        </p>
      </div>

      <div className="card-grid three">
        {items.map((item, index) => (
          <div key={index} className="card">
            <h4 style={{ marginBottom: "10px" }}>{item.title}</h4>
            <p style={{ color: "#6b7280", marginBottom: "14px", lineHeight: "1.6" }}>
              {item.description}
            </p>
            <span className="badge success">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}