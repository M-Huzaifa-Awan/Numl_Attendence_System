import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LogOut,
  Clock,
  LayoutDashboard,
  PieChart,
  User,
  Settings,
  Menu,
} from "lucide-react";
import LogoSrc from "../assets/numl-logo-8250E1FBC3-seeklogo.com.svg";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-50">
      <motion.nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section - Updated with bigger size */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <img
                  src={LogoSrc}
                  alt="NUML Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-lg font-medium text-white">NUML</span>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: PieChart, label: "Analytics" },
                { icon: Settings, label: "Settings" },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    item.active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Time */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white">
                <Clock size={16} />
                <span className="font-medium">
                  {currentDateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              {/* User Profile */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white">
                <span className="font-medium">John Doe</span>
                <User size={18} />
              </div>

              {/* Logout */}
              <button className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600">
                <LogOut size={18} />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-blue-800 shadow-lg md:hidden"
          >
            <div className="p-4 space-y-3">
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: PieChart, label: "Analytics" },
                { icon: Settings, label: "Settings" },
              ].map((item) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg ${
                    item.active
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
