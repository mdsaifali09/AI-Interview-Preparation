import {
  Bell,
  Search,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

function Navbar({
  sidebarOpen = false,
  setSidebarOpen = () => {},
}) {
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LEFT ================= */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="
              lg:hidden
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-700
              shadow-sm
              hover:bg-indigo-50
              hover:text-indigo-600
              hover:border-indigo-200
              transition-all duration-200
            "
            aria-label={
              sidebarOpen
                ? "Close sidebar"
                : "Open sidebar"
            }
          >
            {sidebarOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>

          {/* Logo */}
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              bg-gradient-to-br
              from-indigo-600
              to-purple-600
              shadow-lg
              shadow-indigo-200
            "
          >
            <Sparkles
              size={20}
              className="text-white"
            />
          </div>

          {/* Brand */}
          <div>
            <h1
              className="
                text-lg
                sm:text-xl
                font-bold
                tracking-tight
                text-slate-900
              "
            >
              AI Prep Pro
            </h1>

            <p
              className="
                hidden
                sm:block
                text-xs
                text-slate-500
              "
            >
              Your AI Interview Assistant
            </p>
          </div>

        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex items-center gap-3 sm:gap-5">

          {/* Search - Desktop Only */}
          <div
            className="
              hidden
              lg:flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              py-2.5
            "
          >
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-40
                bg-transparent
                text-sm
                outline-none
                placeholder:text-slate-400
              "
            />
          </div>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-xl
              border border-slate-200
              bg-white
              text-slate-600
              shadow-sm
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-600
              transition-all duration-200
            "
          >
            <Bell size={19} />

            {/* Notification Dot */}
            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
                ring-2
                ring-white
              "
            />
          </button>

          {/* User */}
          <div
            className="
              flex
              items-center
              gap-3
              border-l
              border-slate-200
              pl-3
              sm:pl-5
            "
          >

            {/* User Name */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || "Guest"}
              </p>

              <p className="text-xs text-slate-500">
                Candidate
              </p>
            </div>

            {/* Profile Image */}
            <div
              className="
                h-10
                w-10
                overflow-hidden
                rounded-full
                border-2
                border-indigo-100
                bg-indigo-50
                shadow-sm
              "
            >
              <img
                src={
                  user?.profileImage ||
                  "https://i.pravatar.cc/100"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;