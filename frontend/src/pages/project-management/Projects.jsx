export default function Projects() {
  return (
    <div>
      

      <div style={card}>
        Project: ERP Upgrade
        <br />
        Progress: 60%
      </div>

      <div style={card}>
        Task: Build UI
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