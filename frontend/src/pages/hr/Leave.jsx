export default function Leave() {
  const leaves = [
    { id: 1, name: "John", type: "Sick Leave", status: "Approved" },
    { id: 2, name: "Sarah", type: "Casual Leave", status: "Pending" },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Leave Management</h3>
        <p style={{ color: "#6b7280" }}>
          Review leave requests, leave types, and approval status.
        </p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr key={l.id}>
                <td>{l.name}</td>
                <td>{l.type}</td>
                <td>
                  <span className={`badge ${l.status === "Approved" ? "success" : "warning"}`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}