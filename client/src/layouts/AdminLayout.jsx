

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Navbar/AdminSidebar";
import { Menu, X } from "lucide-react"; // Import icons for the toggle button

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const { logout } = useAdminAuth(); // Uncomment when auth is ready

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen flex  bg-gray-900 text-white">
      {/* 1. MOBILE TOGGLE BUTTON (Visible only below md breakpoint) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-orange-600 text-white shadow-xl hover:bg-orange-700 transition"
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* 2. SIDEBAR COMPONENT (Passed state and toggle handler) */}
      <AdminSidebar
        isMobileOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(false)}
      />

      {/* 3. MOBILE BACKDROP (Visible when sidebar is open on mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* 4. RIGHT MAIN CONTENT */}
      {/* Key Change: On desktop (md:), we add padding-left equal to the sidebar width (w-64)
         and on mobile (sm:), we add padding-top to clear the toggle button. */}
      <main
        className="flex-1 p-6 transition-all duration-300 
                   md:ml-10 md:p-8 
                   pt-20 sm:pt-6" // pt-20 on mobile to clear the fixed toggle button
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
