using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Numl_Attendance_System.Models;
using Numl_Attendence_System.Models;

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
        string formattedCNIC = FormatUtilities.FormatCNIC(cnic);
        bool isValid = isTeacher
            ? await _loginService.ValidateTeacherLoginAsync(formattedCNIC, password)
            : await _loginService.ValidateStudentLoginAsync(formattedCNIC, password);

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
    [HttpPost]
    public async Task<IActionResult> ResetPassword(string cnic, string mobileNo, bool isTeacher)
    {
        if (string.IsNullOrEmpty(cnic) || string.IsNullOrEmpty(mobileNo))
        {
            ViewData["ErrorMessage"] = "Please provide both CNIC and mobile number.";
            return View("Login");
        }
        string formattedCNIC = FormatUtilities.FormatCNIC(cnic);
        string formattedMobNo = FormatUtilities.FormatMobileNumber(mobileNo);
        try
        {
            bool isValidUser = isTeacher
                ? await _loginService.CheckTeacherExsistanceAsync(formattedCNIC, formattedMobNo)
                : await _loginService.CheckStudentExsistanceAsync(formattedCNIC, formattedMobNo);
            
            if (isValidUser) 
            {
                ViewData["CNIC"] = formattedCNIC;
                ViewData["IsTeacher"] = isTeacher;

                return View("ResetPassword"); 
            }
            ViewData["ErrorMessage"] = "Invalid user information.";
            return View("Login");
        }
        catch (Exception ex)
        {
            ViewData["ErrorMessage"] = "An error occurred while processing your request. Please try again later.";
            return View("Login");
        }
    }

    [HttpPost]
    public async Task<IActionResult> ConfirmReset(string cnic, string newPassword, string confirmPassword, bool isTeacher)
    {
        if (string.IsNullOrWhiteSpace(newPassword) || string.IsNullOrWhiteSpace(confirmPassword))
        {
            ViewData["ErrorMessage"] = "Invalid input. Please try again.";
            return View("ResetPassword");
        }

        if (newPassword != confirmPassword)
        {
            ViewData["ErrorMessage"] = "Passwords do not match.";
            ViewData["CNIC"] = cnic;
            return View("ResetPassword");
        }

        try
        {
            bool resetSuccessful = isTeacher
                ? await _loginService.ResetTeacherPasswordAsync(cnic, newPassword)
                : await _loginService.ResetStudentPasswordAsync(cnic, newPassword);

            if (resetSuccessful)
            {
                TempData["SuccessMessage"] = "Password reset successfully. Please log in.";
                return View("Login");

            }
            else
            {
                ViewData["ErrorMessage"] = "Failed to reset password. Please try again.";
                ViewData["CNIC"] = cnic;
                ViewData["IsTeacher"] = isTeacher;
                return View("ResetPassword");
            }
        }
        catch (Exception ex)
        {
            ViewData["ErrorMessage"] = "An error occurred. Please try again later.";
            ViewData["CNIC"] = cnic;
            ViewData["IsTeacher"] = isTeacher;
            return View("ResetPassword");
        }
    }

    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Login", "Login");
    }
}