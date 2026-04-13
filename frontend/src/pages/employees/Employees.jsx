import MainLayout from "../../layout/MainLayout";

export default function Employees() {
  const employees = [
    { id: 1, name: "John Doe", role: "Manager", dept: "Sales" },
    { id: 2, name: "Sarah Lee", role: "Developer", dept: "IT" },
    { id: 3, name: "Raj Kumar", role: "Analyst", dept: "Finance" },
  ];

  return (
    <MainLayout>
      <h2>Employees</h2>
      <p style={{ color: "#666" }}>Manage all employees in the system</p>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Role</th>
            <th style={th}>Department</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td style={td}>{emp.id}</td>
              <td style={td}>{emp.name}</td>
              <td style={td}>{emp.role}</td>
              <td style={td}>{emp.dept}</td>
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