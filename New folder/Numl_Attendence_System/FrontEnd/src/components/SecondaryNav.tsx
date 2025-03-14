import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

// Updated interfaces to match backend models
interface Subject {
  name: string;
  code: string;
}

interface Student {
  rollNo: string;
  name: string;
}

export interface FilterCriteria {
  semester: string;
  shift: string;
  subjectCode: string;
  timeSlot: string;
  section: string;
}

interface SecondaryNavProps {
  onLoadStudents: (filters: FilterCriteria) => void;
}

const SecondaryNav = ({ onLoadStudents }: SecondaryNavProps) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    semester: "",
    shift: "",
    subjectCode: "",
    timeSlot: "",
    section: "",
  });

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update mock subjects data
  const mockSubjects: { [key: string]: Subject[] } = {
    "1": [
      { name: "Programming Fundamentals", code: "CS101" },
      { name: "Database Systems", code: "CS102" },
      { name: "Calculus", code: "MTH101" },
    ],
    "2": [
      { name: "Object Oriented Programming", code: "CS201" },
      { name: "Digital Logic Design", code: "CS202" },
      { name: "Linear Algebra", code: "MTH201" },
    ],
  };

  // Section mapping for first semester only
  const firstSemesterSections = ["M1", "M2"];

  // Simulate API call when semester changes
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!filters.semester) {
        setSubjects([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Use mock data instead of actual API call
        setSubjects(mockSubjects[filters.semester] || []);

        // Actual API call (commented for now)
        /*
        const response = await axios.get(`/api/attendance/subjects/${filters.semester}`);
        setSubjects(response.data);
        */
      } catch (err) {
        setError("Failed to load subjects");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [filters.semester]);

  const handleChange = (field: keyof FilterCriteria, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [field]: value };

      // Reset dependent fields and set section based on semester
      if (field === "semester") {
        newFilters.subjectCode = "";
        // Set Combined for other semesters automatically
        newFilters.section = newFilters.semester === "1" ? "" : "Combined";
      }

      // Debug output
      console.log("Filter changed:", field, value, newFilters);

      return newFilters;
    });
  };

  const dropdownClass =
    "w-full bg-white px-3 py-2 rounded-lg border-2 border-gray-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm disabled:bg-gray-50 disabled:cursor-not-allowed";

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl shadow-sm border border-gray-100"
    >
      <div className="flex flex-wrap items-center gap-4">
        {/* Semester Selection */}
        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.semester}
            onChange={(e) => handleChange("semester", e.target.value)}
          >
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}th Semester
              </option>
            ))}
          </select>
        </div>

        {/* Section Selection - Only show for first semester */}
        {filters.semester === "1" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 min-w-[150px]"
          >
            <select
              className={dropdownClass}
              value={filters.section}
              onChange={(e) => handleChange("section", e.target.value)}
            >
              <option value="">Select Section</option>
              <option value="M1">Section M1</option>
              <option value="M2">Section M2</option>
            </select>
          </motion.div>
        )}

        {/* Shift Selection */}
        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.shift}
            onChange={(e) => handleChange("shift", e.target.value)}
          >
            <option value="">Select Shift</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        {/* Subject Selection */}
        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.subjectCode}
            onChange={(e) => handleChange("subjectCode", e.target.value)}
            disabled={isLoading || !filters.semester}
          >
            <option value="">
              {isLoading ? "Loading subjects..." : "Select Subject"}
            </option>
            {subjects.map((subject) => (
              <option key={subject.code} value={subject.code}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Time Slot Selection */}
        <div className="flex-1 min-w-[150px]">
          <select
            className={dropdownClass}
            value={filters.timeSlot}
            onChange={(e) => handleChange("timeSlot", e.target.value)}
          >
            <option value="">Select Time Slot</option>
            <option value="1">8:30 - 10:00</option>
            <option value="2">10:00 - 11:30</option>
            <option value="3">11:30 - 1:00</option>
          </select>
        </div>

        {/* Load Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onLoadStudents(filters)}
          disabled={
            !filters.semester ||
            !filters.shift ||
            !filters.subjectCode ||
            !filters.timeSlot ||
            (filters.semester === "1" && !filters.section) || // Add section validation for first semester
            isLoading
          }
          className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg font-medium shadow-md transition-all
            ${
              !filters.semester ||
              !filters.shift ||
              !filters.subjectCode ||
              !filters.timeSlot ||
              (filters.semester === "1" && !filters.section) ||
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-lg"
            }`}
        >
          {isLoading ? "Loading..." : "Load"}
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-red-500 text-sm"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SecondaryNav;
