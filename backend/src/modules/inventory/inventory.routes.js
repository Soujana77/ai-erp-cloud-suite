const express = require("express");
const router = express.Router();
const inventoryController = require("./inventory.controller");

router.post("/", inventoryController.createItem);
router.get("/", inventoryController.getAllItems);
router.get("/low-stock", inventoryController.getLowStockItems);
router.put("/:id", inventoryController.updateItem);
router.delete("/:id", inventoryController.deleteItem);

module.exports = router;