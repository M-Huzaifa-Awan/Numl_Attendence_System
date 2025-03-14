import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FilterCriteria } from "./SecondaryNav";
import { Save, User2, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

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
      id: 11,
      name: "Hamza Malik",
      regNo: "2021-CS-11",
      isPresent: true,
      session: "2023-24",
      semester: "2",
      section: "C",
      subject: "programming",
      timeSlot: "11:30-1:00",
    },
    {
      id: 12,
      name: "Mahnoor Ahmed",
      regNo: "2021-CS-12",
      isPresent: true,
      session: "2023-24",
      semester: "1",
      section: "B",
      subject: "database",
      timeSlot: "8:30-10:00",
    },
  ]);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const handleRowSelect = (id: number) => {
    setSelectedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows((current) =>
      current.length === filteredStudents.length
        ? []
        : filteredStudents.map((s) => s.id)
    );
  };

  const toggleAttendance = (ids: number[], present: boolean) => {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        ids.includes(student.id) ? { ...student, isPresent: present } : student
      )
    );
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Simulate API call
    console.log("Saving changes:", students);
    setHasChanges(false);
  };

  // Reset selected rows when filter criteria changes
  useEffect(() => {
    setSelectedRows([]);
  }, [filterCriteria]);

  const filteredStudents = students.filter((student) => {
    if (!filterCriteria) return true;

    return Object.entries(filterCriteria).every(([key, value]) => {
      if (!value) return true; // Skip empty filters
      return student[key as keyof Student] === value;
    });
  });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * studentsPerPage,
    currentPage * studentsPerPage
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedRows([]); // Clear selection when changing pages
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
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-900 to-blue-800">
            <tr>
              <th className="w-px px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedRows.length === filteredStudents.length}
                  onChange={handleSelectAll}
                  className="rounded border-blue-700 text-blue-600 focus:ring-blue-500 bg-blue-800/50"
                />
              </th>
              {["Roll No", "Name", "Status"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedStudents.map((student) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "#f8fafc" }}
                className={`transition-colors ${
                  selectedRows.includes(student.id) ? "bg-blue-50" : ""
                }`}
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
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * studentsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * studentsPerPage,
                  filteredStudents.length
                )}{" "}
                of {filteredStudents.length} students
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={16} />
                </motion.button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
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
