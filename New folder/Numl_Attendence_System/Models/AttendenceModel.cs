namespace Numl_Attendance_System.Models
{
    public class AttendanceSubmissionModel
    {
        public string SubjectCode { get; set; }
        public int Slot { get; set; }
        public List<AttendanceRecord> AttendanceRecords { get; set; }
    }

    public class AttendanceRecord
    {
        public string RollNo { get; set; }
        public string Status { get; set; }
    }

}
