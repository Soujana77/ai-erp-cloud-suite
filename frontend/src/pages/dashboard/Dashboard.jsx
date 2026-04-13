import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <ul>
          <li>
            <Link to="/employees">Employees</Link>
          </li>
          <li>
            <Link to="/inventory">Inventory</Link>
          </li>
        </ul>
      </nav>

      <p>Welcome to Smart ERP System 🚀</p>
    </div>
  );
}