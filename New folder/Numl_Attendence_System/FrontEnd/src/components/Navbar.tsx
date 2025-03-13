import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-400 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-20">
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white p-2 rounded-lg">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              NUML Attendance System
            </span>
          </motion.div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium">
                {currentDateTime.toLocaleTimeString()} |{" "}
                {currentDateTime.toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center space-x-6">
              <NavLink href="/attendance">Dashboard</NavLink>
              <NavLink href="/analysis">Analytics</NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition-all"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <motion.a
    href={href}
    className="text-gray-600 hover:text-gray-900"
    whileHover={{ scale: 1.1 }}
  >
    {children}
  </motion.a>
);

export default Navbar;
