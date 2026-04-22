-- Create tables for Smart ERP

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER DEFAULT 1,
  role_id INTEGER DEFAULT 3,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER DEFAULT 1,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  salary DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table (Finance)
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER DEFAULT 1,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('income', 'expense')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  tenant_id INTEGER DEFAULT 1,
  item_name VARCHAR(255) NOT NULL,
  quantity INTEGER DEFAULT 0,
  price DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a test user (email: admin@erp.com, password: admin123)
INSERT INTO users (tenant_id, role_id, name, email, password)
VALUES (1, 1, 'Admin User', 'admin@erp.com', '$2b$10$rVnKkZQZQZQZQZQZQZQZQZQVnKkZQZQZQZQZQZQZQZQZQZQZQZ')
ON CONFLICT (email) DO NOTHING;
