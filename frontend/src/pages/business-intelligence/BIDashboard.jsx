import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BIDashboard() {

  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 6000 },
    { month: "Mar", sales: 8000 },
    { month: "Apr", sales: 7000 },
  ];

  const revenueData = [
    { name: "Products", value: 400 },
    { name: "Services", value: 300 },
    { name: "Subscriptions", value: 300 },
  ];

  const inventoryData = [
    { item: "Laptops", stock: 50 },
    { item: "Monitors", stock: 30 },
    { item: "Keyboards", stock: 80 },
  ];

  const profitData = [
    { month: "Jan", profit: 2000 },
    { month: "Feb", profit: 3500 },
    { month: "Mar", profit: 5000 },
    { month: "Apr", profit: 4500 },
  ];

  return (
    <div>

      <div style={grid}>

        {/* Sales Trend */}
        <div style={card}>
          <h3>Sales Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Pie */}
        <div style={card}>
          <h3>Revenue Distribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueData}
                dataKey="value"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {revenueData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#6366f1", "#8b5cf6", "#06b6d4"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory */}
        <div style={card}>
          <h3>Inventory Status</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="item" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="stock" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit */}
        <div style={card}>
          <h3>Profit Analytics</h3>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="profit"
                stroke="#f59e0b"
                fill="#fde68a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};