import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Trophy, LogOut } from "lucide-react";


function AdminNavbar() {
  const navigate = useNavigate();

  const baseClasses =
    "px-3 py-2 rounded-md font-medium text-sm md:text-base transition-all";

  const activeClasses = "text-orange-400 font-semibold bg-orange-500/10";

  return (
    <nav
      className="
        backdrop-blur-md bg-gray-950
        border-b border-orange-500/30 
        py-3 px-4 md:px-8 
        flex flex-wrap justify-between items-center gap-4
        sticky top-0 z-50 shadow-xl
      "
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Trophy className="text-orange-400 w-7 h-7 drop-shadow" />

        <NavLink
          to="/"
          className="
            font-extrabold text-xl md:text-3xl 
            text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-400 to-orange-500
          "
        >
          Menschen-Cup
        </NavLink>
      </div>

      {/* Always-visible Links (desktop + mobile) */}
      <div
        className="
          flex flex-wrap items-center gap-3 md:gap-6 
          text-white 
        "
      >
        <NavLink
          to="/addteam"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : "hover:bg-orange-500/20"
            }`
          }
        >
          Add Team
        </NavLink>

        <NavLink
          to="/teamslist"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : "hover:bg-orange-500/20"
            }`
          }
        >
          Groups
        </NavLink>

        <NavLink
          to="/addmatch"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : "hover:bg-orange-500/20"
            }`
          }
        >
          Add Match
        </NavLink>

        <NavLink
          to="/fixtures"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : "hover:bg-orange-500/20"
            }`
          }
        >
          Fixtures
        </NavLink>

        <NavLink
          to="/knockout"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive ? activeClasses : "hover:bg-orange-500/20"
            }`
          }
        >
          Knockout
        </NavLink>

        {/* Avatar + Logout */}
        <div className="flex items-center gap-3 ml-2">
          <NavLink to="admin/setting">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.username}&background=ff8a00&color=000`}
              alt="avatar"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-orange-500 shadow-md capitalize"
            />
          </NavLink>

          <button
            onClick={(e) => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="
              flex items-center gap-2 
              text-orange-400 hover:text-orange-300 
              text-sm md:text-base transition-all cursor-pointer
            "
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
