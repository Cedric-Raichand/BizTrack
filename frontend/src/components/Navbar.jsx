import { useAuth } from "../context/AuthContext";
import { MdNotifications, MdMenu } from "react-icons/md";

import ThemeToggle from "./ThemeToggle";

function Navbar({ onMenuClick = () => {} }) {
  const { user } = useAuth();

  return (
    <header className="navbar sticky top-0 z-20 flex items-center justify-between gap-3 bg-white px-4 py-3 shadow sm:px-6 lg:px-8 lg:py-5">

      <div className="flex min-w-0 items-center gap-3">

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1 rounded-lg p-2 text-gray-700 hover:bg-gray-200/70 lg:hidden"
        >
          <MdMenu size={26} />
        </button>

        <div className="min-w-0">

          <h2 className="truncate text-lg font-bold text-gray-800 sm:text-xl lg:text-2xl">

            Welcome back, {user?.name} 👋

          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">

            Manage your business finances efficiently

          </p>

        </div>

      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-4">

        <ThemeToggle />

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-2 text-gray-600 hover:text-blue-600"
        >

          <MdNotifications size={26} />

        </button>

        <div className="hidden text-right md:block">

          <p className="font-semibold text-gray-800">

            {user?.name}

          </p>

          <p className="text-sm text-gray-500">

            {user?.email}

          </p>

        </div>

      </div>

    </header>
  );
}

export default Navbar;