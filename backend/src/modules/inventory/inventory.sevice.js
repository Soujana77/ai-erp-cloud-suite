 const db = require('../../config/db');

 const createItem = async (data)  => {
    const { item_name, quantity, price } =data;
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

 const updateItems = async (Id, data) => {
    const { item_name, quantity, price} = data;
    const query = `
    UPDATE inventory
    SET item_name = $1, quantity = $2, price = $3
    WHERE id = $4
    RETURNING *;
    `;

    const result = await db.query(query, [item_name, quantity, price, id]);
    return result.rows[0];
 };

 const deleteItems = async (id) => {
    const result = await db.query('DELETE FROM inventory WHERE id = $1 RETURNING *',
        [id]);
        return result.rows[0];
 };

 module.exports = {
    createItem,
    getAllItems,
    updateItems,
    deleteItems,
 };