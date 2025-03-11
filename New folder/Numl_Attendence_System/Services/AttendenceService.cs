using MySql.Data.MySqlClient;
using System.Data;
using Numl_Attendance_System.Models;
public interface IAttendanceService
{
    Task<List<Subject>> GetSubjectsBySemesterAsync(int semester);
    Task<List<Student>> GetStudentEnrollmentDataAsync(string subjectCode, string shift);
    Task MarkAttendanceAsync(string subjectCode, int slot, List<AttendanceRecord> attendanceRecords);
}

public class AttendanceService : IAttendanceService
{
    private readonly string _connectionString;

    public AttendanceService(IConfiguration configuration)
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

    public async Task MarkAttendanceAsync(string subjectCode, int slot, List<AttendanceRecord> attendanceRecords)
    {
        try
        {
            using var connection = new MySqlConnection(_connectionString);
            await connection.OpenAsync();

            using var transaction = await connection.BeginTransactionAsync();
            try
            {
                var bulkInsertQuery = @"
                INSERT INTO temp_attendance (roll_no, subject_code, slot, status) 
                VALUES (@roll_no, @subject_code, @slot, @status)";

                using (var bulkCommand = new MySqlCommand(bulkInsertQuery, connection, transaction))
                {
                    bulkCommand.Parameters.Add(new MySqlParameter("@roll_no", MySqlDbType.VarChar, 20));
                    bulkCommand.Parameters.Add(new MySqlParameter("@subject_code", MySqlDbType.VarChar, 20));
                    bulkCommand.Parameters.Add(new MySqlParameter("@slot", MySqlDbType.Int32));
                    bulkCommand.Parameters.Add(new MySqlParameter("@status", MySqlDbType.VarChar, 1));

                    foreach (var record in attendanceRecords)
                    {
                        bulkCommand.Parameters["@roll_no"].Value = record.RollNo;
                        bulkCommand.Parameters["@subject_code"].Value = subjectCode;
                        bulkCommand.Parameters["@slot"].Value = slot;
                        bulkCommand.Parameters["@status"].Value = record.Status;

                        await bulkCommand.ExecuteNonQueryAsync();
                    }
                }

                using (var spCommand = new MySqlCommand("mark_attendance_bulk", connection, transaction))
                {
                    spCommand.CommandType = CommandType.StoredProcedure;
                    await spCommand.ExecuteNonQueryAsync();
                }

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
        catch (MySqlException sqlEx)
        {
            Console.WriteLine($"Database Error: {sqlEx.Message}");
            throw;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw;
        }
    }

}
