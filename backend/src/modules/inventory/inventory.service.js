const db = require("../../config/db");

const createItem = async (data) => {
  const { item_name, quantity, price } = data;

  const query = `
    INSERT INTO inventory_items (item_name, quantity, price)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(query, [item_name, quantity, price]);
  return result.rows[0];
};

const getAllItems = async () => {
  const result = await db.query("SELECT * FROM inventory_items ORDER BY id ASC");
  return result.rows;
};

const getLowStockItems = async (threshold = 10) => {
  const result = await db.query(
    "SELECT * FROM inventory_items WHERE quantity < $1 ORDER BY quantity ASC",
    [threshold]
  );
  return result.rows;
};

const updateItem = async (id, data) => {
  const { item_name, quantity, price } = data;

  const query = `
    UPDATE inventory_items
    SET item_name = $1, quantity = $2, price = $3
    WHERE id = $4
    RETURNING *;
  `;

  const result = await db.query(query, [item_name, quantity, price, id]);
  return result.rows[0];
};

const deleteItem = async (id) => {
  const result = await db.query(
    "DELETE FROM inventory_items WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createItem,
  getAllItems,
  getLowStockItems,
  updateItem,
  deleteItem,
};