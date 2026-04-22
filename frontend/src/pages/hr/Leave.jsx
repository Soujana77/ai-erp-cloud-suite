export default function Leave() {
  const leaves = [
    { id: 1, name: "John", type: "Sick Leave", status: "Approved" },
    { id: 2, name: "Sarah", type: "Casual Leave", status: "Pending" },
  ];

  return (
    <div>
      <h2>Leave Management</h2>

      <table style={tableStyle}>
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
              <td>{l.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: "100%",
  marginTop: "20px",
  background: "white",
  borderCollapse: "collapse",
};