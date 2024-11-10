using MySql.Data.MySqlClient;
using System.Data;
using Numl_Attendence_System.Models;
public interface ITeacherService
{
    Task<List<Subject>> GetSubjectsBySemesterAsync(int semester);
}

public class TeacherService : ITeacherService
{
    private readonly string _connectionString;

    public TeacherService(IConfiguration configuration)
    {
        _connectionString = configuration.GetValue<string>("MySQLConnection");
    }

    public async Task<List<Subject>> GetSubjectsBySemesterAsync(int semester)
    {
        var subjects = new List<Subject>();

        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = "SELECT subject_name, subject_code FROM Subjects WHERE Semester = @Semester";
            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@Semester", semester);

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                subjects.Add(new Subject
                {
                    Name = reader.GetString("subject_name"),
                    Code = reader.GetString("subject_code")
                });
            }
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        return subjects;
    }

}
