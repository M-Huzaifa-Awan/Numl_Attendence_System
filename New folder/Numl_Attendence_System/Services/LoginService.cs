using MySql.Data.MySqlClient;
using System.Data;
public interface ILoginService
{
    Task<bool> ValidateTeacherLoginAsync(string email, string password);
    Task<bool> ValidateStudentLoginAsync(string email, string password);
    Task<bool> CheckTeacherExsistanceAsync(string email, string password);
    Task<bool> CheckStudentExsistanceAsync(string email, string password);
    Task<bool> ResetTeacherPasswordAsync(string email, string password);
    Task<bool> ResetStudentPasswordAsync(string email, string password);

}
public class LoginService : ILoginService
{
    private readonly string _connectionString;

    public LoginService(IConfiguration configuration)
    {
        _connectionString = configuration.GetValue<string>("MySQLConnection");
    }
    public async Task<bool> ValidateTeacherLoginAsync(string email, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT Password FROM Teachers_Login WHERE Email = @email";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@email", email);

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
    public async Task<bool> ValidateStudentLoginAsync(string email, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT Password FROM Students_Login WHERE Email = @Email";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Email", email);

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
    public async Task<bool> CheckTeacherExsistanceAsync(string email, string mobileNo)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "SELECT * FROM employees WHERE Email = @Email AND mobile_no= @MobNo AND ACTIVE = 1";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Email", email);
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
    public async Task<bool> CheckStudentExsistanceAsync(string email, string mobileNo)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();
            var query = "SELECT * FROM students WHERE Email = @Email AND mobile_no= @MobNo AND ACTIVE = 1";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Email", email);
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
    public async Task<bool> ResetTeacherPasswordAsync(string email, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            string hashedPassword = password;

            var query = "UPDATE teachers_login SET password = @Password WHERE Email = @Email";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Password", hashedPassword);
            command.Parameters.AddWithValue("@Email", email);

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
    public async Task<bool> ResetStudentPasswordAsync(string email, string password)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            string hashedPassword = password;

            var query = "UPDATE students_login SET password = @Password WHERE Email = @Email";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Password", hashedPassword);
            command.Parameters.AddWithValue("@Email", email);

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
