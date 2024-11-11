USE `Attendence_System`;

DROP TABLE IF EXISTS temp_attendance;
CREATE TABLE temp_attendance (
    roll_no VARCHAR(20),
    subject_code VARCHAR(20),
    slot INT,
    STATUS VARCHAR(1),
    INDEX idx_temp_lookup (roll_no, subject_code, slot)
);