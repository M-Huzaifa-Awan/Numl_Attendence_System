import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LogOut,
  Clock,
  LayoutDashboard,
  PieChart,

  User,
  Settings,
} from "lucide-react";

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
    <div className="relative">
      <motion.nav
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="bg-gradient-to-r from-blue-900 to-blue-800 border-b border-blue-700/30 shadow-lg w-full mb-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-5 h-5" />
              </div>
              <span className="text-white font-medium">NUML</span>
            </motion.div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: PieChart, label: "Analytics" },
                { icon: Settings, label: "Settings" },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    item.active
                      ? "bg-white/10 text-white"
                      : "text-blue-100/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Time Display */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white"
              >
                <Clock size={14} />
                <span className="text-sm font-medium">
                  {currentDateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </motion.div>

              {/* User Profile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white"
              >
                <span className="text-sm font-medium">John Doe</span>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <User size={14} />
                </div>
              </motion.button>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                <LogOut size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Simplified */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 md:hidden"
          >
            {/* Mobile menu content */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
