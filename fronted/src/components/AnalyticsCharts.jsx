import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AnalyticsCharts({ analytics }) {

  const difficultyData = [
    {
      name: "Easy",
      value: analytics.easy,
    },
    {
      name: "Medium",
      value: analytics.medium,
    },
    {
      name: "Hard",
      value: analytics.hard,
    },
  ];

  const categoryData = [
    {
      category: "Java",
      total: analytics.java,
    },
    {
      category: "MERN",
      total: analytics.mern,
    },
    {
      category: "DBMS",
      total: analytics.dbms,
    },
    {
      category: "OS",
      total: analytics.os,
    },
    {
      category: "CN",
      total: analytics.cn,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
  ];

  return (

    <div className="grid md:grid-cols-2 gap-8 mt-8">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Difficulty Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie
              data={difficultyData}
              dataKey="value"
              outerRadius={100}
              label
            >

              {difficultyData.map(
                (entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-6">
          Category Distribution
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={categoryData}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#3b82f6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}

export default AnalyticsCharts;