using MySql.Data.MySqlClient;
using System.Data;
public interface ILoginService
{
    Task<bool> ValidateTeacherLoginAsync(string cnic, string password);
    Task<bool> ValidateStudentLoginAsync(string cnic, string password);
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

            var query = "SELECT PasswordHash FROM Teachers WHERE CNIC = @CNIC";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@CNIC", cnic);

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                var hashedPassword = reader.GetString("PasswordHash");
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

            var query = "SELECT PasswordHash FROM Students WHERE CNIC = @CNIC";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@CNIC", cnic);

            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                var hashedPassword = reader.GetString("PasswordHash");
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
    private bool VerifyPassword(string password, string hashedPassword)
    {
        return password == hashedPassword;
    }
}
