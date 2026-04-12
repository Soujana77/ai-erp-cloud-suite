import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div style={containerStyle}>
      <Sidebar />

      <div style={rightSectionStyle}>
        <Navbar />

        <main style={mainStyle}>
          {children}
        </main>
      </div>
    </div>
  );
}

/* ================= IMPROVED STYLES (same UI, cleaner structure) ================= */

const containerStyle = {
  display: "flex",
  height: "100vh",
  fontFamily: "Arial",
};

const rightSectionStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  minWidth: 0, // prevents layout overflow issues
};

const mainStyle = {
  flex: 1,
  padding: "20px",
  background: "#f4f6f9",
  overflowY: "auto",
};