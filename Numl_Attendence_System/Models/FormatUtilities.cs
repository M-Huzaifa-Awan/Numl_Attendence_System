namespace Numl_Attendence_System.Models
{
    public static class FormatUtilities
    {
        public static string FormatCNIC(string cnic)
        {
            cnic = cnic.Replace("-", "").Trim();

            if (cnic.Length != 13)
            {
                throw new ArgumentException("CNIC must be 13 digits long");
            }

            if (!cnic.All(char.IsDigit))
            {
                throw new ArgumentException("CNIC must contain only digits");
            }

            return $"{cnic.Substring(0, 5)}-{cnic.Substring(5, 7)}-{cnic.Substring(12, 1)}";
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
