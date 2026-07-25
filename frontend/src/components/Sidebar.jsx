import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

  const { logout } = useAuth();

  return (

    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        BizTrack
      </div>

      <nav className="flex flex-col p-4 space-y-2">

        <Link
          to="/dashboard"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/create-business"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Business
        </Link>

        <Link
          to="/create-transaction"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Transactions
        </Link>

        <button
          onClick={logout}
          className="mt-10 bg-red-600 hover:bg-red-700 rounded p-3"
        >
          Logout
        </button>

      </nav>

    </aside>

  );

}

export default Sidebar;