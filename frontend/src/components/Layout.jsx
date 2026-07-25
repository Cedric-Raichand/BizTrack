import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

  return (

    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  );

}

export default Layout;