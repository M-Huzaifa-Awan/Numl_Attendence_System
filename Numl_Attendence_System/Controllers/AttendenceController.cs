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
        public async Task<JsonResult> GetStudentEnrollmentData(string subjectCode, string shift)
        {
            var studentData = await _attendenceService.GetStudentEnrollmentDataAsync(subjectCode, shift);
            return Json(studentData);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
