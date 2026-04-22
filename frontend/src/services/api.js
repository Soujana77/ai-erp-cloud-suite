import axios from "axios";

// =========================
// BASE API INSTANCE
// =========================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// 🔐 AUTH: attach JWT token automatically
// =========================
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// =========================
// GLOBAL ERROR HANDLING (optional but useful)
// =========================
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.log("Unauthorized - token may be invalid/expired");
      // optional: logout logic can go here
    }
    return Promise.reject(err);
  }
);



// =========================
// 🔐 AUTH APIs
// =========================
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);
export const logout = (data) => API.post("/auth/logout", data);
export const refreshToken = (data) => API.post("/auth/refresh", data);



// =========================
// 📊 DASHBOARD
// =========================
export const getDashboard = () => API.get("/dashboard");



// =========================
// 👨‍💼 EMPLOYEES (CRUD)
// =========================
export const getEmployees = () => API.get("/employees");

export const addEmployee = (data) =>
  API.post("/employees", data);

export const updateEmployee = (id, data) =>
  API.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  API.delete(`/employees/${id}`);



// =========================
// 📦 INVENTORY (CRUD)
// =========================
export const getInventory = () => API.get("/inventory");

export const addInventory = (data) =>
  API.post("/inventory", data);

export const updateInventory = (id, data) =>
  API.put(`/inventory/${id}`, data);

export const deleteInventory = (id) =>
  API.delete(`/inventory/${id}`);



// =========================
// 💰 FINANCE
// =========================
export const getTransactions = () =>
  API.get("/transactions/summary");

export const addTransaction = (data) =>
  API.post("/transactions", data);



// =========================
// EXPORT DEFAULT
// =========================
export default API;