-- DASHBOARD

SELECT COUNT(*) AS total_employees FROM employees;

SELECT COUNT(*) AS total_products FROM inventory_items;

SELECT SUM(amount) AS total_income
FROM transactions WHERE transaction_type='income';

SELECT SUM(amount) AS total_expense
FROM transactions WHERE transaction_type='expense';

SELECT 
SUM(CASE WHEN transaction_type='income' THEN amount ELSE 0 END) -
SUM(CASE WHEN transaction_type='expense' THEN amount ELSE 0 END)
AS balance
FROM transactions;

-- JOINS

SELECT u.name, r.role_name
FROM users u
JOIN roles r ON u.role_id = r.id;

SELECT u.name, e.department, e.salary
FROM employees e
JOIN users u ON e.user_id = u.id;

-- AGGREGATION

SELECT transaction_type, SUM(amount)
FROM transactions
GROUP BY transaction_type;

SELECT DATE(created_at), SUM(amount)
FROM transactions
GROUP BY DATE(created_at);

-- LOW STOCK

SELECT * FROM inventory_items WHERE quantity < 10;