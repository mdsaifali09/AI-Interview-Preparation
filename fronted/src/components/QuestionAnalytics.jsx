import { useEffect, useState } from "react";

import AnalyticsCard from "./AnalyticsCard";
import AnalyticsCharts from "./AnalyticsCharts";

import {
  getAnalytics,
} from "../services/questionService";

function QuestionAnalytics() {

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
  async () => {

    try {

      const data =
        await getAnalytics();

      setAnalytics(data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!analytics)
    return null;

  return (

    <>

      <div className="grid md:grid-cols-4 gap-5 mb-10">

        <AnalyticsCard
          title="Total"
          value={analytics.total}
          color="bg-blue-600"
        />

        <AnalyticsCard
          title="Easy"
          value={analytics.easy}
          color="bg-green-600"
        />

        <AnalyticsCard
          title="Medium"
          value={analytics.medium}
          color="bg-yellow-500"
        />

        <AnalyticsCard
          title="Hard"
          value={analytics.hard}
          color="bg-red-600"
        />

        <AnalyticsCharts
  analytics={analytics}
/>

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">

          Category Analytics

        </h2>

        <div className="space-y-4">

          <p>Java : {analytics.java}</p>

          <p>MERN : {analytics.mern}</p>

          <p>DBMS : {analytics.dbms}</p>

          <p>OS : {analytics.os}</p>

          <p>CN : {analytics.cn}</p>

        </div>

      </div>

    </>

    

  );

}

export default QuestionAnalytics;