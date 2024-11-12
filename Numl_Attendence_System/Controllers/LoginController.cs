using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, cnic),
                new Claim(ClaimTypes.Role, isTeacher ? "Teacher" : "Student")
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                ExpiresUtc = DateTimeOffset.UtcNow.AddHours(1)
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,new ClaimsPrincipal(claimsIdentity),authProperties);

            return RedirectToAction(
                isTeacher ? "AttendanceDashboard" : "AnalysisDashboard",
                isTeacher ? "Attendance" : "Analysis"
            );
        }

        ViewData["ErrorMessage"] = "Invalid CNIC or password.";
        return View("Login");
    }

    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Login", "Login");
    }
}