import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FilterCriteria } from "./SecondaryNav";
import { Save, User2, ArrowUpDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Student {
  id: number;
  name: string;
  regNo: string;
  isPresent: boolean;
  session: string;
  semester: string;
  section: string;
  subject: string;
  timeSlot: string;
}

interface StudentTableProps {
  filterCriteria?: FilterCriteria;
}

interface SortConfig {
  key: keyof Student;
  direction: "asc" | "desc";
}

const STUDENTS_PER_PAGE = 30;
const ITEMS_PER_BATCH = 10;

const StudentTable = ({ filterCriteria }: StudentTableProps) => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "John Doe",
      regNo: "2021-CS-01",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "2021-CS-02",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 3,
      name: "Ali Ahmad",
      regNo: "2021-CS-03",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 4,
      name: "Sara Khan",
      regNo: "2021-CS-04",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "B",
      subject: "database",
      timeSlot: "10:00-11:30",
    },
    {
      id: 5,
      name: "Usman Ali",
      regNo: "2021-CS-05",
      isPresent: false,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "networking",
      timeSlot: "11:30-1:00",
    },
    {
      id: 6,
      name: "Fatima Hassan",
      regNo: "2021-CS-06",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "A",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 7,
      name: "Ahmed Khan",
      regNo: "2021-CS-07",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "C",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
    {
      id: 8,
      name: "Zainab Malik",
      regNo: "2021-CS-08",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "C",
      subject: "programming",
      timeSlot: "11:30-1:00",
    },
    {
      id: 9,
      name: "Omar Farooq",
      regNo: "2021-CS-09",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 10,
      name: "Ayesha Tariq",
      regNo: "2021-CS-10",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
    {
      id: 1,
      name: "John Doe",
      regNo: "2021-CS-01",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "2021-CS-02",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 3,
      name: "Ali Ahmad",
      regNo: "2021-CS-03",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 4,
      name: "Sara Khan",
      regNo: "2021-CS-04",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "B",
      subject: "database",
      timeSlot: "10:00-11:30",
    },
    {
      id: 5,
      name: "Usman Ali",
      regNo: "2021-CS-05",
      isPresent: false,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "networking",
      timeSlot: "11:30-1:00",
    },
    {
      id: 6,
      name: "Fatima Hassan",
      regNo: "2021-CS-06",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "A",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 7,
      name: "Ahmed Khan",
      regNo: "2021-CS-07",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "C",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
    {
      id: 8,
      name: "Zainab Malik",
      regNo: "2021-CS-08",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "C",
      subject: "programming",
      timeSlot: "11:30-1:00",
    },
    {
      id: 9,
      name: "Omar Farooq",
      regNo: "2021-CS-09",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 10,
      name: "Ayesha Tariq",
      regNo: "2021-CS-10",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
    {
      id: 1,
      name: "John Doe",
      regNo: "2021-CS-01",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "2021-CS-02",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 3,
      name: "Ali Ahmad",
      regNo: "2021-CS-03",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "programming",
      timeSlot: "8:30-10:00",
    },
    {
      id: 4,
      name: "Sara Khan",
      regNo: "2021-CS-04",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "B",
      subject: "database",
      timeSlot: "10:00-11:30",
    },
    {
      id: 5,
      name: "Usman Ali",
      regNo: "2021-CS-05",
      isPresent: false,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "networking",
      timeSlot: "11:30-1:00",
    },
    {
      id: 6,
      name: "Fatima Hassan",
      regNo: "2021-CS-06",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "A",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 7,
      name: "Ahmed Khan",
      regNo: "2021-CS-07",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "C",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
    {
      id: 8,
      name: "Zainab Malik",
      regNo: "2021-CS-08",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "C",
      subject: "programming",
      timeSlot: "11:30-1:00",
    },
    {
      id: 9,
      name: "Omar Farooq",
      regNo: "2021-CS-09",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 10,
      name: "Ayesha Tariq",
      regNo: "2021-CS-10",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
    {
      id: 9,
      name: "Omar Farooq",
      regNo: "2021-CS-19",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "B",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
    {
      id: 10,
      name: "Ayesha Tariq",
      regNo: "2021-CS-20",
      isPresent: false,
      session: "2023-24",
      semester: "1",
      section: "A",
      subject: "networking",
      timeSlot: "10:00-11:30",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_BATCH);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Reset animation state for table rows
  const [tableKey, setTableKey] = useState(0);

  // Add loading state for page transitions
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // First apply filters and sorting
  const filteredStudents = students.filter((student) => {
    if (!filterCriteria) return true;
    return Object.entries(filterCriteria).every(([key, value]) => {
      if (!value) return true;
      return student[key as keyof Student] === value;
    });
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    // Special handling for boolean values
    if (key === "isPresent") {
      return direction === "asc"
        ? Number(a.isPresent) - Number(b.isPresent)
        : Number(b.isPresent) - Number(a.isPresent);
    }

    // Handle string comparison
    const valueA = String(a[key]).toLowerCase();
    const valueB = String(b[key]).toLowerCase();

    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  // Update pagination logic
  const totalStudents = sortedStudents.length;
  const totalPages = Math.ceil(totalStudents / STUDENTS_PER_PAGE);
  const pageStart = (currentPage - 1) * STUDENTS_PER_PAGE;
  const pageEnd = Math.min(pageStart + STUDENTS_PER_PAGE, totalStudents);

  // Get current page students and handle last page case
  const currentPageStudents = sortedStudents.slice(pageStart, pageEnd);
  const maxVisibleItems = currentPageStudents.length;

  // Reset visible items when changing pages
  useEffect(() => {
    setVisibleItems(Math.min(ITEMS_PER_BATCH, maxVisibleItems));
    setSelectedRows([]);
  }, [currentPage, maxVisibleItems]);

  // Update load more logic
  useEffect(() => {
    if (inView && visibleItems < maxVisibleItems) {
      setVisibleItems((prev) =>
        Math.min(prev + ITEMS_PER_BATCH, maxVisibleItems)
      );
    }
  }, [inView, maxVisibleItems]);

  // Get currently visible students
  const visibleStudents = currentPageStudents.slice(0, visibleItems);
  const hasMoreInPage = visibleItems < maxVisibleItems;

  // Handle page change with complete reset
  const handlePageChange = (page: number) => {
    setIsPageTransitioning(true);
    setTableKey((prev) => prev + 1); // Force table re-render
    setCurrentPage(page);
    setVisibleItems(0); // Reset to 0 first
    setSelectedRows([]);
    setSortConfig(null);

    // Two-step loading for smoother transitions
    setTimeout(() => {
      setVisibleItems(ITEMS_PER_BATCH);
      setIsPageTransitioning(false);
    }, 100);
  };

  // Update select all to work with current page
  const handleSelectAll = () => {
    setSelectedRows((current) =>
      current.length === currentPageStudents.length
        ? []
        : currentPageStudents.map((s) => s.id)
    );
  };

  // Reset states when filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
    setVisibleItems(ITEMS_PER_BATCH);
    setSelectedRows([]);
    setSortConfig(null);
  }, [filterCriteria]);

  const handleRowSelect = (id: number) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    );
  };

  const handleSort = (key: keyof Student) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSaveChanges = () => {
    // Simulate API call
    console.log("Saving changes:", students);
    setHasChanges(false);
  };

  const toggleAttendance = (ids: number[], present: boolean) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        ids.includes(student.id) ? { ...student, isPresent: present } : student
      )
    );
    setHasChanges(true);
    // Clear selection after changing status
    setSelectedRows([]);
  };

  if (!filterCriteria || Object.values(filterCriteria).every((v) => v === "")) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center space-y-4"
      >
        <User2 size={48} className="mx-auto text-gray-400" />
        <h3 className="text-xl font-semibold text-gray-800">
          No Students Loaded
        </h3>
        <p className="text-gray-500">
          Please select filters and click Load to view students
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-6"
    >
      {/* Action Bar */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg border border-blue-700/30">
        <div className="p-4 flex items-center justify-between">
          <span className="text-white/90 font-medium">
            Selected:{" "}
            <strong className="text-white">{selectedRows.length}</strong> of{" "}
            <strong className="text-white">{filteredStudents.length}</strong>{" "}
            students
          </span>
          <AnimatePresence mode="wait">
            {selectedRows.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleAttendance(selectedRows, true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-lg font-medium shadow-lg hover:bg-green-600 transition-all"
                >
                  Mark Selected Present
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleAttendance(selectedRows, false)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium shadow-lg hover:bg-red-600 transition-all"
                >
                  Mark Selected Absent
                </motion.button>
              </motion.div>
            ) : (
              <div />
            )}
          </AnimatePresence>
        </div>
      </div>
      {/* Table */}
      <motion.div
        key={tableKey}
        className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
            <tr>
              <th className="w-px px-6 py-4">
                <input
                  type="checkbox"
                  checked={
                    selectedRows.length === currentPageStudents.length &&
                    currentPageStudents.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-blue-700 text-blue-600 focus:ring-blue-500 bg-blue-800/50"
                />
              </th>
              {[
                { key: "regNo", label: "Roll No" },
                { key: "name", label: "Name" },
                { key: "isPresent", label: "Status" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof Student)}
                  className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer group hover:bg-blue-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {label}
                    <div
                      className={`transition-opacity ${
                        sortConfig?.key === key
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      }`}
                    >
                      {sortConfig?.key === key ? (
                        sortConfig.direction === "asc" ? (
                          "↑"
                        ) : (
                          "↓"
                        )
                      ) : (
                        <ArrowUpDown size={14} />
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {isPageTransitioning ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"
                  />
                </td>
              </tr>
            ) : (
              visibleStudents.map((student, index) => (
                <motion.tr
                  key={`${tableKey}-${student.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                  className={`transition-colors ${
                    selectedRows.includes(student.id) ? "bg-blue-50" : ""
                  }`}
                  // Add ref to the second-to-last item
                  ref={
                    index === visibleStudents.length - 2
                      ? loadMoreRef
                      : undefined
                  }
                >
                  <td className="w-px px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(student.id)}
                      onChange={() => handleRowSelect(student.id)}
                      className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-blue-900">
                      {student.regNo}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center text-white font-medium text-sm shadow-lg">
                        {student.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        toggleAttendance([student.id], !student.isPresent)
                      }
                      className={`px-4 py-1.5 rounded-full text-xs font-medium shadow-sm ${
                        student.isPresent
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                          : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                      }`}
                    >
                      {student.isPresent ? "Present" : "Absent"}
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>

        {/* Loading indicator - Only show when not transitioning pages */}
        {!isPageTransitioning && hasMoreInPage && (
          <div
            ref={loadMoreRef}
            className="p-4 flex justify-center text-gray-400"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
            />
          </div>
        )}
      </motion.div>
      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {pageStart + 1} to {pageStart + visibleStudents.length} of{" "}
          {totalStudents} students (Page {currentPage} of {totalPages})
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(page)}
                className={`min-w-[32px] h-8 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? "bg-blue-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </motion.button>
            ))}
          </div>
        )}
      </div>
      {/* Save Changes Button */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveChanges}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-lg font-medium shadow-xl hover:shadow-2xl transition-all"
          >
            <Save size={18} />
            Save Changes
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StudentTable;
