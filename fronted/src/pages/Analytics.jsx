import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analyticsService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
];

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">
          Loading Analytics...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        📊 Performance Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">
            Total Interviews
          </h2>

          <p className="text-4xl font-bold mt-4 text-indigo-600">
            {analytics.totalInterviews}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">
            Average Score
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-600">
            {analytics.averageScore}%
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-gray-500">
            Best Score
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-600">
            {analytics.bestScore}
          </p>
        </div>

      </div>

      
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

  <h2 className="text-2xl font-bold mb-6">
    📈 Score Trend
  </h2>

  <ResponsiveContainer
    width="100%"
    height={300}
  >

    <LineChart
      data={analytics.scoreTrend}
    >

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="date" />

      <YAxis />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="score"
        stroke="#4F46E5"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

      
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

<h2 className="text-2xl font-bold mb-6">

📊 Category Performance

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<BarChart
data={analytics.categoryPerformance}
>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="category"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="score"
fill="#4F46E5"
/>

</BarChart>

</ResponsiveContainer>

</div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

<h2 className="text-2xl font-bold mb-6">

🥧 Difficulty Distribution

</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<PieChart>

<Pie

data={analytics.difficultyStats}

dataKey="count"

nameKey="difficulty"

outerRadius={120}

label

>

{

analytics.difficultyStats.map(

(entry,index)=>(

<Cell

key={index}

fill={
COLORS[
index%
COLORS.length
]
}

/>

)

)

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

    </div>
  );
}

export default Analytics;