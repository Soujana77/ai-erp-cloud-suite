import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../hooks/useAuth";

export default function Employees() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { canCreate, canDelete, canEdit } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", department: "", salary: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchEmployees();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees");
      setEmployees(res.data.data || []);
    } catch (err) {
      addToast(err.response?.data?.message || "Failed to fetch employees", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData);
        addToast("Employee updated successfully", "success");
      } else {
        await api.post("/employees", formData);
        addToast("Employee created successfully", "success");
      }
      setFormData({ name: "", email: "", department: "", salary: "" });
      setShowForm(false);
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      addToast(err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleEdit = (emp) => {
    if (!canEdit) {
      addToast("You don't have permission to edit", "error");
      return;
    }
    setFormData({ name: emp.name, email: emp.email, department: emp.department, salary: emp.salary });
    setEditingId(emp.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!canDelete) {
      addToast("You don't have permission to delete", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      addToast("Employee deleted successfully", "success");
      fetchEmployees();
    } catch (err) {
      addToast(err.response?.data?.message || "Delete failed", "error");
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", department: "", salary: "" });
    setShowForm(false);
    setEditingId(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p>Loading employees...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Employees</h1>
          <p style={subtitleStyle}>Manage your team members</p>
        </div>
        {canCreate && (
          <button onClick={() => setShowForm(true)} style={addBtnStyle}>
            + Add Employee
          </button>
        )}
      </div>

      {showForm && (
        <div style={formCardStyle}>
          <h3 style={formTitleStyle}>{editingId ? "Edit Employee" : "Add New Employee"}</h3>
          <form onSubmit={handleSubmit} style={formGridStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Department</label>
              <input
                type="text"
                placeholder="Enter department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Salary</label>
              <input
                type="number"
                placeholder="Enter salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formActionsStyle}>
              <button type="submit" style={submitBtnStyle}>
                {editingId ? "Update Employee" : "Create Employee"}
              </button>
              <button type="button" onClick={handleCancel} style={cancelBtnStyle}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={tableCardStyle}>
        {employees.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>No employees found</p>
            {canCreate && <button onClick={() => setShowForm(true)} style={addBtnSmallStyle}>Add First Employee</button>}
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Salary</th>
                {(canEdit || canDelete) && <th style={thStyle}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={tdStyle}>#{emp.id}</td>
                  <td style={tdStyle}>
                    <div style={nameCellStyle}>
                      <div style={avatarStyle}>{emp.name?.charAt(0).toUpperCase()}</div>
                      {emp.name}
                    </div>
                  </td>
                  <td style={tdStyle}>{emp.email}</td>
                  <td style={tdStyle}>
                    <span style={deptBadgeStyle}>{emp.department}</span>
                  </td>
                  <td style={tdStyle}>${Number(emp.salary).toLocaleString()}</td>
                  {(canEdit || canDelete) && (
                    <td style={tdStyle}>
                      {canEdit && (
                        <button onClick={() => handleEdit(emp)} style={editBtnStyle}>
                          Edit
                        </button>
                      )}
                      {canDelete && (
                        <button onClick={() => handleDelete(emp.id)} style={deleteBtnStyle}>
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
}

const loadingStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  gap: "16px",
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "3px solid #e5e7eb",
  borderTopColor: "#3b82f6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#111827",
  margin: 0,
};

const subtitleStyle = {
  fontSize: "14px",
  color: "#6b7280",
  margin: "4px 0 0 0",
};

const addBtnStyle = {
  padding: "10px 20px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "background 0.2s",
};

const addBtnSmallStyle = {
  marginTop: "12px",
  padding: "8px 16px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
};

const formCardStyle = {
  background: "white",
  borderRadius: "12px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
};

const formTitleStyle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#111827",
  margin: "0 0 20px 0",
};

const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
};

const formGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#374151",
  marginBottom: "6px",
};

const inputStyle = {
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  transition: "border-color 0.2s",
};

const formActionsStyle = {
  gridColumn: "1 / -1",
  display: "flex",
  gap: "12px",
  marginTop: "8px",
};

const submitBtnStyle = {
  padding: "10px 24px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

const cancelBtnStyle = {
  padding: "10px 24px",
  background: "#f3f4f6",
  color: "#374151",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
};

const tableCardStyle = {
  background: "white",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  border: "1px solid #f3f4f6",
  overflow: "hidden",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "14px 16px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  background: "#f9fafb",
  borderBottom: "1px solid #f3f4f6",
};

const tdStyle = {
  padding: "14px 16px",
  fontSize: "14px",
  color: "#374151",
  borderBottom: "1px solid #f9fafb",
};

const nameCellStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const avatarStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "#3b82f6",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "600",
};

const deptBadgeStyle = {
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
  background: "#f3f4f6",
  color: "#4b5563",
};

const editBtnStyle = {
  padding: "6px 12px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer",
  marginRight: "8px",
};

const deleteBtnStyle = {
  padding: "6px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "13px",
  fontWeight: "500",
  cursor: "pointer",
};

const emptyStateStyle = {
  textAlign: "center",
  padding: "60px 20px",
  color: "#9ca3af",
};