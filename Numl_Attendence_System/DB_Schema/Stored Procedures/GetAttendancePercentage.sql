DELIMITER //

CREATE PROCEDURE GetAttendancePercentage(
    IN p_subject_code VARCHAR(10),
    IN p_shift VARCHAR(10)
)
BEGIN
    WITH AttendanceCount AS (
        SELECT 
            roll_no,
            COUNT(*) AS total_possible_classes,
            SUM(CASE 
                WHEN slot1 = 'P' THEN 1 
                ELSE 0 
            END + 
            CASE 
                WHEN slot2 = 'P' THEN 1 
                ELSE 0 
            END) AS present_classes
        FROM attendance
        WHERE subject_code = p_subject_code
        GROUP BY roll_no
    )
    SELECT 
        s.roll_no,
        s.student_name,
        CAST(CAST(ac.present_classes AS FLOAT) * 100 / 
             NULLIF((ac.total_possible_classes * 2), 0) AS DECIMAL(5,2)) AS attendance_percentage
    FROM students s
    INNER JOIN student_enrollments se ON s.roll_no = se.roll_no
    LEFT JOIN AttendanceCount ac ON s.roll_no = ac.roll_no
    WHERE se.subject_code = p_subject_code
    AND s.shift = p_shift;
END //

DELIMITER ;