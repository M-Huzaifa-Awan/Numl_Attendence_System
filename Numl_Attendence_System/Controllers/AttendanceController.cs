using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Numl_Attendance_System.Models;
using System.Diagnostics;

namespace Numl_Attendance_System.Controllers
{
    [Authorize] // Base authorization requiring any authenticated user
    public class AttendanceController : Controller
    {
        private readonly IAttendanceService _attendanceService;

        public AttendanceController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [Authorize(Roles = "Teacher,Admin")]
        public IActionResult AttendanceDashBoard()
        {
            return View();
        }

        [HttpGet]
        [Authorize(Roles = "Teacher,Admin,Student")]
        public async Task<JsonResult> GetSubjectsBySemester(int semester)
        {
            var subjects = await _attendanceService.GetSubjectsBySemesterAsync(semester);
            return Json(subjects);
        }

        [HttpGet]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<JsonResult> GetStudentEnrollmentData(string subjectCode, string shift)
        {
            var studentData = await _attendanceService.GetStudentEnrollmentDataAsync(subjectCode, shift);
            return Json(studentData);
        }

        [HttpPost]
        [Authorize(Roles = "Teacher,Admin")]
        public async Task<IActionResult> MarkAttendance([FromBody] AttendanceSubmissionModel model)
        {
            try
            {
                await _attendanceService.MarkAttendanceAsync(
                    model.SubjectCode,
                    model.Slot,
                    model.AttendanceRecords
                );
                return Json(new { success = true });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}