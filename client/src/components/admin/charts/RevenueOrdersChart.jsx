import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
} from "recharts";

const RevenueOrdersChart = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-6">
        Revenue vs Orders
      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >
        <ComposedChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="orders"
            fill="#60a5fa"
            radius={[5, 5, 0, 0]}
            name="Orders"
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Revenue ($)"
          />

        </ComposedChart>
      </ResponsiveContainer>

    </div>
  );
};

export default RevenueOrdersChart;