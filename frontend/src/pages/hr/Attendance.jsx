export default function Attendance() {
  const data = [
    { id: 1, name: "John", checkIn: "9:00 AM", checkOut: "6:00 PM" },
    { id: 2, name: "Sarah", checkIn: "9:15 AM", checkOut: "6:10 PM" },
  ];

  return (
    <div>
      <h2>Attendance</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.checkIn}</td>
              <td>{a.checkOut}</td>
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