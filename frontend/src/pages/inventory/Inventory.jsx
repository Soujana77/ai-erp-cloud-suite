import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import MainLayout from "../../layout/MainLayout";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../hooks/useAuth";

export default function Inventory() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { canCreate, canDelete, canEdit } = useAuth();
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
      addToast("Failed to fetch inventory", "error");
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
        addToast("Item updated successfully", "success");
      } else {
        await api.post("/inventory", payload);
        addToast("Item created successfully", "success");
      }
      setFormData({ item_name: "", quantity: "", price: "" });
      setShowForm(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      addToast(err.response?.data?.message || "Operation failed", "error");
    }
  };

  const handleEdit = (item) => {
    if (!canEdit) {
      addToast("You don't have permission to edit", "error");
      return;
    }
    setFormData({ item_name: item.item_name, quantity: item.quantity, price: item.price });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!canDelete) {
      addToast("You don't have permission to delete", "error");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await api.delete(`/inventory/${id}`);
      addToast("Item deleted successfully", "success");
      fetchData();
    } catch (err) {
      addToast(err.response?.data?.message || "Delete failed", "error");
    }
  };

  const handleCancel = () => {
    setFormData({ item_name: "", quantity: "", price: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(num || 0);
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={loadingStyle}>
          <div style={spinnerStyle}></div>
          <p>Loading inventory...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Inventory</h1>
          <p style={subtitleStyle}>Manage your stock and products</p>
        </div>
        {canCreate && (
          <button onClick={() => setShowForm(true)} style={addBtnStyle}>
            + Add Item
          </button>
        )}
      </div>

      {lowStockItems.length > 0 && (
        <div style={alertCardStyle}>
          <div style={alertHeaderStyle}>
            <span style={alertIconStyle}>⚠️</span>
            <span style={alertTitleStyle}>Low Stock Alert</span>
          </div>
          <p style={alertTextStyle}>
            {lowStockItems.length} item(s) running low on stock:
          </p>
          <div style={alertListStyle}>
            {lowStockItems.slice(0, 5).map(item => (
              <span key={item.id} style={alertItemStyle}>
                {item.item_name} ({item.quantity} left)
              </span>
            ))}
            {lowStockItems.length > 5 && <span style={alertItemStyle}>+{lowStockItems.length - 5} more</span>}
          </div>
        </div>
      )}

      {showForm && (
        <div style={formCardStyle}>
          <h3 style={formTitleStyle}>{editingId ? "Edit Item" : "Add New Item"}</h3>
          <form onSubmit={handleSubmit} style={formGridStyle}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Item Name</label>
              <input
                type="text"
                placeholder="Enter item name"
                value={formData.item_name}
                onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Quantity</label>
              <input
                type="number"
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Price</label>
              <input
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                style={inputStyle}
              />
            </div>
            <div style={formActionsStyle}>
              <button type="submit" style={submitBtnStyle}>
                {editingId ? "Update Item" : "Create Item"}
              </button>
              <button type="button" onClick={handleCancel} style={cancelBtnStyle}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={tableCardStyle}>
        <h3 style={tableTitleStyle}>All Items ({items.length})</h3>
        {items.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>No inventory items found</p>
            {canCreate && <button onClick={() => setShowForm(true)} style={addBtnSmallStyle}>Add First Item</button>}
          </div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Item Name</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Status</th>
                {(canEdit || canDelete) && <th style={thStyle}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>#{item.id}</td>
                  <td style={tdStyle}>
                    <div style={nameCellStyle}>
                      <div style={itemIconStyle}>📦</div>
                      {item.item_name}
                    </div>
                  </td>
                  <td style={tdStyle}>{item.quantity}</td>
                  <td style={tdStyle}>{formatCurrency(item.price)}</td>
                  <td style={tdStyle}>
                    <span style={{
                      ...statusBadgeStyle,
                      background: item.quantity <= 10 ? "#fef2f2" : "#ecfdf5",
                      color: item.quantity <= 10 ? "#dc2626" : "#059669"
                    }}>
                      {item.quantity <= 10 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                  {(canEdit || canDelete) && (
                    <td style={tdStyle}>
                      {canEdit && (
                        <button onClick={() => handleEdit(item)} style={editBtnStyle}>
                          Edit
                        </button>
                      )}
                      {canDelete && (
                        <button onClick={() => handleDelete(item.id)} style={deleteBtnStyle}>
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

const alertCardStyle = {
  background: "#fffbeb",
  border: "1px solid #fcd34d",
  borderRadius: "12px",
  padding: "16px",
  marginBottom: "24px",
};

const alertHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px",
};

const alertIconStyle = { fontSize: "18px" };

const alertTitleStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#92400e",
};

const alertTextStyle = {
  fontSize: "13px",
  color: "#92400e",
  margin: "0 0 8px 0",
};

const alertListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const alertItemStyle = {
  background: "white",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  color: "#92400e",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
};

const formActionsStyle = {
  display: "flex",
  alignItems: "flex-end",
  gap: "12px",
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
  padding: "20px",
};

const tableTitleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#111827",
  margin: "0 0 16px 0",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  borderBottom: "1px solid #f3f4f6",
};

const tdStyle = {
  padding: "14px 12px",
  fontSize: "14px",
  color: "#374151",
  borderBottom: "1px solid #f9fafb",
};

const nameCellStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const itemIconStyle = {
  fontSize: "20px",
};

const statusBadgeStyle = {
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "500",
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