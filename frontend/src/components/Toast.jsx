import { useState, useEffect, createContext, useContext } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={toastContainerStyle}>
        {toasts.map((toast) => (
          <div key={toast.id} style={{
            ...toastStyle,
            background: toast.type === "success" ? "#10b981" : "#ef4444"
          }}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

const toastContainerStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const toastStyle = {
  padding: "12px 20px",
  color: "white",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "500",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  animation: "slideIn 0.3s ease",
};