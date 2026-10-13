import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock page scroll behind the open menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      {/* min-w-0 stops wide tables from stretching the page sideways */}
      <div className="flex-1 min-w-0">
        <Navbar onMenuClick={() => setMenuOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;