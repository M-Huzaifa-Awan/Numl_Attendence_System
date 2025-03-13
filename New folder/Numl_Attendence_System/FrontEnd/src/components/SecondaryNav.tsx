import { motion } from "framer-motion";

interface SecondaryNavProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SecondaryNav = ({ searchQuery, setSearchQuery }: SecondaryNavProps) => {
  const dropdownClass =
    "px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-48";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <select className={dropdownClass}>
            <option value="">Select Session</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
          </select>

          <select className={dropdownClass}>
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
          </select>
        </div>

        <div className="space-y-4">
          <select className={dropdownClass}>
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>

          <select className={dropdownClass}>
            <option value="">Select Subject</option>
            <option value="programming">Programming</option>
            <option value="database">Database</option>
            <option value="networking">Networking</option>
          </select>
        </div>

        <div className="space-y-4">
          <select className={dropdownClass}>
            <option value="">Select Slot</option>
            <option value="8:30-10:00">8:30 - 10:00</option>
            <option value="10:00-11:30">10:00 - 11:30</option>
            <option value="11:30-1:00">11:30 - 1:00</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </motion.button>
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />
      </div>
    </div>
  );
};

export default SecondaryNav;
