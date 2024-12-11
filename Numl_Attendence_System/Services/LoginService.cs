using MySql.Data.MySqlClient;
using System.Data;
public interface ILoginService
{
    Task<bool> ValidateTeacherLoginAsync(string cnic, string password);
    Task<bool> ValidateStudentLoginAsync(string cnic, string password);
    Task<bool> CheckTeacherExsistanceAsync(string cnic, string password);
    Task<bool> CheckStudentExsistanceAsync(string cnic, string password);
    Task<bool> ResetTeacherPasswordAsync(string cnic, string password);
    Task<bool> ResetStudentPasswordAsync(string cnic, string password);

}
public class LoginService : ILoginService
{
    private readonly string _connectionString;

    public LoginService(IConfiguration configuration)
    {
        _connectionString = configuration.GetValue<string>("MySQLConnection");
    }
    public async Task<bool> ValidateTeacherLoginAsync(string cnic, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT Password FROM Teachers_Login WHERE CNIC = @CNIC";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@CNIC", cnic);

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                var hashedPassword = reader.GetString("Password");
                return VerifyPassword(password, hashedPassword);
            }

            return false;
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return false;
        }
    }
    public async Task<bool> ValidateStudentLoginAsync(string cnic, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT Password FROM Students_Login WHERE CNIC = @CNIC";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@CNIC", cnic);

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                var hashedPassword = reader.GetString("Password");
                return VerifyPassword(password, hashedPassword);
            }
            return false;
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return false;
        }
    }
    public async Task<bool> CheckTeacherExsistanceAsync(string cnic, string mobileNo)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "SELECT * FROM employees WHERE CNIC = @CNIC AND mobile_no= @MobNo AND ACTIVE = 1";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@CNIC", cnic);
            command.Parameters.AddWithValue("@MobNo", mobileNo);
            using var reader = await command.ExecuteReaderAsync();
            return await reader.ReadAsync();
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return false;
        }
    }
    public async Task<bool> CheckStudentExsistanceAsync(string cnic, string mobileNo)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "SELECT * FROM students WHERE CNIC = @CNIC AND mobile_no= @MobNo AND ACTIVE = 1";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@CNIC", cnic);
            command.Parameters.AddWithValue("@MobNo", mobileNo);
            using var reader = await command.ExecuteReaderAsync();
            return await reader.ReadAsync();
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return false;
        }
    }
    public async Task<bool> ResetTeacherPasswordAsync(string cnic, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            string hashedPassword = password;

            var query = "UPDATE teachers_login SET password = @Password WHERE CNIC = @CNIC";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Password", hashedPassword);
            command.Parameters.AddWithValue("@CNIC", cnic);

            int rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return false;
        }
    }
    public async Task<bool> ResetStudentPasswordAsync(string cnic, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            string hashedPassword = password;

            var query = "UPDATE students_login SET password = @Password WHERE CNIC = @CNIC";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Password", hashedPassword);
            command.Parameters.AddWithValue("@CNIC", cnic);

            int rowsAffected = await command.ExecuteNonQueryAsync();
            return rowsAffected > 0;
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            return false;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            return false;
        }
    }

    private bool VerifyPassword(string password, string hashedPassword)
    {
        return password == hashedPassword;
    }
}
