import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";

export default function Inventory() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ item_name: "", quantity: "", price: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [itemsRes, lowStockRes] = await Promise.all([
        api.get("/inventory"),
        api.get("/inventory/low-stock")
      ]);
      setItems(itemsRes.data.data || []);
      setLowStockItems(lowStockRes.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price)
      };
      if (editingId) {
        await api.put(`/inventory/${editingId}`, payload);
      } else {
        await api.post("/inventory", payload);
      }
      setFormData({ item_name: "", quantity: "", price: "" });
      setShowForm(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setFormData({ item_name: item.item_name, quantity: item.quantity, price: item.price });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/inventory/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handleCancel = () => {
    setFormData({ item_name: "", quantity: "", price: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(num || 0);
  };

  if (loading) return <MainLayout><p>Loading...</p></MainLayout>;

  return (
    <MainLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Inventory</h2>
          <p style={{ color: "#666" }}>Track stock and resources</p>
        </div>
        <button onClick={() => setShowForm(true)} style={addBtnStyle}>+ Add Item</button>
      </div>

      {lowStockItems.length > 0 && (
        <div style={alertStyle}>
          <strong>⚠️ Low Stock Items:</strong>
          <ul style={{ margin: "10px 0 0 0", paddingLeft: "20px" }}>
            {lowStockItems.map(item => (
              <li key={item.id}>{item.item_name} - Qty: {item.quantity}</li>
            ))}
          </ul>
        </div>
      )}

      {showForm && (
        <div style={formContainerStyle}>
          <h3>{editingId ? "Edit Item" : "Add Item"}</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="text"
              placeholder="Item Name"
              value={formData.item_name}
              onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              style={inputStyle}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={submitBtnStyle}>{editingId ? "Update" : "Create"}</button>
              <button type="button" onClick={handleCancel} style={cancelBtnStyle}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Item Name</th>
            <th style={th}>Quantity</th>
            <th style={th}>Price</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr><td colSpan="6" style={{ ...td, textAlign: "center" }}>No items found</td></tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td style={td}>{item.id}</td>
                <td style={td}>{item.item_name}</td>
                <td style={td}>{item.quantity}</td>
                <td style={td}>{formatCurrency(item.price)}</td>
                <td style={td}>
                  <span style={{
                    ...statusBadgeStyle,
                    background: item.quantity <= 10 ? "#fee2e2" : "#dcfce7",
                    color: item.quantity <= 10 ? "#dc2626" : "#16a34a"
                  }}>
                    {item.quantity <= 10 ? "Low Stock" : "In Stock"}
                  </span>
                </td>
                <td style={td}>
                  <button onClick={() => handleEdit(item)} style={editBtnStyle}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={deleteBtnStyle}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </MainLayout>
  );
}

const addBtnStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const alertStyle = {
  background: "#fef3c7",
  border: "1px solid #f59e0b",
  borderRadius: "8px",
  padding: "15px",
  marginTop: "20px",
  color: "#92400e",
};

const formContainerStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  marginTop: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
};

const submitBtnStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const cancelBtnStyle = {
  padding: "10px 20px",
  background: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

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
  borderBottom: "1px solid #e5e7eb",
};

const td = {
  padding: "12px",
  borderTop: "1px solid #eee",
};

const statusBadgeStyle = {
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "500",
};

const editBtnStyle = {
  padding: "6px 12px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};

const deleteBtnStyle = {
  padding: "6px 12px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
