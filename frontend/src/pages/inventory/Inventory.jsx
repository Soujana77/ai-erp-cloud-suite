import { useEffect, useState } from "react";
import {
  getInventory,
  addInventory,
  deleteInventory,
  updateInventory,
} from "../../services/api";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);

  // =========================
  // FETCH INVENTORY
  // =========================
  const fetchInventory = async () => {
    try {
      const res = await getInventory();
      setItems(res.data.data || []);
    } catch (err) {
      console.log("Inventory error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // =========================
  // ADD / UPDATE ITEM
  // =========================
  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateInventory(editingId, form);
      } else {
        await addInventory(form);
      }

      setForm({ name: "", stock: "" });
      setEditingId(null);
      fetchInventory();
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // =========================
  // DELETE ITEM
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      fetchInventory();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  // =========================
  // EDIT ITEM
  // =========================
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      stock: item.stock,
    });
    setEditingId(item.id);
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <h2>Inventory </h2>

      {/* ================= FORM ================= */}
      <div style={formStyle}>
        <input
          placeholder="Item Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
        />

        <button onClick={handleSubmit}>
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ name: "", stock: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Item</th>
            <th style={th}>Stock</th>
            <th style={th}>Status</th>
            <th style={th}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={td}>{item.id}</td>
              <td style={td}>{item.name}</td>

              <td
                style={{
                  ...td,
                  color: item.stock < 10 ? "red" : "black",
                  fontWeight: item.stock < 10 ? "bold" : "normal",
                }}
              >
                {item.stock}
              </td>

              <td style={td}>
                {item.stock < 10 ? "Low Stock" : "Available"}
              </td>

              <td style={td}>
                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= STYLES ================= */

const formStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "20px",
};

const tableStyle = {
  width: "100%",
  background: "white",
  borderCollapse: "collapse",
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