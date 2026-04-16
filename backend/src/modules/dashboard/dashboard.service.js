const db = require("../../config/db");
const financeService = require("../finance/finance.service");
const inventoryService = require("../inventory/inventory.service");

// GET DASHBOARD DATA
const getDashboardData = async () => {
  try {
    // total employees
    const employeesResult = await db.query("SELECT COUNT(*) FROM employees");
    const totalEmployees = parseInt(employeesResult.rows[0].count);

    // reuse finance service (BEST PRACTICE)
    const { totalIncome, totalExpense, balance } =
      await financeService.getFinanceSummary();

    // recent transactions
    const recentTransactions =
      await financeService.getRecentTransactions(5);

    // low stock items
    const lowStockItems =
      await inventoryService.getLowStockItems(10);

    return {
      totalEmployees,
      totalRevenue: totalIncome,
      totalExpenses: totalExpense,
      balance,
      recentTransactions,
      lowStockItems,
    };

  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDashboardData,
};