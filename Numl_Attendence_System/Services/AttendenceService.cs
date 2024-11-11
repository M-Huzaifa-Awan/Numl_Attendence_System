using MySql.Data.MySqlClient;
using System.Data;
using Numl_Attendence_System.Models;
public interface IAttendenceService
{
    Task<List<Subject>> GetSubjectsBySemesterAsync(int semester);
    Task<List<Student>> GetStudentEnrollmentDataAsync(string subjectCode, string shift);
}

public class AttendenceService : IAttendenceService
{
    private readonly string _connectionString;

    public AttendenceService(IConfiguration configuration)
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
    public async Task<List<Student>> GetStudentEnrollmentDataAsync(string subjectCode, string shift)
    {
        var students = new List<Student>();
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            var query = @"SELECT s.roll_no, s.student_name 
                     FROM students s 
                     INNER JOIN student_enrollments se ON s.roll_no = se.roll_no 
                     WHERE se.subject_code = @subjectCode 
                     AND s.shift = @shift";

            using var command = new MySqlCommand(query, connection);
            command.Parameters.AddWithValue("@subjectCode", subjectCode);
            command.Parameters.AddWithValue("@shift", shift);

            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                students.Add(new Student
                {
                    RollNo = reader.GetString("roll_no"),    
                    Name = reader.GetString("student_name")          
                });
            }
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
        }
        catch (Exception sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
        }

        return students;
    }


}
