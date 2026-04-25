const inventoryService = require("./inventory.service");

const validateInventoryInput = (body) => {
  const { item_name, quantity, price } = body;

  if (!item_name || quantity === undefined || price === undefined) {
    return "All fields are required";
  }

  if (String(item_name).trim() === "") {
    return "Item name cannot be empty";
  }

  if (isNaN(quantity) || Number(quantity) < 0) {
    return "Quantity must be a valid non-negative number";
  }

  if (isNaN(price) || Number(price) < 0) {
    return "Price must be a valid non-negative number";
  }

  return null;
};

const createItem = async (req, res) => {
  try {
    const validationError = validateInventoryInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
        data: null,
      });
    }

    const item = await inventoryService.createItem(req.body);

    res.status(201).json({
      success: true,
      message: "Item created successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create item",
      data: null,
      error: error.message,
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await inventoryService.getAllItems();

    res.status(200).json({
      success: true,
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch items",
      data: null,
      error: error.message,
    });
  }
};

const getLowStockItems = async (req, res) => {
  try {
    const items = await inventoryService.getLowStockItems(10);

    res.status(200).json({
      success: true,
      message: "Low stock items fetched successfully",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch low stock items",
      data: null,
      error: error.message,
    });
  }
};

const updateItem = async (req, res) => {
  try {
    const validationError = validateInventoryInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
        data: null,
      });
    }

    const item = await inventoryService.updateItem(req.params.id, req.body);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update item",
      data: null,
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await inventoryService.deleteItem(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      data: null,
      error: error.message,
    });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getLowStockItems,
  updateItem,
  deleteItem,
};