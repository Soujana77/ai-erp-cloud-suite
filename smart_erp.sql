DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS purchase_orders CASCADE;
DROP TABLE IF EXISTS inventory_items CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS journal_entries CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;
-- =========================
-- TENANTS (Multi-company)
-- =========================
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ROLES (RBAC)
-- =========================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    role_id INT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- =========================
-- EMPLOYEES (HR)
-- =========================
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    department VARCHAR(50),
    salary NUMERIC(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================
-- ACCOUNTS (Finance)
-- =========================
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    account_name VARCHAR(100),
    account_type VARCHAR(50), -- asset, liability, etc.
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- =========================
-- JOURNAL ENTRIES (Double Entry)
-- =========================
CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    account_id INT,
    amount NUMERIC(10,2),
    entry_type VARCHAR(10) CHECK (entry_type IN ('debit', 'credit')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- =========================
-- TRANSACTIONS
-- =========================
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    amount NUMERIC(10,2),
    transaction_type VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- =========================
-- INVENTORY ITEMS
-- =========================
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    product_name VARCHAR(100),
    quantity INT DEFAULT 0,
    price NUMERIC(10,2),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- =========================
-- PURCHASE ORDERS
-- =========================
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    supplier_name VARCHAR(100),
    order_date DATE,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- =========================
-- NOTIFICATIONS
-- =========================
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT,
    message TEXT,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
-- TENANT
INSERT INTO tenants (name) VALUES ('Amdox Company');

-- ROLES
INSERT INTO roles (role_name) VALUES ('Admin'), ('Manager'), ('Employee');

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