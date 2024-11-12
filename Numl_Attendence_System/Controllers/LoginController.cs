using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

public class LoginController : Controller
{
    private readonly ILoginService _loginService;

    public LoginController(ILoginService loginService)
    {
        _loginService = loginService;
    }
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Validatelogin(string cnic, string password, bool isTeacher)
    {
        if (string.IsNullOrEmpty(cnic) || string.IsNullOrEmpty(password))
        {
            ViewData["ErrorMessage"] = "Please provide CNIC and password.";
            return View("Login");
        }

        bool isValid = isTeacher
            ? await _loginService.ValidateTeacherLoginAsync(cnic, password)
            : await _loginService.ValidateStudentLoginAsync(cnic, password);

        if (isValid)
        {
            return RedirectToAction(isTeacher ? "AttendanceDashboard" : "AnalysisDashboard", "Attendance");
        }

        ViewData["ErrorMessage"] = "Invalid CNIC or password."; 
        return View("Login");
    }
    public IActionResult Logout()
    {
        //HttpContext.Session.Clear();
        return RedirectToAction("Login", "Login");
    }
}
