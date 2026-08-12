import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 overflow-auto">

        <Navbar />

        <div className="p-8">

          {/* Profile Header */}

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-lg">

            <div className="flex items-center gap-6">

              <img
                src="https://i.pravatar.cc/150"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white"
              />

              <div>

                <h1 className="text-4xl font-bold">
                  {user?.name || "Saif Ali"}
                </h1>

                <p className="text-lg mt-2">
                  MERN Stack Developer
                </p>

                <p className="opacity-90">
                  {user?.email || "saif@example.com"}
                </p>

              </div>

            </div>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-gray-500">
                Interviews Completed
              </h3>

              <h1 className="text-3xl font-bold mt-2">
                25
              </h1>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-gray-500">
                Average Score
              </h3>

              <h1 className="text-3xl font-bold mt-2">
                88%
              </h1>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-gray-500">
                ATS Resume Score
              </h3>

              <h1 className="text-3xl font-bold mt-2">
                92
              </h1>
            </div>

          </div>

          {/* Personal Information */}

          <div className="bg-white p-8 rounded-2xl shadow-lg mt-8">

            <h2 className="text-2xl font-bold mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500">
                  Full Name
                </p>

                <h3 className="font-semibold text-lg">
                  {user?.name || "Saif Ali"}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Email
                </p>

                <h3 className="font-semibold text-lg">
                  {user?.email || "saif@example.com"}
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Role
                </p>

                <h3 className="font-semibold text-lg">
                  MERN Stack Developer
                </h3>
              </div>

              <div>
                <p className="text-gray-500">
                  Experience
                </p>

                <h3 className="font-semibold text-lg">
                  Fresher
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;