import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../../services/api";
import { toast } from "react-toastify";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res?.data?.data || []);
    } catch (err) {
      console.log("Employees error:", err);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.role || !form.department) {
        toast.error("Please fill name, role and department");
        return;
      }

      const payload = {
        name: form.name,
        role: form.role,
        department: form.department,
      };

      if (editingId) {
        await updateEmployee(editingId, payload);
        toast.success("Employee updated successfully");
      } else {
        await addEmployee(payload);
        toast.success("Employee added successfully");
      }

      setForm({
        name: "",
        role: "",
        department: "",
      });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      console.log("Save error:", err);
      toast.error(err.response?.data?.message || "Failed to save employee");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully");
      fetchEmployees();
    } catch (err) {
      console.log("Delete error:", err);
      toast.error(err.response?.data?.message || "Failed to delete employee");
    }
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name ?? "",
      role: emp.role ?? "",
      department: emp.department ?? "",
    });
    setEditingId(emp.id);
    toast.info(`Editing employee ID ${emp.id}`);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      name: "",
      role: "",
      department: "",
    });
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Employee Management</h3>
        <p style={{ color: "#6b7280" }}>
          Add, update, and manage employee records across departments.
        </p>
      </div>

      <div className="card">
        <div className="form-row">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <button className="btn-primary" onClick={handleSubmit}>
            {editingId ? "Update Employee" : "Add Employee"}
          </button>

          {editingId && (
            <button className="btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5">No employees found</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="btn-secondary"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
