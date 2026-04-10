-- TENANT
INSERT INTO tenants (name) VALUES ('Amdox Company');

-- ROLES
INSERT INTO roles (role_name) VALUES 
('Admin'),
('Manager'),
('Employee');

-- USERS
INSERT INTO users (tenant_id, role_id, name, email, password) VALUES
(1, 1, 'Admin User', 'admin@erp.com', 'pass'),
(1, 2, 'Manager User', 'manager@erp.com', 'pass'),
(1, 3, 'Employee User', 'employee@erp.com', 'pass');

-- EMPLOYEES
INSERT INTO employees (user_id, department, salary) VALUES
(3, 'HR', 30000);

-- ACCOUNTS
INSERT INTO accounts (tenant_id, account_name, account_type) VALUES
(1, 'Cash', 'asset'),
(1, 'Revenue', 'income');

-- JOURNAL ENTRIES
INSERT INTO journal_entries (account_id, amount, entry_type) VALUES
(1, 5000, 'debit'),
(2, 5000, 'credit');

-- INVENTORY
INSERT INTO inventory_items (tenant_id, product_name, quantity, price) VALUES
(1, 'Laptop', 10, 50000),
(1, 'Mouse', 50, 500);

-- PURCHASE ORDERS
INSERT INTO purchase_orders (tenant_id, supplier_name, order_date) VALUES
(1, 'ABC Supplier', CURRENT_DATE);

-- NOTIFICATIONS
INSERT INTO notifications (user_id, message) VALUES
(3, 'Welcome Employee');