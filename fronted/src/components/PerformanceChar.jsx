import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function PerformanceChart() {
  const data = [
    { week: "Week 1", score: 60 },
    { week: "Week 2", score: 72 },
    { week: "Week 3", score: 81 },
    { week: "Week 4", score: 88 },
    { week: "Week 5", score: 92 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-5">
        Interview Performance
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PerformanceChart;