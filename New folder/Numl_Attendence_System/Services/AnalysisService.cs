using MySql.Data.MySqlClient;
using System.Data;
using Numl_Attendance_System.Models;
public interface IAnalysisService
{
    Task<List<Student>> GetAttendanceDataAsync(string subjectCode, string shift);
}

public class AnalysisService : IAnalysisService
{
    private readonly string _connectionString;

    public AnalysisService(IConfiguration configuration)
    {
        _connectionString = configuration.GetValue<string>("MySQLConnection");
    }
    public async Task<List<Student>> GetAttendanceDataAsync(string subjectCode, string shift)
    {
        var students = new List<Student>();
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            using var command = new MySqlCommand("GetAttendancePercentage", connection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("p_subject_code", subjectCode);
            command.Parameters.AddWithValue("p_shift", shift);

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                string attendanceString = reader.GetDecimal("attendance_percentage").ToString("F2");
                students.Add(new Student
                {
                    RollNo = reader.GetString("roll_no"),
                    Name = reader.GetString("student_name"),
                    AttendancePercentage = attendanceString
                });
            }
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            throw;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"General Error: {ex.Message}");
            throw;
        }
        return students;
    }

}
