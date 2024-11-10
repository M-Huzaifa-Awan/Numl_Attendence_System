using Microsoft.AspNetCore.Mvc;
using Numl_Attendence_System.Models;
using System.Diagnostics;

namespace Numl_Attendence_System.Controllers
{
    public class TeacherController : Controller
    {
        public IActionResult TeacherDashBoard()
        {
            return View();
        }

        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        public async Task<JsonResult> GetSubjectsBySemester(int semester)
        {
            var subjects = await _teacherService.GetSubjectsBySemesterAsync(semester);
            return Json(subjects);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
