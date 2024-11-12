USE `Attendance_System`;

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(10) NOT NULL,
    subject_code VARCHAR(10) NOT NULL,
    DATE DATE NOT NULL,
    slot1 VARCHAR(1),
    slot2 VARCHAR(1),
    -- Creating an index for common queries
    INDEX idx_date (DATE),
    -- Ensuring no duplicate attendance records for same enrollment on same date
    UNIQUE KEY unique_attendance (roll_no, DATE)
);