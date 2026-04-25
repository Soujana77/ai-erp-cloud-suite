export default function Projects() {
  const projects = [
    {
      id: 1,
      name: "ERP Upgrade",
      owner: "Admin Team",
      progress: 60,
      status: "In Progress",
    },
    {
      id: 2,
      name: "Inventory Automation",
      owner: "Operations",
      progress: 82,
      status: "Active",
    },
    {
      id: 3,
      name: "HR Digitization",
      owner: "HR Team",
      progress: 35,
      status: "Planning",
    },
  ];

  return (
    <div>
      <div className="card" style={{ marginBottom: "18px" }}>
        <h3 style={{ marginBottom: "6px" }}>Project Management</h3>
        <p style={{ color: "#6b7280" }}>
          View active ERP initiatives, ownership, and current progress.
        </p>
      </div>

      <div className="card-grid three">
        {projects.map((project) => (
          <div key={project.id} className="card">
            <h4 style={{ marginBottom: "10px" }}>{project.name}</h4>
            <p style={{ color: "#6b7280", marginBottom: "8px" }}>
              Owner: {project.owner}
            </p>
            <p style={{ color: "#6b7280", marginBottom: "14px" }}>
              Progress: {project.progress}%
            </p>

            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: `${project.progress}%`,
                  height: "100%",
                  background: "#2563eb",
                }}
              />
            </div>

            <span
              className={`badge ${
                project.progress >= 70
                  ? "success"
                  : project.progress >= 40
                  ? "warning"
                  : "danger"
              }`}
            >
              {project.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}