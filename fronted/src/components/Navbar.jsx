import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <div className="bg-white shadow p-5 flex justify-between">

      <h1 className="font-bold text-2xl">
        AI Prep Pro
      </h1>

      <div className="flex items-center gap-4">

        <Bell size={22} />

        <span className="font-semibold">
          {user?.name || "Guest"}
        </span>

        <img
          src="https://i.pravatar.cc/40"
          alt=""
          className="rounded-full"
        />

      </div>

    </div>
  );
}

export default Navbar;