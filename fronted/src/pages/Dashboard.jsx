

import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";
import ActivityCard from "../components/ActivityCard";
import PerformanceChart from "../components/PerformanceChar";
import AddQuestionModal from "../components/AddQuestionModal";
import EditQuestionModal from "../components/EditQuestionModal";
import QuestionAnalytics from "../components/QuestionAnalytics";
import { getDashboardStats } from "../services/dashboardService";

import { NavLink, useNavigate } from "react-router-dom";

import {
  getQuestions,
  deleteQuestion,
} from "../services/questionService";

function Dashboard() {

  const [stats, setStats] = useState(null);


  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const [editModal, setEditModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("Newest");

  
const [codingAnalytics, setCodingAnalytics] =
  useState({
    totalSubmissions: 0,
    acceptedSubmissions: 0,
    averageScore: 0,
    bestScore: 0,
    currentStreak: 0,
  });

const [codingAnalyticsLoading, setCodingAnalyticsLoading] =
  useState(true);






  const questionsPerPage = 5;


  const navigate = useNavigate();



  useEffect(() => {
    fetchQuestions();
    fetchCodingAnalytics();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await getQuestions();
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };


  
const fetchCodingAnalytics = async () => {
  try {
    const response = await api.get(
      "/coding-analytics"
    );

    if (
      response.data?.success &&
      response.data?.analytics
    ) {
      setCodingAnalytics(
        response.data.analytics
      );
    }

  } catch (error) {

    console.log(
      "CODING ANALYTICS ERROR:",
      error
    );

  } finally {

    setCodingAnalyticsLoading(false);

  }
};







  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this question?"
    );


    if (!confirmDelete) return;

    try {
      await deleteQuestion(id);
      fetchQuestions();
    } catch (error) {
      console.log(error);
    }


  };


  const filteredQuestions = questions.filter((q) => {

    const matchesSearch =
      q.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      q.question
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      q.category === categoryFilter;

    const matchesDifficulty =
      difficultyFilter === "All" ||
      q.difficulty === difficultyFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty
    );

  });


  const sortedQuestions =
    [...filteredQuestions];

  if (sortOption === "Newest") {

    sortedQuestions.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

  }

  if (sortOption === "Oldest") {

    sortedQuestions.sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    );

  }

  if (sortOption === "A-Z") {

    sortedQuestions.sort(
      (a, b) =>
        a.title.localeCompare(
          b.title
        )
    );

  }

  if (sortOption === "Z-A") {

    sortedQuestions.sort(
      (a, b) =>
        b.title.localeCompare(
          a.title
        )
    );

  }


  const totalQuestions =
    questions.length;

  const javaCount =
    questions.filter(
      (q) => q.category === "Java"
    ).length;

  const mernCount =
    questions.filter(
      (q) => q.category === "MERN"
    ).length;

  const dbmsCount =
    questions.filter(
      (q) => q.category === "DBMS"
    ).length;

  const osCount =
    questions.filter(
      (q) => q.category === "OS"
    ).length;

  const cnCount =
    questions.filter(
      (q) => q.category === "CN"
    ).length;

  const easyCount =
    questions.filter(
      (q) => q.difficulty === "Easy"
    ).length;

  const mediumCount =
    questions.filter(
      (q) => q.difficulty === "Medium"
    ).length;

  const hardCount =
    questions.filter(
      (q) => q.difficulty === "Hard"
    ).length;


  const indexOfLastQuestion =
    currentPage * questionsPerPage;

  const indexOfFirstQuestion =
    indexOfLastQuestion -
    questionsPerPage;

  const currentQuestions =
    sortedQuestions.slice(
      indexOfFirstQuestion,
      indexOfLastQuestion
    );

  const totalPages = Math.ceil(
    filteredQuestions.length /
    questionsPerPage
  );


  useEffect(() => {

    loadStats();

  }, []);


  const loadStats = async () => {

    const data =
      await getDashboardStats();

    setStats(data);

  };


  return (

    <div className="flex h-screen bg-slate-100">


      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">

        <Navbar />

        <div className="p-8">

          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">

            <h1 className="text-4xl font-bold">

              Welcome Back

            </h1>

            <p className="mt-3">

              Keep practicing and improve your interview skills.

            </p>

          </div>

          {/* Stats */}

<div className="grid md:grid-cols-3 gap-5">

  <StatCard
    title="Interviews Taken"
    value={stats?.totalInterviews || 0}
     icon="📋"
  />

  <StatCard
    title="Average Score"
    value={`${stats?.averageScore || 0}%`}
     icon="📈"
  />

  <StatCard
    title="Best Score"
    value={stats?.bestScore || 0}
    icon="🏆"
  />

</div>


{/* Recent Interviews */}

<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

  <h2 className="text-2xl font-bold mb-4">
    Recent Interviews
  </h2>

  {stats?.recentInterviews?.length > 0 ? (

    stats.recentInterviews.map((item) => (

      <div
        key={item._id}
        className="flex justify-between border-b py-4"
      >

        <div>

          <h3 className="font-semibold">
            {item.category}
          </h3>

          <p className="text-gray-500">
            {item.difficulty}
          </p>

        </div>

        <div className="font-bold text-indigo-600">

          {item.overallScore}/100

        </div>

      </div>

    ))

  ) : (

    <p className="text-gray-500">
      No interview history available.
    </p>

  )}

</div>


{/* Quick Actions */}

<div className="grid md:grid-cols-4 gap-5 mt-8">

  <NavLink
    to="/interview"
    className="bg-indigo-600 text-white rounded-xl p-4 text-center"
  >
    Start Interview
  </NavLink>

  <NavLink
    to="/ai-generator"
    className="bg-indigo-600 text-white rounded-xl p-4 text-center"
  >
    Generate Questions
  </NavLink>

  <NavLink
    to="/resume"
    className="bg-indigo-600 text-white rounded-xl p-4 text-center"
  >
    Resume Analysis
  </NavLink>

  <NavLink
    to="/analytics"
    className="bg-indigo-600 text-white rounded-xl p-4 text-center"
  >
    Analytics
  </NavLink>

  <NavLink

to="/question-bank"

className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl"

>

 Question Bank

</NavLink>

<NavLink
  to="/coding-history"
  className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
>
  💻 Coding History
</NavLink>

<NavLink 
to="/coding-analytics" 
 className="bg-indigo-600 text-white px-5 py-3 rounded-xl"
>
  📊 Coding Analytics
</NavLink>


<button
  onClick={() =>
    window.location.href =
      "/ai-image-generator"
  }
  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-600 text-white-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
>
  <span className="text-xl">
    ✨
  </span>

  <span className="font-medium">
    AI Image Generator
  </span>
</button>





</div>

          {/* Progress & Activity */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <ProgressCard />

            <ActivityCard />

          </div>


          
{/* ========================================= */}
{/* CODING PERFORMANCE */}
{/* ========================================= */}

<div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

    <div>

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl">

          💻

        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900">

            Coding Performance

          </h2>

          <p className="text-gray-500 text-sm">

            Your coding interview progress

          </p>

        </div>

      </div>

    </div>


    <button
      onClick={() =>
        window.location.href =
          "/coding-analytics"
      }
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-md"
    >

      View Analytics →

    </button>

  </div>


  {codingAnalyticsLoading ? (

    <div className="py-8 text-center text-gray-500">

      Loading coding stats...

    </div>

  ) : (

    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">


      {/* TOTAL */}

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

        <p className="text-sm text-gray-500">

          💻 Submissions

        </p>

        <p className="text-3xl font-bold text-indigo-700 mt-2">

          {codingAnalytics.totalSubmissions || 0}

        </p>

      </div>


      {/* ACCEPTED */}

      <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

        <p className="text-sm text-gray-500">

          ✅ Accepted

        </p>

        <p className="text-3xl font-bold text-green-700 mt-2">

          {codingAnalytics.acceptedSubmissions || 0}

        </p>

      </div>


      {/* AVERAGE */}

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">

        <p className="text-sm text-gray-500">

          ⭐ Avg Score

        </p>

        <p className="text-3xl font-bold text-blue-700 mt-2">

          {codingAnalytics.averageScore || 0}%

        </p>

      </div>


      {/* BEST */}

      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5">

        <p className="text-sm text-gray-500">

          🏆 Best Score

        </p>

        <p className="text-3xl font-bold text-purple-700 mt-2">

          {codingAnalytics.bestScore || 0}%

        </p>

      </div>


      {/* STREAK */}

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">

        <p className="text-sm text-gray-500">

          🔥 Streak

        </p>

        <p className="text-3xl font-bold text-orange-600 mt-2">

          {codingAnalytics.currentStreak || 0}

        </p>

        <p className="text-xs text-gray-500 mt-1">

          days

        </p>

      </div>

    </div>

  )}

</div>







          {/* AI Suggestions */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">

            <h2 className="text-xl font-bold mb-4">
              AI Suggestions
            </h2>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Improve DBMS concepts</li>
              <li>✅ Practice Java OOPs</li>
              <li>✅ Solve Medium DSA Questions</li>
              <li>✅ Focus on System Design basics</li>
            </ul>

          </div>

          {/* Performance Chart */}
          <div className="mt-10">
            <PerformanceChart />
            <QuestionAnalytics />
          </div>


          {/* Analytics Section */}


          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-5">
              Question Analytics
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-500">
                  Total Questions
                </h3>

                <p className="text-4xl font-bold mt-2 text-blue-600">
                  {totalQuestions}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-500">
                  Java
                </h3>

                <p className="text-4xl font-bold mt-2 text-green-600">
                  {javaCount}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-500">
                  MERN
                </h3>

                <p className="text-4xl font-bold mt-2 text-purple-600">
                  {mernCount}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-500">
                  DBMS
                </h3>

                <p className="text-4xl font-bold mt-2 text-pink-600">
                  {dbmsCount}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-500">
                  OS
                </h3>

                <p className="text-4xl font-bold mt-2 text-orange-600">
                  {osCount}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-gray-500">
                  CN
                </h3>

                <p className="text-4xl font-bold mt-2 text-red-600">
                  {cnCount}
                </p>
              </div>

            </div>

          </div>




          {/* Analytic Ui */}


          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="bg-green-100 p-6 rounded-2xl">

              <h3 className="text-lg font-semibold">
                Easy
              </h3>

              <p className="text-4xl font-bold">
                {easyCount}
              </p>

            </div>

            <div className="bg-yellow-100 p-6 rounded-2xl">

              <h3 className="text-lg font-semibold">
                Medium
              </h3>

              <p className="text-4xl font-bold">
                {mediumCount}
              </p>

            </div>

            <div className="bg-red-100 p-6 rounded-2xl">

              <h3 className="text-lg font-semibold">
                Hard
              </h3>

              <p className="text-4xl font-bold">
                {hardCount}
              </p>

            </div>

          </div>


          {/* Questions */}
          <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

              <h2 className="text-2xl font-bold text-gray-800">
                Interview Questions
              </h2>

              <button
                onClick={() => setShowModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium"
              >
                + Add Question
              </button>

              <div className="flex justify-center items-center gap-3 mt-8">

                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(currentPage - 1)
                  }
                  className="bg-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="font-semibold">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage(currentPage + 1)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>

              </div>

            </div>

            {/* Search & Filters */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">

              <input
                type="text"
                placeholder="🔍 Search Questions..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
                className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Categories</option>
                <option value="Java">Java</option>
                <option value="MERN">MERN</option>
                <option value="DBMS">DBMS</option>
                <option value="OS">OS</option>
                <option value="CN">CN</option>
              </select>

              <select
                value={difficultyFilter}
                onChange={(e) =>
                  setDifficultyFilter(e.target.value)
                }
                className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="All">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value)
                }
                className="w-full border border-gray-300 px-4 py-3 rounded-xl outline-none"
              >
                <option value="Newest">
                  Newest First
                </option>

                <option value="Oldest">
                  Oldest First
                </option>

                <option value="A-Z">
                  A - Z
                </option>

                <option value="Z-A">
                  Z - A
                </option>
              </select>

            </div>

            {filteredQuestions.length === 0 ? (

              <div className="text-center py-10 text-gray-500">
                No Questions Found
              </div>

            ) : (

              <div className="grid gap-5">

                {currentQuestions.map((q) => (

                  <div
                    key={q._id}
                    onClick={() =>
                      navigate(`/questions/${q._id}`)
                    }
                    className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:shadow-lg transition cursor-pointer"
                  >

                    <div className="flex justify-between items-start">

                      <h3 className="text-xl font-bold text-gray-800">
                        {q.title}
                      </h3>

                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {q.difficulty}
                      </span>

                    </div>

                    <p className="mt-3 text-gray-600">
                      {q.question}
                    </p>

                    <div className="mt-4">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {q.category}
                      </span>

                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedQuestion(q);
                          setEditModal(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(q._id);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>

      {showModal && (
        <AddQuestionModal
          closeModal={() =>
            setShowModal(false)
          }
          refreshQuestions={
            fetchQuestions
          }
        />
      )}


      {editModal && selectedQuestion && (

        <EditQuestionModal
          question={selectedQuestion}
          closeModal={() =>
            setEditModal(false)
          }
          refreshQuestions={
            fetchQuestions
          }
        />

      )}


    </div>
  );
}

export default Dashboard;
