import { useAuth } from "../context/AuthContext";
import { MdNotifications } from "react-icons/md";

function Navbar() {

  const { user } = useAuth();


  return (

    <header className="bg-white shadow px-8 py-5 flex justify-between items-center">


      <div>

        <h2 className="text-2xl font-bold text-gray-800">

          Welcome back, {user?.name} 👋

        </h2>


        <p className="text-gray-500 text-sm">

          Manage your business finances efficiently

        </p>

      </div>





      <div className="flex items-center gap-5">


        <button className="text-gray-600 hover:text-blue-600">

          <MdNotifications size={28}/>

        </button>




        <div className="text-right">

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