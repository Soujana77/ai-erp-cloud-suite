export default function Attendance() {
  const data = [
    { id: 1, name: "John", checkIn: "9:00 AM", checkOut: "6:00 PM", status: "Present" },
    { id: 2, name: "Sarah", checkIn: "9:15 AM", checkOut: "6:10 PM", status: "Late" },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Attendance Records</h3>
        <p style={{ color: "#6b7280" }}>
          View employee check-in and check-out activity for the day.
        </p>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.checkIn}</td>
                <td>{a.checkOut}</td>
                <td>
                  <span className={`badge ${a.status === "Late" ? "warning" : "success"}`}>
                    {a.status}
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