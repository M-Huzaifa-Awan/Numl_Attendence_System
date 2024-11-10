DELIMITER //

CREATE PROCEDURE mark_attendance(
    IN p_roll_no VARCHAR(20),
    IN p_subject_code VARCHAR(20),
    IN p_slot INT,
    IN p_status VARCHAR(1)  -- 'P' or 'A'
)
BEGIN
    DECLARE v_today DATE;
    DECLARE v_exists INT;
    
    -- Get today's date
    SET v_today = CURDATE();
    
    -- Check if a record already exists for the student, subject, and current date
    SELECT COUNT(*) INTO v_exists
    FROM attendance
    WHERE roll_no = p_roll_no
      AND subject_code = p_subject_code
      AND DATE = v_today;
      
    -- If no record exists, insert a new one
    IF v_exists = 0 THEN
        INSERT INTO attendance (roll_no, subject_code, DATE, slot1, slot2)
        VALUES (p_roll_no, p_subject_code, v_today, 
                IF(p_slot = 1, p_status, NULL), 
                IF(p_slot = 2, p_status, NULL));
    ELSE
        -- If record exists, update the appropriate slot
        IF p_slot = 1 THEN
            UPDATE attendance
            SET slot1 = p_status
            WHERE roll_no = p_roll_no
              AND subject_code = p_subject_code
              AND DATE = v_today;
        ELSEIF p_slot = 2 THEN
            UPDATE attendance
            SET slot2 = p_status
            WHERE roll_no = p_roll_no
              AND subject_code = p_subject_code
              AND DATE = v_today;
        ELSE
            -- Raise an error for invalid slot number
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Invalid slot number. Use 1 or 2';
        END IF;
    END IF;
      
END //

DELIMITER ;
CALL mark_attendance('CS-68', 'VP601', 1, 'P');
CALL mark_attendance('CS-68', 'VP601', 2, 'A');