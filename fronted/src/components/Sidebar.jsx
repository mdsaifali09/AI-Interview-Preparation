import {
  LayoutDashboard,
  Brain,
  FileText,
  User,
  LogOut,
  History,
  BarChart3,
  Code2,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-5 flex flex-col">

      <h1 className="text-3xl font-bold mb-10 text-center">
        AI Prep Pro
      </h1>

      <nav className="flex-1">

        <ul className="space-y-3">

          <li>
            <NavLink to="/dashboard" className={linkStyle}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/ai-generator" className={linkStyle}>
              <Brain size={20} />
              <span>AI Generator</span>
            </NavLink>
          </li>

       
        <NavLink
  to="/ai-chat"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-semibold"
        : "text-white-700 hover:bg-indigo-50 hover:text-indigo-600"
    }`
  }
>
  <span className="text-xl">🤖</span>
  <span>AI Chat</span>
</NavLink>



          <li>
            <NavLink to="/interview" className={linkStyle}>
              <Brain size={20} />
              <span>Mock Interview</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/resume" className={linkStyle}>
              <FileText size={20} />
              <span>Resume Analysis</span>
            </NavLink>
          </li>


          <li>

  <NavLink
    to="/resume-history"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
  >

    📄 Resume History

  </NavLink>

</li>

          

          <li>
  <NavLink
    to="/history"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
  >
    <History size={20} />
    Interview History
  </NavLink>

<li>
  <NavLink
    to="/analytics"
    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
  >
    <BarChart3 size={20} />
    Analytics
  </NavLink>
</li>





<li>

<NavLink

to="/coding"

className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"

>

<Code2 size={20}/>

Coding Interview

</NavLink>

</li>


</li>






          <li>
            <NavLink to="/profile" className={linkStyle}>
              <User size={20} />
              <span>Profile</span>
            </NavLink>
          </li>

        </ul>

      </nav>

      <button
        onClick={logout}
        className="mt-8 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-xl transition"
      >
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;