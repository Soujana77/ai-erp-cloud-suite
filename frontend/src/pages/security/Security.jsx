export default function Security() {
  return (
    <div>
      

      <div style={card}>
        🔒 XSS Protection Enabled
      </div>

      <div style={card}>
        🚦 Rate Limiting Active
      </div>

      <div style={card}>
        🔑 JWT Authentication Active
      </div>
    </div>
  );
}

const card = {
  background: "white",
  padding: "15px",
  marginTop: "10px",
  borderRadius: "10px",
};