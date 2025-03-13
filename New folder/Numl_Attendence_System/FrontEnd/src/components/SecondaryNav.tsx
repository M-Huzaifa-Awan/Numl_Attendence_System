import { motion } from "framer-motion";

interface SecondaryNavProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SecondaryNav = ({ searchQuery, setSearchQuery }: SecondaryNavProps) => {
  const dropdownClass =
    "w-full bg-white px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Academic Session
            </label>
            <select className={dropdownClass}>
              <option value="">Select Session</option>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Semester
            </label>
            <select className={dropdownClass}>
              <option value="">Select Semester</option>
              <option value="1">1st Semester</option>
              <option value="2">2nd Semester</option>
              <option value="3">3rd Semester</option>
            </select>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Section</label>
            <select className={dropdownClass}>
              <option value="">Select Section</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <select className={dropdownClass}>
              <option value="">Select Subject</option>
              <option value="programming">Programming</option>
              <option value="database">Database</option>
              <option value="networking">Networking</option>
            </select>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Time Slot
            </label>
            <select className={dropdownClass}>
              <option value="">Select Slot</option>
              <option value="8:30-10:00">8:30 - 10:00</option>
              <option value="10:00-11:30">10:00 - 11:30</option>
              <option value="11:30-1:00">11:30 - 1:00</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            Load Students
          </motion.button>
        </div>
      </div>

      <div className="mt-6 relative">
        <input
          type="text"
          placeholder="Search students by name or registration number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 bg-white rounded-xl border-2 border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none pl-12 transition-all"
        />
        <svg
          className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default SecondaryNav;
