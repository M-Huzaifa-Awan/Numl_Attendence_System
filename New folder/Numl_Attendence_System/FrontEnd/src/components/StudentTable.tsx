import { motion } from "framer-motion";
import { useState } from "react";

interface Student {
  id: number;
  name: string;
  regNo: string;
  attendance: number;
  isPresent: boolean;
  lastAttendance?: string;
}

interface StudentTableProps {
  searchQuery: string;
}

const StudentTable = ({ searchQuery }: StudentTableProps) => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: "John Doe",
      regNo: "2021-CS-01",
      attendance: 85,
      isPresent: true,
      lastAttendance: "2024-01-20",
    },
    {
      id: 2,
      name: "Jane Smith",
      regNo: "2021-CS-02",
      attendance: 92,
      isPresent: false,
      lastAttendance: "2024-01-20",
    },
  ]);

  const toggleAttendance = (id: number) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, isPresent: !student.isPresent }
          : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents(students.map((student) => ({ ...student, isPresent: true })));
  };

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={markAllPresent}
            className="bg-gradient-to-r from-green-500 to-emerald-400 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Mark All Present
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            Export Attendance
          </motion.button>
        </div>

        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-lg">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm font-medium text-indigo-600">
            Present: {students.filter(s => s.isPresent).length}/{students.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Reg No",
                "Attendance %",
                "Status",
                "Last Attendance",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "#fafafa" }}
                className="transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {student.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.regNo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      student.attendance >= 90
                        ? "text-green-600"
                        : student.attendance >= 75
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {student.attendance}%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleAttendance(student.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      student.isPresent
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {student.isPresent ? "Present" : "Absent"}
                  </motion.button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {student.lastAttendance}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View History
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default StudentTable;
