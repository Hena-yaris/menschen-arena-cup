import React from "react";
import { Outlet, NavLink } from "react-router-dom";
// import { useAdminAuth } from "../hooks/useAdminAuth";

const AdminLayout = () => {
//   const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* LEFT SIDEBAR */}
      <aside className="w-64 bg-gray-800 p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>

        <nav className="space-y-2">
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/teams">Teams</NavLink>
          <NavLink to="/admin/matches">Matches</NavLink>
          <NavLink to="/admin/topscorers">Top Scorers</NavLink>
          <NavLink to="/admin/finals">Final Match</NavLink>
        </nav>

        <button
          onClick={logout}
          className="mt-10 w-full p-2 bg-red-600 rounded"
        >
          Logout
        </button>
      </aside>

      {/* RIGHT MAIN CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
