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
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              NUML Attendance
            </span>
          </motion.div>

          <div className="flex items-center space-x-6">
            <div className="text-gray-600 text-sm">
              {currentDateTime.toLocaleDateString()} -{" "}
              {currentDateTime.toLocaleTimeString()}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <NavLink href="/attendance">Attendance Dashboard</NavLink>
              <NavLink href="/analysis">Analysis Dashboard</NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
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
