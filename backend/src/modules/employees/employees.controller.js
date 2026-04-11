const employeeService = require('./employees.service');

const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};
const createEmployee = async (req, res, next) => {
  try {
    

    const employee = await employeeService.createEmployee(req.body);
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, department, salary',
      });
    }

    const employee = await employeeService.updateEmployee(req.params.id, req.body);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};