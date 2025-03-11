namespace Numl_Attendence_System.Models
{
    public static class FormatUtilities
    {
        public static string FormatEmail(string email)
        {
            email = email.Trim();

            if (!System.Text.RegularExpressions.Regex.IsMatch(email,
                @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
            {
                throw new ArgumentException("Invalid email format");
            }

            return email;
        }

        public static string FormatMobileNumber(string mobileNumber)
        {
            mobileNumber = mobileNumber.Replace("-", "").Trim();

            if (mobileNumber.Length != 11)
            {
                throw new ArgumentException("Mobile number must be 11 digits long");
            }

            if (!mobileNumber.All(char.IsDigit))
            {
                throw new ArgumentException("Mobile number must contain only digits");
            }

            return $"{mobileNumber.Substring(0, 4)}-{mobileNumber.Substring(4)}";
        }
    }
}
