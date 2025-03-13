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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={markAllPresent}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Mark All Present
        </motion.button>

        <div className="text-sm text-gray-500">
          Total Students: {students.length} | Present:{" "}
          {students.filter((s) => s.isPresent).length}
        </div>
      </div>

      <motion.div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "#f9fafb" }}
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleAttendance(student.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      student.isPresent
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
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
      </motion.div>
    </div>
  );
};

export default StudentTable;
