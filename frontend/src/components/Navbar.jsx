import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-blue-600">
        BizTrack
      </h1>

      <div className="text-right">
        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.email}
        </p>
      </div>

    </header>
  );
}

export default Navbar;