// src/components/Navbar/AdminSidebar.jsx (MODIFIED)

import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  ClipboardList,
  TrendingUp,
  LogOut,
  Trophy,
  Zap,
} from "lucide-react";

// Receive props from AdminLayout
const AdminSidebar = ({ isMobileOpen, onToggle }) => {
  const navItems = [
    // ... (Your navItems array remains the same)
    { to: "/admin/teams", icon: Users, label: "Manage Teams & Setup" },
    {
      to: "/admin/matches",
      icon: ClipboardList,
      label: "Match Control (Scoring)",
    },
    { to: "/admin/schedule", icon: TrendingUp, label: "Schedule Matches" },
    { to: "/admin/reset", icon: TrendingUp, label: "Dangerous Zone" },
    { to: "/admin/knockout", icon: Zap, label: "Knockout Stage" },
  ];

  const activeClasses =
    "bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/50";
  const defaultClasses =
    "text-gray-300 hover:bg-gray-800 hover:text-orange-400";

  return (
    // Key Changes:
    // 1. Mobile: fixed, full height, Z-index 40, sliding using translate-x.
    // 2. Desktop (md:): static, always visible (translate-x-0), height controlled by min-h-screen on parent.
    <div
      className={`
        w-64 bg-gray-950/90 border-r border-orange-500/30 
         min-h-screen transition-transform duration-300 ease-in-out z-40
        ${isMobileOpen ? "translate-x-0 fixed" : "-translate-x-full fixed"} 
        md:translate-x-0 md:static md:flex-shrink-0 md:min-h-screen
        flex flex-col pt-8
      `}
    >
      {/* Logo/Title */}
      <div className="px-6 pb-6 border-b border-gray-800 mb-6">
        <Trophy className="text-orange-500 w-8 h-8 mx-auto mb-2" />
        <h2 className="text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Control Room
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2 px-4" onClick={onToggle}>
        {" "}
        {/* Closes sidebar after link click */}
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition duration-200 text-sm ${
                isActive ? activeClasses : defaultClasses
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => {
            console.log("Logging out..."); /* Add your logout logic here */
          }}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-900/40 transition duration-200 text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
export default AdminSidebar;
