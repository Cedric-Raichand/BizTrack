import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdBusiness,
  MdAttachMoney,
  MdAssessment,
  MdSettings,
  MdLogout,
} from "react-icons/md";

import { useAuth } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col">

      <div className="border-b border-slate-700 px-6 py-6">

        <h1 className="text-3xl font-bold text-white">
          BizTrack
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Business Finance Manager
        </p>

      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">

        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/businesses"
          className={linkClass}
        >
          <MdBusiness size={22} />
          Businesses
        </NavLink>

        <NavLink
          to="/transactions"
          className={linkClass}
        >
          <MdAttachMoney size={22} />
          Transactions
        </NavLink>

        <NavLink
          to="/reports"
          className={linkClass}
        >
          <MdAssessment size={22} />
          Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
        >
          <MdSettings size={22} />
          Settings
        </NavLink>

      </nav>

      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 transition rounded-lg py-3 text-white"
        >
          <MdLogout size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;