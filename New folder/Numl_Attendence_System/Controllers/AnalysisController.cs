using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Numl_Attendance_System.Models;
using System.Diagnostics;

namespace Numl_Attendance_System.Controllers
{
    [Authorize(Roles = "Teacher,Admin,Student")]
    public class AnalysisController : Controller
    {
        public IActionResult AnalysisDashBoard()
        {
            return View();
        }

        private readonly IAnalysisService _analysisService;

        public AnalysisController(IAnalysisService analysisService)
        {
            _analysisService = analysisService;
        }

        [HttpGet]
        public async Task<JsonResult> GetAttendanceData(string subjectCode, string shift)
        {
            var studentData = await _analysisService.GetAttendanceDataAsync(subjectCode, shift);
            return Json(studentData);
        }
    }
}
