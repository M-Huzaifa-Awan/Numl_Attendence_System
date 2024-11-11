DELIMITER $$
USE `attendence_system`$$
DROP PROCEDURE IF EXISTS `mark_attendance_bulk`$$
CREATE PROCEDURE `mark_attendance_bulk`()
BEGIN
    DECLARE v_today DATE;
    
    -- Get today's date
    SET v_today = CURDATE();
    
    -- Insert new records for students who don't have an attendance record today
    INSERT INTO attendance (roll_no, subject_code, DATE, slot1, slot2)
    SELECT 
        t.roll_no,
        t.subject_code,
        v_today,
        IF(t.slot = 1, t.status, NULL),
        IF(t.slot = 2, t.status, NULL)
    FROM temp_attendance t
    WHERE NOT EXISTS (
        SELECT 1 
        FROM attendance a 
        WHERE a.roll_no = t.roll_no 
        AND a.subject_code = t.subject_code 
        AND a.DATE = v_today
    );
    
    UPDATE attendance a
    INNER JOIN temp_attendance t ON 
        a.roll_no = t.roll_no 
        AND a.subject_code = t.subject_code
        AND a.DATE = v_today
        AND t.slot = 1
    SET a.slot1 = t.status;
    
    UPDATE attendance a
    INNER JOIN temp_attendance t ON 
        a.roll_no = t.roll_no 
        AND a.subject_code = t.subject_code
        AND a.DATE = v_today
        AND t.slot = 2
    SET a.slot2 = t.status;
    
    TRUNCATE TABLE temp_attendance;
    
END$$
DELIMITER ;