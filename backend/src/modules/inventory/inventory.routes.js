const express = require('express');
const router = express.Router();
const inventoryController = require('./inventory.controller');

router.post('/', inventoryController.createItem);
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/', inventoryController.getAllItems);
router.get('/low-stock', inventoryController.getLowStockItems);
router.put('/', inventoryController.updateItem);
router.delete('/', inventoryController.deleteItem);
router.put('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;