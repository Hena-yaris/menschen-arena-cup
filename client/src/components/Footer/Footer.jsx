import React from "react";
import { Mail, Facebook, Twitter, Instagram } from "lucide-react"; 

function Footer() {
  const currentYear = new Date().getFullYear();

  // Links data for easy maintenance
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Live Matches", href: "/live" },
    { label: "Predictions", href: "/predictions" },
    { label: "Teams", href: "/teams" },
    { label: "Login / Signup", href: "/auth" },
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 py-12 pt-20 border-t border-orange-500/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 🏆 Section 1: Branding & Motto (Moved to column 1, added logo element) */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Menschen Cup
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mt-2">
            Born from chaos. Powered by passion. Fueled by campus bragging
            rights. This is not just a tournament — it’s a whole vibe.
          </p>
          <p className="text-xs text-orange-500 mt-4">
            Tournament Est. {currentYear}
          </p>
        </div>

        {/* 🔗 Section 2: Quick Links (Moved to column 2) */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-orange-400 mb-4 border-b border-orange-400/30 pb-1 inline-block">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="hover:text-orange-300 text-gray-300 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 📣 Section 3: Legal & Resources (New Column) */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-orange-400 mb-4 border-b border-orange-400/30 pb-1 inline-block">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="/rules"
                className="hover:text-orange-300 text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Tournament Rules
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-orange-300 text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-orange-300 text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="/"
                className="hover:text-orange-300 text-gray-300 transition-colors duration-200 cursor-pointer"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* 📧 Section 4: Stay Updated & Social (Moved to column 4) */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-orange-400 mb-4 border-b border-orange-400/30 pb-1 inline-block">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Get match alerts, score updates, and dramatic plot twists right to
            your inbox.
          </p>

          {/* Newsletter Input */}
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 w-full rounded-l-md bg-gray-800 border border-gray-700 text-sm text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
            <button className="p-3 rounded-r-md bg-orange-600 text-white text-sm font-semibold hover:bg-orange-700 transition duration-300 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </button>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-gray-800 text-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white transition duration-300"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-gray-800 text-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white transition duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-gray-800 text-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:text-white transition duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom line (Copyright) --- */}
      <div className="text-center text-xs text-gray-500 mt-12 pt-6 border-t border-gray-800/50">
        © {currentYear} Menschen Arena Cup — “May the best legs win.”
      </div>
    </footer>
  );
}

export default Footer;
