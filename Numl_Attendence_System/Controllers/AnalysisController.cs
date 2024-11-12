using Microsoft.AspNetCore.Mvc;
using Numl_Attendence_System.Models;
using System.Diagnostics;

namespace Numl_Attendence_System.Controllers
{
    public class AnalysisController : Controller
    {
        public IActionResult AnalysisDashBoard()
        {
            return View();
        }

        private readonly IAttendenceService _attendenceService;

        public AnalysisController(IAttendenceService attendenceService)
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
    }
}
