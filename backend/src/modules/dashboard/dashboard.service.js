const db = require("../../config/db");

// GET DASHBOARD DATA
const getDashboardData = async () => {
  try {
    // total employees
    const employeesResult = await db.query("SELECT COUNT(*) FROM employees");

    // total income
    const incomeResult = await db.query(
      "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE transaction_type='income'"
    );

    // total expenses
    const expenseResult = await db.query(
      "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE transaction_type='expense'"
    );

    const totalEmployees = parseInt(employeesResult.rows[0].count);
    const totalRevenue = parseFloat(incomeResult.rows[0].coalesce);
    const totalExpenses = parseFloat(expenseResult.rows[0].coalesce);

    return {
      totalEmployees,
      totalRevenue,
      totalExpenses,
      balance: totalRevenue - totalExpenses,
    };

  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDashboardData,
};