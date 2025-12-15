import { NavLink } from "react-router-dom";
import { Trophy } from "lucide-react";

const PublicNavbar = () => {
  // Define navigation links
  const navLinks = [
    { to: "/standing", label: "Standings" },
    { to: "/playersLeader", label: "playersLeaderBoard" },
    { to: "/fixtures", label: "Fixtures" },
    { to: "/matchstatus", label: "Today's Match" },
    { to: "/knockout", label: "Knockout" },
  ];

  const activeLinkClasses = "text-orange-400 border-b-2 border-orange-400 pb-1";
  const defaultLinkClasses =
    "text-gray-300 hover:text-orange-300 transition-colors duration-200";

  return (
    <nav
      className="
        backdrop-blur-md bg-gray-950/80
        border-b border-orange-500/30 
        py-3 px-4 md:px-8 
        flex flex-col md:flex-row justify-between items-start md:items-center gap-4
        sticky top-0 z-50 shadow-xl
      "
    >
      {/* 🏆 Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Trophy className="text-orange-400 w-7 h-7 drop-shadow" />

        <NavLink
          to="/"
          className="
            font-extrabold text-xl md:text-3xl 
            text-transparent bg-clip-text 
            bg-gradient-to-r from-yellow-400 to-orange-500
            leading-none
          "
        >
          Menschen Arena Cup
        </NavLink>
      </div>

      {/* 🔗 Menu (Sliding Nav on Mobile, Scrollbar Hidden) */}
      <div
        className="
          w-full overflow-x-auto whitespace-nowrap 
          flex gap-6 text-sm md:text-base font-medium 
          md:w-auto md:overflow-visible md:justify-end
          no-scrollbar  
        "
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `inline-block px-1 pb-1 ${
                // Added pb-1 here for alignment
                isActive ? activeLinkClasses : defaultLinkClasses
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default PublicNavbar;

/*
--- IMPORTANT ---
To make the "no-scrollbar" class work, you need to add this CSS to your global stylesheet (e.g., index.css or global.css):

.no-scrollbar::-webkit-scrollbar {
    display: none; // Hides scrollbar for Chrome, Safari and Opera 
}

.no-scrollbar {
    -ms-overflow-style: none;  // IE and Edge
    scrollbar-width: none;  // Firefox
}
*/
