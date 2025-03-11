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
    public async Task<IActionResult> Validatelogin(string email, string password, bool isTeacher)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            ViewData["ErrorMessage"] = "Please provide Email and password.";
            return View("Login");
        }
        string formattedEmail = FormatUtilities.FormatEmail(email);
        bool isValid = isTeacher
            ? await _loginService.ValidateTeacherLoginAsync(formattedEmail, password)
            : await _loginService.ValidateStudentLoginAsync(formattedEmail, password);

        if (isValid)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, email),
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

        ViewData["ErrorMessage"] = "Invalid Email or password.";
        return View("Login");
    }
    [HttpPost]
    public async Task<IActionResult> ResetPassword(string email, string mobileNo, bool isTeacher)
    {
        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(mobileNo))
        {
            ViewData["ErrorMessage"] = "Please provide both Email and mobile number.";
            return View("Login");
        }
        string formattedEmail = FormatUtilities.FormatEmail(email);
        string formattedMobNo = FormatUtilities.FormatMobileNumber(mobileNo);
        try
        {
            bool isValidUser = isTeacher
                ? await _loginService.CheckTeacherExsistanceAsync(formattedEmail, formattedMobNo)
                : await _loginService.CheckStudentExsistanceAsync(formattedEmail, formattedMobNo);
            
            if (isValidUser) 
            {
                ViewData["Email"] = formattedEmail;
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
    public async Task<IActionResult> ConfirmReset(string email, string newPassword, string confirmPassword, bool isTeacher)
    {
        if (string.IsNullOrWhiteSpace(newPassword) || string.IsNullOrWhiteSpace(confirmPassword))
        {
            ViewData["ErrorMessage"] = "Invalid input. Please try again.";
            return View("ResetPassword");
        }

        if (newPassword != confirmPassword)
        {
            ViewData["ErrorMessage"] = "Passwords do not match.";
            ViewData["Email"] = email;
            return View("ResetPassword");
        }

        try
        {
            bool resetSuccessful = isTeacher
                ? await _loginService.ResetTeacherPasswordAsync(email, newPassword)
                : await _loginService.ResetStudentPasswordAsync(email, newPassword);

            if (resetSuccessful)
            {
                TempData["SuccessMessage"] = "Password reset successfully. Please log in.";
                return View("Login");

            }
            else
            {
                ViewData["ErrorMessage"] = "Failed to reset password. Please try again.";
                ViewData["Email"] = email;
                ViewData["IsTeacher"] = isTeacher;
                return View("ResetPassword");
            }
        }
        catch (Exception ex)
        {
            ViewData["ErrorMessage"] = "An error occurred. Please try again later.";
            ViewData["Email"] = email;
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