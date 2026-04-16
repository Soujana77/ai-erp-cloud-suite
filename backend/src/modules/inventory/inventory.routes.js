const express = require("express");
const router = express.Router();

const inventoryController = require('./inventory.controller');

router.post('/', inventoryController.createItem);
router.get('/', inventoryController.getAllItems);
router.get('/low-stock', inventoryController.getLowStockItems);
router.put('/', inventoryController.updateItem);
router.delete('/', inventoryController.deleteItem);

module.exports = router;