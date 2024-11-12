USE `Attendance_System`;

CREATE TABLE student_enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(10) NOT NULL,
    subject_code VARCHAR(10) NOT NULL,
    FOREIGN KEY (roll_no) REFERENCES students(roll_no),
    FOREIGN KEY (subject_code) REFERENCES subjects(subject_code)
);

INSERT INTO student_enrollments (roll_no, subject_code)
SELECT 
    s.roll_no,
    sub.subject_code
FROM students s
CROSS JOIN subjects sub
WHERE s.ACTIVE = 1
AND sub.semester = 6
AND NOT EXISTS (
    SELECT 1 
    FROM student_enrollments se 
    WHERE se.roll_no = s.roll_no 
    AND se.subject_code = sub.subject_code
);