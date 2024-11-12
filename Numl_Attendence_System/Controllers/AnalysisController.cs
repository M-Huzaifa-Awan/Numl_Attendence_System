using Microsoft.AspNetCore.Mvc;
using Numl_Attendance_System.Models;
using System.Diagnostics;

namespace Numl_Attendance_System.Controllers
{
    public class AnalysisController : Controller
    {
        public IActionResult AnalysisDashBoard()
        {
            return View();
        }

        private readonly IAttendanceService _attendanceService;

        public AnalysisController(IAttendanceService attendanceService)
        {
            _attendanceService = attendanceService;
        }

        [HttpGet]
        public async Task<JsonResult> GetAttendanceData(string subjectCode, string shift)
        {
            var studentData = await _attendanceService.GetStudentEnrollmentDataAsync(subjectCode, shift);
            return Json(studentData);
        }
    }
}
