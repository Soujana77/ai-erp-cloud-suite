import { useEffect, useState } from "react";
import {
  getInventory,
  addInventory,
  deleteInventory,
  updateInventory,
} from "../../services/api";
import { toast } from "react-toastify";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    item_name: "",
    quantity: "",
    price: "",
  });

  const [editingId, setEditingId] = useState(null);

  const fetchInventory = async () => {
    try {
      const res = await getInventory();
      setItems(res?.data?.data || []);
    } catch (err) {
      console.log("Inventory error:", err);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!form.item_name || form.quantity === "" || form.price === "") {
        toast.error("Please enter item name, quantity and price");
        return;
      }

      const payload = {
        item_name: form.item_name,
        quantity: Number(form.quantity),
        price: Number(form.price),
      };

      if (editingId) {
        await updateInventory(editingId, payload);
        toast.success("Inventory item updated");
      } else {
        await addInventory(payload);
        toast.success("Inventory item added");
      }

      setForm({
        item_name: "",
        quantity: "",
        price: "",
      });
      setEditingId(null);
      fetchInventory();
    } catch (err) {
      console.log("Save error:", err);
      toast.error(err.response?.data?.message || "Failed to save inventory item");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      toast.success("Inventory item deleted");
      fetchInventory();
    } catch (err) {
      console.log("Delete error:", err);
      toast.error(err.response?.data?.message || "Failed to delete inventory item");
    }
  };

  const handleEdit = (item) => {
    setForm({
      item_name: item.item_name ?? "",
      quantity: item.quantity ?? "",
      price: item.price ?? "",
    });
    setEditingId(item.id);
    toast.info(`Editing ${item.item_name}`);
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({
      item_name: "",
      quantity: "",
      price: "",
    });
  };

  if (loading) return <p>Loading inventory...</p>;

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Inventory Control</h3>
        <p style={{ color: "#6b7280" }}>
          Add, update, and monitor item quantity and price across inventory.
        </p>
      </div>

      <div className="card">
        <div className="form-row">
          <input
            placeholder="Item Name"
            value={form.item_name}
            onChange={(e) => setForm({ ...form, item_name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <button className="btn-primary" onClick={handleSubmit}>
            {editingId ? "Update Item" : "Add Item"}
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
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="6">No inventory items found</td>
              </tr>
            ) : (
              items.map((item) => {
                const lowStock = Number(item.quantity) < 10;

                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item_name}</td>
                    <td
                      style={{
                        color: lowStock ? "#dc2626" : "#111827",
                        fontWeight: lowStock ? "700" : "500",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td>₹ {item.price}</td>
                    <td>
                      <span className={`badge ${lowStock ? "danger" : "success"}`}>
                        {lowStock ? "Low Stock" : "Available"}
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: "8px" }}>
                      <button
                        className="btn-secondary"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}