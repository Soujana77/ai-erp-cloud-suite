const inventoryService = require('./inventory.service');

const createItem = async (req, res) => {
    try {
        const item = await inventoryService.createItem(req.body);
        res.status(201).json({ 
            success: true,
        message: 'Item created',
        data: item
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create item',
            error: error.message
        });
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await inventoryService.getAllItems();
        res.status(200).json({
            success: true,
            data: items
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch items',
            error: error.message
        });
    }
};

const updateItem = async (req, res) => {
    try {
        const item = await inventoryService.updateItem(req.params.id, req.body);

        if(!item){
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }
        res.status(200).json({
            success: true,
            message: "Item updated",
            data: item
        });
    }catch(error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update item',
            error: error.message
        });
    }
};

const deleteItem = async (req, res) => {
  try {
    const item = await inventoryService.deleteItem(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete item', error: error.message });
  }
};

const getLowStockItems = async (req, res, next) => {
  try {
    const items = await inventoryService.getLowStockItems(10);
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch low stock items',
      error: error.message
    });
  }
};

module.exports ={
    createItem,
    getAllItems,
    updateItem,
    deleteItem,
    getLowStockItems,
};