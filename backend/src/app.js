const express = require('express');
const cors = require('cors');

const employeeRoutes = require('./modules/employees/employees.routes');
const inventoryRouter = require('./modules/inventory/inventory.routes');
const financeRoutes = require('./modules/finance/finance.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Smart ERP Backend is running');
});

app.use('/api/employees', employeeRoutes);
app.use('/api/inventory', inventoryRouter);
app.use('/api/transactions', financeRoutes);

module.exports = app;