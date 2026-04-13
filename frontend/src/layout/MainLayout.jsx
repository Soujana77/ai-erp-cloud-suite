import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f4f6f9",
            overflowY: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}