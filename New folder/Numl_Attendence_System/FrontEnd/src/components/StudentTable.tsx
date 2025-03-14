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
  // Generate 45 students for semester 2
  const generateDummyStudents = () => {
    const names = [
      "Ali Ahmad",
      "Sara Khan",
      "Usman Ali",
      "Fatima Hassan",
      "Ahmed Khan",
      "Zainab Malik",
      "Omar Farooq",
      "Ayesha Tariq",
      "Hassan Ali",
      "Maryam Shah",
      "Bilal Khan",
      "Sana Malik",
      "Kamran Ahmed",
      "Nadia Hassan",
      "Faisal Raza",
    ];

    const baseStudents: Student[] = [];
    let id = 1;

    // Generate 15 students for each subject in semester 2
    ["oop", "dld", "calculus"].forEach((subject) => {
      for (let i = 0; i < 15; i++) {
        const regNo = `2021-CS-${String(id).padStart(3, "0")}`;
        baseStudents.push({
          id: id++,
          name: names[Math.floor(Math.random() * names.length)],
          regNo,
          isPresent: Math.random() > 0.3,
          session: "2023-24",
          semester: "2",
          section: "Combined",
          subject,
          timeSlot: ["8:30-10:00", "10:00-11:30", "11:30-1:00"][
            Math.floor(Math.random() * 3)
          ],
        });
      }
    });

    // Add first semester students with M1/M2 sections
    const firstSemStudents: Student[] = [
      {
        id: id++,
        name: "John Doe",
        regNo: "2021-CS-046",
        isPresent: true,
        session: "2023-24",
        semester: "1",
        section: "M1",
        subject: "programming",
        timeSlot: "8:30-10:00",
      },
      {
        id: id++,
        name: "Jane Smith",
        regNo: "2021-CS-047",
        isPresent: false,
        session: "2023-24",
        semester: "1",
        section: "M2",
        subject: "database",
        timeSlot: "10:00-11:30",
      },
    ];

    return [...baseStudents, ...firstSemStudents];
  };

  const [students, setStudents] = useState<Student[]>(generateDummyStudents());
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_BATCH);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [tableKey, setTableKey] = useState(0);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    rootMargin: "100px",
  });

  // Simplified filter logic
  const filteredStudents = students.filter((student) => {
    if (!filterCriteria) return true;

    // Subject code mapping
    const subjectMapping: { [key: string]: string } = {
      CS101: "programming",
      CS102: "database",
      CS201: "oop",
      CS202: "dld",
      MTH101: "calculus",
    };

    // Match each criteria
    const matchSemester =
      !filterCriteria.semester || student.semester === filterCriteria.semester;

    const matchShift =
      !filterCriteria.shift ||
      (filterCriteria.shift === "Morning" &&
        (student.timeSlot.startsWith("8:30") ||
          student.timeSlot.startsWith("10:00"))) ||
      (filterCriteria.shift === "Evening" &&
        student.timeSlot.startsWith("11:30"));

    const matchTimeSlot =
      !filterCriteria.timeSlot ||
      (filterCriteria.timeSlot === "1" && student.timeSlot === "8:30-10:00") ||
      (filterCriteria.timeSlot === "2" && student.timeSlot === "10:00-11:30") ||
      (filterCriteria.timeSlot === "3" && student.timeSlot === "11:30-1:00");

    const matchSection =
      !filterCriteria.section || student.section === filterCriteria.section;

    const matchSubject =
      !filterCriteria.subjectCode ||
      student.subject === subjectMapping[filterCriteria.subjectCode];

    // Debug output
    console.log("Filtering student:", student.name, {
      matchSemester,
      matchShift,
      matchTimeSlot,
      matchSection,
      matchSubject,
      studentSubject: student.subject,
      filterSubject: filterCriteria.subjectCode,
      mappedSubject: subjectMapping[filterCriteria.subjectCode],
    });

    return (
      matchSemester &&
      matchShift &&
      matchTimeSlot &&
      matchSection &&
      matchSubject
    );
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
    <motion.div className="space-y-6">
      {/* Action Bar - Responsive */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl shadow-lg border border-blue-700/30">
        <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-white/90 font-medium text-sm sm:text-base">
            Selected:{" "}
            <strong className="text-white">{selectedRows.length}</strong> of{" "}
            <strong className="text-white">{filteredStudents.length}</strong>{" "}
            students
          </span>

          <AnimatePresence mode="wait">
            {selectedRows.length > 0 && (
              <motion.div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <motion.button
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium"
                  onClick={() => toggleAttendance(selectedRows, true)}
                >
                  Mark Present
                </motion.button>
                <motion.button
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium"
                  onClick={() => toggleAttendance(selectedRows, false)}
                >
                  Mark Absent
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Table Container - Responsive */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
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
                    className="group hover:bg-gray-50"
                  >
                    {/* Checkbox column */}
                    <td className="w-px pl-4 pr-2 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(student.id)}
                        onChange={() => handleRowSelect(student.id)}
                        className="rounded border-blue-300 text-blue-600"
                      />
                    </td>

                    {/* Roll No column */}
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-blue-900">
                        {student.regNo}
                      </div>
                    </td>

                    {/* Name column */}
                    <td className="px-2 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-900 to-blue-700 flex-shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-3 font-medium truncate max-w-[150px] sm:max-w-none">
                          {student.name}
                        </div>
                      </div>
                    </td>

                    {/* Status column */}
                    <td className="px-2 pr-4 py-4 whitespace-nowrap">
                      <motion.button
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.isPresent
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                        onClick={() =>
                          toggleAttendance([student.id], !student.isPresent)
                        }
                      >
                        {student.isPresent ? "Present" : "Absent"}
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination - Responsive */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500 text-center sm:text-left">
          Showing {pageStart + 1} to {pageStart + visibleStudents.length} of{" "}
          {totalStudents}
        </div>
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
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
    </motion.div>
  );
};

export default StudentTable;
