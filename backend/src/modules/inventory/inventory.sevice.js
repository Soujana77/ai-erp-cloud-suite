const db = require("../../config/db");

const createItem = async (data) => {
   const { item_name, quantity, price } = data;

   const query = `
   INSERT INTO inventory (item_name, quantity, price)
   VALUES ($1, $2, $3)
   RETURNING *;
   `;

   const result = await db.query(query, [item_name, quantity, price]);
   return result.rows[0];
};

const getAllItems = async () => {
   const result = await db.query('SELECT * FROM inventory ORDER BY id ASC');
   return result.rows;
};

const getlowStockItems = async () => {
   const result = await db.query(
      'SELECT * FROM inventory WHERE quantity < 10 ORDER BY quantity ASC'
   );
   return result.rows;
};

const updateItem = async (Id, data) => {
   const { item_name, quantity, price } = data;

   const query = `
   UPDATE inventory
   SET item_name = $1, quantity = $2, price = $3
   WHEERE id = $4
   RETURNING *;
   `;
   const result = await db.query(query, [item_name, quantity, price, id]);
   return result.rows[0];
};

const deleteItem = async (id) => {
   const result = await db.query(
      `DELETE FROM invenory WHERE id = $1 RETURNING *`,
      [id]
   );
   return result.rows[0];
};

module.exports = {
   createItem,
   getAllItems,
   getlowStockItems,
   updateItem,
   deleteItem,
};