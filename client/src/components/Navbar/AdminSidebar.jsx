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

const AdminSidebar = () => {
  const navItems = [
    { to: "/admin/teams", icon: Users, label: "Manage Teams & Setup" },
    {
      to: "/admin/matches",
      icon: ClipboardList,
      label: "Match Control (Scoring)",
    },
    { to: "/admin/stats", icon: TrendingUp, label: "Player Stats" },
    { to: "/admin/knockout", icon: Zap, label: "Knockout Stage" },
  ];

  const activeClasses =
    "bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/50";
  const defaultClasses =
    "text-gray-300 hover:bg-gray-800 hover:text-orange-400";

  return (
    <div className="w-64 bg-gray-950/90 border-r border-orange-500/30 fixed md:relative h-full flex flex-col pt-8 ">
      {/* Logo/Title */}
      <div className="px-6 pb-6 border-b border-gray-800 mb-6">
        <Trophy className="text-orange-500 w-8 h-8 mx-auto mb-2" />
        <h2 className="text-xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Control Room
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2 px-4">
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
          onClick={() => console.log("Logging out...")}
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
