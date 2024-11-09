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

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
