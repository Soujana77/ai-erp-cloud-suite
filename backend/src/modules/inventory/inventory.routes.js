const express = require('express');
const router = express.Router();
const inventoryController = require('./inventory.controller');

router.post('/', inventoryController.createItem);
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/', inventoryController.getAllItems);
<<<<<<< HEAD
router.get('/low-stock', inventoryController.getLowStockItems);
router.put('/', inventoryController.updateItem);
router.delete('/', inventoryController.deleteItem);
=======
router.put('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);
>>>>>>> 9311bf2 (implemented advanced CRUD modules properly in backend)

module.exports = router;