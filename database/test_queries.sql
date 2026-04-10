-- USERS + ROLES
SELECT u.name, r.role_name
FROM users u
JOIN roles r ON u.role_id = r.id;

-- HR MODULE
SELECT u.name, e.department, e.salary
FROM employees e
JOIN users u ON e.user_id = u.id;

-- FINANCE MODULE
SELECT a.account_name, j.amount, j.entry_type
FROM journal_entries j
JOIN accounts a ON j.account_id = a.id;

-- INVENTORY
SELECT * FROM inventory_items;

-- PURCHASE ORDERS
SELECT * FROM purchase_orders;

-- NOTIFICATIONS
SELECT * FROM notifications;