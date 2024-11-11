USE `Attendence_System`;

CREATE TABLE subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    semester INT NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    subject_code VARCHAR(10) NOT NULL,
    ACTIVE TINYINT(1) DEFAULT 1,
    UNIQUE KEY unique_subject_code (subject_code)
);

INSERT INTO subjects (semester, subject_name, subject_code) VALUES
-- Semester 1
(1, 'Introduction to Information and Communication Technologies', 'ICT101'),
(1, 'ICT Lab', 'ICT101L'),
(1, 'Programming Fundamentals', 'PF101'),
(1, 'Programming Fundamentals Lab', 'PF101L'),
(1, 'English Composition & Comprehension', 'ENG101'),
(1, 'Pakistan Studies', 'PS101'),
(1, 'Islamic Studies', 'ISL101'),
(1, 'Applied Physics', 'PHY101'),
(1, 'Pre-Math-I', 'MTH101'),

-- Semester 2
(2, 'Object Oriented Programming', 'OOP201'),
(2, 'Object Oriented Programming Lab', 'OOP201L'),
(2, 'Communication & Presentation Skills', 'CPS201'),
(2, 'Intro to Psychology', 'PSY201'),
(2, 'Calculus and Analytical Geometry', 'MTH202'),
(2, 'Discrete Structures', 'DS201'),
(2, 'Social Service', 'SS201'),
(2, 'Pre-Math-II', 'MTH203'),

-- Semester 3
(3, 'Digital Logic Design', 'DLD301'),
(3, 'Digital Logic Design Lab', 'DLD301L'),
(3, 'Data Structures and Algorithms', 'DSA301'),
(3, 'Data Structures and Algorithms Lab', 'DSA301L'),
(3, 'Linear Algebra', 'MTH301'),
(3, 'Professional Practices', 'PP301'),
(3, 'Multi Variable Calculus', 'MVC301'),

-- Semester 4
(4, 'Design & Analysis of Algorithms', 'DAA401'),
(4, 'Software Engineering', 'SE401'),
(4, 'Web Programming', 'WP401'),
(4, 'Web Programming Lab', 'WP401L'),
(4, 'Differential Equations', 'DE401'),
(4, 'Advance OOP', 'OOP402'),
(4, 'Advance OOP Lab', 'OOP402L'),
(4, 'Digital Marketing', 'DM401'),

-- Semester 5
(5, 'Database Systems', 'DBS501'),
(5, 'Database Systems Lab', 'DBS501L'),
(5, 'Computer Organization and Assembly Language', 'COAL501'),
(5, 'Computer Organization and Assembly Language Lab', 'COAL501L'),
(5, 'Operating Systems', 'OS501'),
(5, 'Operating Systems Lab', 'OS501L'),
(5, 'Statistics and Probability', 'STAT501'),
(5, 'Computer Networks', 'CN501'),
(5, 'Computer Networks Lab', 'CN501L'),

-- Semester 6
(6, 'Visual Programming', 'VP601'),
(6, 'Visual Programming Lab', 'VP601L'),
(6, 'Computer Networks', 'CN601'),
(6, 'Computer Networks Lab', 'CN601L'),
(6, 'Artificial Intelligence', 'AI601'),
(6, 'Artificial Intelligence Lab', 'AI601L'),
(6, 'Automata Theory', 'AT601'),
(6, 'Technical Business Writing', 'TBW601'),

-- Semester 7
(7, 'Computer Graphics', 'CG701'),
(7, 'Computer Graphics Lab', 'CG701L'),
(7, 'Software Project Management', 'SPM701'),
(7, 'Software Project Management Lab', 'SPM701L'),
(7, 'Compiler Construction', 'CC701'),
(7, 'Information Security', 'IS701'),
(7, 'Foreign Language (Chinese)', 'CHN701'),

-- Semester 8
(8, 'Mobile Application Development', 'MAD801'),
(8, 'Mobile Application Development Lab', 'MAD801L'),
(8, 'Parallel and Distributed Computing', 'PDC801'),
(8, 'Economics', 'ECO801');