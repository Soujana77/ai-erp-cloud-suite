# ai-erp-cloud-suite
AI-powered cloud-based ERP system designed to manage finance, HR, inventory, and business operations with intelligent automation and real-time analytics.


# 🚀 Smart ERP Backend System

A modular and scalable ERP backend system built using Node.js and Express, designed with production-level architecture and security practices.

---

## 📌 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Refresh token system
* Role-Based Access Control (RBAC)

  * Admin: full access
  * Manager: create & update
  * Employee: read-only

---

### 🧩 Core Modules

* 👤 User Management
* 👨‍💼 Employee Management
* 💰 Finance (Income, Expense, Balance)
* 📦 Inventory (Stock Management + Low Stock Detection)
* 📊 Dashboard (Aggregated Data)

---

### 📊 Dashboard Capabilities

* Total Employees
* Total Revenue
* Total Expenses
* Balance Calculation
* Recent Transactions
* Low Stock Alerts

---

### ⚙️ Backend Architecture

* MVC Pattern (Controller → Service → Routes)
* Modular folder structure
* Clean and reusable middleware

---

### 🛡️ Security

* Password hashing using bcrypt
* JWT token validation
* Role-based authorization
* Helmet for secure HTTP headers
* Rate limiting (basic protection)

---

### ✅ Validation & Error Handling

* Centralized error handling middleware
* Request validation middleware
* Standard API response format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT (jsonwebtoken)
* bcrypt
* Helmet
* express-rate-limit

---

## 📂 Project Structure

```
backend/src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── employees/
│   ├── finance/
│   ├── inventory/
│   └── dashboard/
│
├── middleware/
├── config/
└── app.js
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-erp-cloud-suite.git
```

### 2. Install dependencies

```bash
cd backend
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=your_db
```

### 4. Run the server

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Auth

* `POST /api/auth/register`
* `POST /api/auth/login`
* `POST /api/auth/refresh`

---

### 👨‍💼 Employees

* `GET /api/employees`
* `POST /api/employees`
* `PUT /api/employees/:id`
* `DELETE /api/employees/:id`

---

### 💰 Finance

* `GET /api/transactions`
* `POST /api/transactions`

---

### 📦 Inventory

* `GET /api/inventory`
* `GET /api/inventory/low-stock`
* `POST /api/inventory`

---

### 📊 Dashboard

* `GET /api/dashboard`

---

## 🔐 Authorization

All protected routes require:

```
Authorization: Bearer <access_token>
```

---

## 🎯 Project Status

✅ Modular backend architecture
✅ Authentication & RBAC
✅ Aggregated dashboard
✅ Security & validation
✅ Ready for frontend integration

---

## 👨‍💻 Author

Developed as part of Smart ERP System Project.

---
