using Microsoft.AspNetCore.Mvc;
using Numl_Attendence_System.Models;
using System.Diagnostics;

namespace Numl_Attendence_System.Controllers
{
    public class AttendenceController : Controller
    {
        public IActionResult AttendenceDashBoard()
        {
            return View();
        }

        private readonly IAttendenceService _attendenceService;

        public AttendenceController(IAttendenceService attendenceService)
        {
            _attendenceService = attendenceService;
        }

        [HttpGet]
        public async Task<JsonResult> GetSubjectsBySemester(int semester)
        {
            var subjects = await _attendenceService.GetSubjectsBySemesterAsync(semester);
            return Json(subjects);
        }

        [HttpGet]
        public async Task<JsonResult> GetStudentEnrollmentData(string subjectCode, string shift)
        {
            var studentData = await _attendenceService.GetStudentEnrollmentDataAsync(subjectCode, shift);
            return Json(studentData);
        }

        [HttpPost]
        public async Task<IActionResult> MarkAttendance([FromBody] AttendanceSubmissionModel model)
        {
            try
            {
                await _attendenceService.MarkAttendanceAsync(
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
