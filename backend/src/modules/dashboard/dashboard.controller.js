const { getDashboardData } = require("./dashboard.service");
const { successResponse } = require("../../utils/response");

const getDashboard = async (req, res, next) => {
  try {
    const data = await getDashboardData();

    return successResponse(res, "Dashboard data fetched", data);

  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getDashboard,
};