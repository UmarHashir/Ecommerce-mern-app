import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#eab308",
  "#3b82f6",
  "#22c55e",
  "#ef4444",
];

const OrderStatusPieChart = ({
  data,

  
}) => {
    const chartData = data || [];
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Order Status
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>

          <Pie
  data={chartData}
  dataKey="value"
  nameKey="name"
  outerRadius={120}
  label
>
  {chartData.map((_, index) => (
    <Cell
      key={index}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default OrderStatusPieChart;