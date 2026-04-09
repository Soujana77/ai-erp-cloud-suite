
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ROLES
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- USERS
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

-- EMPLOYEES
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE,
    department VARCHAR(50),
    salary NUMERIC(10,2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ACCOUNTS
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    account_name VARCHAR(100),
    account_type VARCHAR(50),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- JOURNAL ENTRIES
CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    account_id INT,
    amount NUMERIC(10,2),
    entry_type VARCHAR(10) CHECK (entry_type IN ('debit', 'credit')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id)
);

-- TRANSACTIONS
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    amount NUMERIC(10,2),
    transaction_type VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- INVENTORY
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    product_name VARCHAR(100),
    quantity INT DEFAULT 0,
    price NUMERIC(10,2),
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- PURCHASE ORDERS
CREATE TABLE purchase_orders (
    id SERIAL PRIMARY KEY,
    tenant_id INT,
    supplier_name VARCHAR(100),
    order_date DATE,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- NOTIFICATIONS
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT,
    message TEXT,
    status VARCHAR(20) DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);