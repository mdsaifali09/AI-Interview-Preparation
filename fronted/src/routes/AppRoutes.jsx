
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import QuestionDetails from "../pages/QuestionDetails";
import AIGenerator from "../pages/AIGenerator";
import MockInterview from "../pages/MockInterview";
import InterviewHistory from "../pages/InterviewHistory";
import InterviewDetails from "../pages/InterviewDetails";
import Analytics from "../pages/Analytics";
import ResumeAnalysis from "../pages/ResumeAnalysis";
import ResumeHistory from "../pages/ResumeHistory";
import ResumeReport from "../pages/ResumeReport";

import CodingInterview from "../pages/CodingInterview";
import CodingHistory from "../pages/CodingHistory";
import QuestionBank from "../pages/QuestionBank";

import CodingSubmissionHistory from "../pages/CodingSubmissionHistory";
import CodingSubmissionDetails from "../pages/CodingSubmissionDetails";

import CodingAnalytics from "../pages/CodingAnalytics";

import AIImageGenerator from "../pages/AIImageGenerator";
import AIChat from "../pages/AIChat";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* Interview */}

        <Route
          path="/questions/:id"
          element={<QuestionDetails />}
        />

        <Route
          path="/ai-generator"
          element={<AIGenerator />}
        />

        <Route
          path="/interview"
          element={<MockInterview />}
        />

        <Route
          path="/history"
          element={<InterviewHistory />}
        />

        <Route
          path="/history/:id"
          element={<InterviewDetails />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />


        {/* Resume */}

        <Route
          path="/resume"
          element={<ResumeAnalysis />}
        />

        <Route
          path="/resume-history"
          element={<ResumeHistory />}
        />

        <Route
          path="/resume-history/:id"
          element={<ResumeReport />}
        />


        {/* Coding Interview */}

        <Route
          path="/coding"
          element={<CodingInterview />}
        />

        {/* Question Bank */}

        <Route
          path="/question-bank"
          element={<QuestionBank />}
        />

        {/* Coding Submission History */}

        <Route
          path="/coding-history"
          element={<CodingSubmissionHistory />}
        />

        {/* Coding Submission Details */}

        <Route
          path="/coding-submission/:id"
          element={<CodingSubmissionDetails />}
        />

        <Route
           path="/coding-analytics"
          element={<CodingAnalytics />}
       />


       <Route
           path="/ai-image-generator"
           element={<AIImageGenerator />}
           />

      <Route
           path="/ai-chat"
          element={<AIChat />}
          />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;

