
import {
  LayoutDashboard,
  Brain,
  FileText,
  User,
  LogOut,
  History,
  BarChart3,
  Code2,
  MessageCircle,
   Mic,
  X,
  Sparkles,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuth();

  const linkStyle = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20"
        : "text-slate-300 hover:bg-white/10 hover:text-white"
    }`;

  const handleLinkClick = () => {
    // Mobile par menu select karne ke baad sidebar close
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          w-64
          h-screen
          shrink-0
          bg-slate-950
          border-r border-white/10
          text-white
          flex flex-col
          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles size={22} />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight">
                  AI Prep Pro
                </h1>

                <p className="text-xs text-slate-400">
                  Interview Preparation
                </p>
              </div>
            </div>

            {/* Mobile Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Close menu"
            >
              <X size={21} />
            </button>

          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">

          <p className="px-3 mb-3 text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
            Main Menu
          </p>

          <ul className="space-y-2">

            <li>
              <NavLink
                to="/dashboard"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/ai-generator"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <Brain size={20} />
                <span>AI Generator</span>
              </NavLink>
            </li>

            <li>
  <NavLink
    to="/talk-with-ai"
    onClick={handleLinkClick}
    className={linkStyle}
  >
    <Mic size={20} />
    <span>Talk with AI</span>
  </NavLink>
</li>

            <li>
              <NavLink
                to="/ai-chat"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <MessageCircle size={20} />
                <span>AI Chat</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/interview"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <Brain size={20} />
                <span>Mock Interview</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/resume"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <FileText size={20} />
                <span>Resume Analysis</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/resume-history"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <History size={20} />
                <span>Resume History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/history"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <History size={20} />
                <span>Interview History</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/analytics"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <BarChart3 size={20} />
                <span>Analytics</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/coding"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <Code2 size={20} />
                <span>Coding Interview</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                onClick={handleLinkClick}
                className={linkStyle}
              >
                <User size={20} />
                <span>Profile</span>
              </NavLink>
            </li>

          </ul>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10">

          <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20">
            <div className="flex items-center gap-2">

              <Sparkles
                size={16}
                className="text-indigo-400"
              />

              <div>
                <p className="text-xs font-semibold text-white">
                  AI Powered
                </p>

                <p className="text-[10px] text-slate-400">
                  Prepare smarter. Perform better.
                </p>
              </div>

            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <LogOut size={19} />
            <span>Logout</span>
          </button>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;

