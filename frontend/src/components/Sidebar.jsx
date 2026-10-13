import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdBusiness,
  MdAttachMoney,
  MdAssessment,
  MdSettings,
  MdLogout,
  MdClose,
} from "react-icons/md";

import { useAuth } from "../context/AuthContext";

function Sidebar({ open = false, onClose = () => {} }) {
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
    <>
      {/* Dark backdrop behind the menu on phones/tablets */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

    <aside
      className={`sidebar fixed inset-y-0 left-0 z-40 flex w-64 max-w-[85vw] flex-col overflow-y-auto bg-slate-900 transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-w-none lg:shrink-0 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >

      <div className="flex items-start justify-between border-b border-slate-700 px-6 py-6">

        <div>

          <h1 className="text-3xl font-bold text-white">
            BizTrack
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Business Finance Manager
          </p>

        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-lg p-1 text-gray-400 hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <MdClose size={26} />
        </button>

      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">

        <NavLink
          to="/dashboard"
          className={linkClass}
          onClick={onClose}
        >
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/businesses"
          className={linkClass}
          onClick={onClose}
        >
          <MdBusiness size={22} />
          Businesses
        </NavLink>

        <NavLink
          to="/transactions"
          className={linkClass}
          onClick={onClose}
        >
          <MdAttachMoney size={22} />
          Transactions
        </NavLink>

        <NavLink
          to="/reports"
          className={linkClass}
          onClick={onClose}
        >
          <MdAssessment size={22} />
          Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={linkClass}
          onClick={onClose}
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
    </>
  );
}

export default Sidebar;