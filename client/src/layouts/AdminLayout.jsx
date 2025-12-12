import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import AdminSidebar from "../components/Navbar/AdminSidebar";
// import { useAdminAuth } from "../hooks/useAdminAuth";

const AdminLayout = () => {
//   const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
        <AdminSidebar/>
      {/* RIGHT MAIN CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
