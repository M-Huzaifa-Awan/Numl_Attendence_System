import { motion } from "framer-motion";
import { useState } from "react";

export interface FilterCriteria {
  session: string;
  semester: string;
  section: string;
  subject: string;
  timeSlot: string;
}

interface SecondaryNavProps {
  onLoadStudents: (filters: FilterCriteria) => void;
}

const SecondaryNav = ({ onLoadStudents }: SecondaryNavProps) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    session: "",
    semester: "",
    section: "",
    subject: "",
    timeSlot: "",
  });

  const handleChange = (field: keyof FilterCriteria, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const isAnyFieldFilled = Object.values(filters).some((value) => value !== "");

  const dropdownClass =
    "w-full bg-white px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.session}
            onChange={(e) => handleChange("session", e.target.value)}
          >
            <option value="">Select Session</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.semester}
            onChange={(e) => handleChange("semester", e.target.value)}
          >
            <option value="">Select Semester</option>
            <option value="1">1st Semester</option>
            <option value="2">2nd Semester</option>
            <option value="3">3rd Semester</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.section}
            onChange={(e) => handleChange("section", e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="programming">Programming</option>
            <option value="database">Database</option>
            <option value="networking">Networking</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.timeSlot}
            onChange={(e) => handleChange("timeSlot", e.target.value)}
          >
            <option value="">Select Slot</option>
            <option value="8:30-10:00">8:30 - 10:00</option>
            <option value="10:00-11:30">10:00 - 11:30</option>
            <option value="11:30-1:00">11:30 - 1:00</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onLoadStudents(filters)}
          disabled={!isAnyFieldFilled}
          className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md transition-all ${
            !isAnyFieldFilled
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg"
          }`}
        >
          Load
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SecondaryNav;
