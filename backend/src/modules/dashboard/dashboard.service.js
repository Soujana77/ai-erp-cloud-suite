const db = require("../../config/db");
const financeService = require("../finance/finance.service");
const inventoryService = require("../inventory/inventory.service");

const getDashboardData = async () => {
  try {
    const employeesResult = await db.query("SELECT COUNT(*) FROM employees");
    const totalEmployees = parseInt(employeesResult.rows[0].count, 10);

    const financeSummary = await financeService.getTransactionSummary();
    const revenueTrend = await financeService.getRevenueTrend();
    const recentTransactions = await financeService.getRecentTransactions(5);
    const lowStockItems = await inventoryService.getLowStockItems(10);

    return {
  totalEmployees,

  totalRevenue: financeSummary.income,

  totalExpenses: financeSummary.expense,

  balance: financeSummary.balance,

  revenueTrend,

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