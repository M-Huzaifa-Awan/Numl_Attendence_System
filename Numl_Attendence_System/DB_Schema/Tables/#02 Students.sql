CREATE DATABASE `Attendence_System`;

USE `Attendence_System`;

CREATE TABLE students (
    roll_no VARCHAR(10) PRIMARY KEY,
    cnic VARCHAR(15) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    father_name VARCHAR(150) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile_no VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    shift VARCHAR(10) NOT NULL,
    ACTIVE TINYINT(1) DEFAULT 1
);

INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-129', '3410000000000', 'Ahsan javed', 'M javed sadiq', 'Male', '2002-10-07', '0343-0042944', 'ahsanjaved262@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-105', '3520000000000', 'Aleeza Multazim', 'Syed Muhammad Humair', 'Female', '2023-03-17', '0308-2750049', 'numl-s22-24983@numls.edu.pk', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-63', '3520170022493', 'Maaz Shahzad', 'Anwar Shahzad', 'Male', '2003-01-28', '0317-4574744', 'maazshahzad44@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-149', '3520000000001', 'Zain Muhammad Khan', 'Raza Muhammad Khan', 'Male', '2005-07-02', '0344-4133129', 'Zainkhanay9246@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-58', '3310204543629', 'Ali Hassan', 'Tahir Mahmood', 'Male', '2002-05-04', '0304-6934786', 'hasantahir844@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-120', '3310298981709', 'Hanzla Mahmood', 'Mahmood Ahmad', 'Male', '2002-11-04', '0316-9632830', 'numl-s22-45133@numls.edu.pk', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-139', '3330235219393', 'Muhammad Ali Raza', 'Naseem Abbas', 'Male', '2002-11-25', '0302-1433738', 'aliraza51206@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-143', '3410136597119', 'Muhammad Shazam Ur Rehman', 'Naveed Ur Rehman', 'Male', '2002-05-24', '0312-7586980', 'shazamvirknuml@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-78', '3420296139270', 'Shahroz', 'Shahbaz', 'Male', '2003-03-31', '0300-4133293', 'shahrozshahbaz34202@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-88', '3450246371224', 'Maryam Aslam', 'Muhammad Aslam', 'Female', '2001-12-05', '0307-6230561', 'chmary985@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-91', '3501262224757', 'Muhammad Abdullah javaid', 'M A javaid akbar', 'Male', '2002-11-02', '0324-6537002', 'abdullahjavaid146@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-137', '3510243618841', 'Muhammad Ahsan', 'Muhammad Ajmal', 'Male', '2002-12-05', '0318-0028366', 'muhammadahsan043123@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-86', '3520108095623', 'Hafiz Muhammad Areeb Anis', 'Anis Ahmad Sheikh', 'Male', '2003-06-20', '0332-7449494', 'amazing.style1122@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-69', '3520115977571', 'M. Ibrahim', 'M. Hamid', 'Male', '2002-05-12', '0321-4876734', 'incrediblefarooqui@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-100', '3520128361643', 'Obaid-Ur-Rehman', 'Haji Iftikhar Ali', 'Male', '2002-06-21', '0331-4813217', 'Sheikhubaid163@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-66', '3520129710165', 'Muhammad Bilal', 'Muhammad Saleem', 'Male', '2003-09-29', '0313-4690578', 'bilalmughal240862@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-79', '3520142200884', 'Zofshan', 'Niyamat Ali', 'Female', '2002-12-21', '0310-9103046', 'zofshanniyamatali@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-60', '3520150413466', 'Faiza Aziz', 'Anwar Aziz', 'Female', '2002-06-05', '0325-8574367', 'falakmiraj07@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-76', '3520151430860', 'Muqadas Javaid', 'Javaid Anjum', 'Female', '2002-07-09', '0325-4996265', 'maqadasjavaid@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-61', '3520175759933', 'Faizan Mahmood', 'Mahmood Akhtar', 'Male', '2002-12-14', '0342-4307780', 'faizanmahmood086@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-99', '3520179634677', 'Muzammil Ali', 'Irfan Shabbir', 'Male', '2001-05-29', '0300-2606444', 'muzammilaliirfan1@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-82', '3520195185907', 'Ali Hassan', 'Muhammad Akram', 'Male', '2003-12-25', '0303-4084681', 'kaptanalihassan98@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-138', '3520204785727', 'Muhammad Aleem', 'Iftikhar Ahmad', 'Male', '2001-09-16', '0307-8074531', 'aleemiftikhar788@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-81', '3520208001393', 'Abdullah Iqbal', 'Muhammad Iqbal', 'Male', '2001-01-22', '0302-8188770', 'iqbalfaaa@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-95', '3520210885823', 'Muhammad Haris Ghauri', 'Faran Ahmed Ghauri', 'Male', '1998-01-02', '0333-4483605', 'harisgh124@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-110', '3520213104281', 'Haris', 'Hamayun', 'Male', '2000-11-09', '0301-4343828', 'numl-s22-13789@numls.edu.pk', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-90', '3520217847405', 'M.Saad Warsi', 'Mahmood Khurshid Warsi', 'Male', '2003-02-17', '0304-5644447', 'saadwarsi4@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-70', '3520222648507', 'M.Khubaib', 'M.Nabeel', 'Male', '2003-06-16', '0311-4011430', 'numl-s22-32014@numls.edu.pk', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-83', '3520222953632', 'Anamta', 'Naeem Riaz', 'Female', '2003-05-27', '0307-6909862', 'Anam7a.naeem@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-56', '3520225632023', 'Abu Huraira', 'Nadeem', 'Male', '2002-06-01', '0309-7220747', 'abuhurairanadeem195@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-21', '3520232981519', 'Noor Bab', 'Jahantab Sukhanwar', 'Male', '2001-09-09', '0323-4570379', 'Noorbab334@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-123', '3520245021405', 'Muhammad Nawaf Naveed', 'Naveed Iqbal', 'Male', '2023-06-19', '0334-9751966', 'nawafnaveed@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-98', '3520245527779', 'Muhammad Umar Tahir', 'Tahir Mehmood', 'Male', '2004-02-16', '0332-4213341', 'tumar1624@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-73', '3520249550635', 'Muhammad Tayyab', 'Uzman Rasheed', 'Male', '2003-01-18', '0311-1000850', 'tayyabuzman969@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-130', '3520250499416', 'Ayesha Daud', 'Muhammad Daud', 'Female', '2003-03-23', '0324-8531991', 'daudayesha84@gmail.com', 'Evening');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-57', '3520250994035', 'Ahmad Abbas', 'Ghulam Abbas', 'Male', '2001-06-11', '0309-4874729', 'ahmadabbas1037@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-62', '3520255866533', 'Haroon Abdullah', 'Muhammad abdullah', 'Male', '2001-06-17', '0318-4286336', 'Link.haroon123@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-55', '3520261130607', 'Abdullah Khaliq', 'Abdul Khaliq Chughtai', 'Male', '2000-09-13', '0313-4673688', 'abdullahchughtai954@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-64', '3520263057006', 'Maryam Nisar', 'Nisar Ahmad', 'Female', '2003-09-19', '0334-4531088', 'numl-s22-14263@numls.edu.pk', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-71', '3520263349065', 'Muhammad Labeeb Amjad', 'Rana Muhammad Amjad', 'Male', '2003-08-04', '0316-4200913', 'muhammadlabeeb712@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-92', '3520275390391', 'Muhammad Ahsan Khan', 'Muhammad Arfan Haider Khan', 'Male', '2003-09-27', '0324-5055389', 'iamahsan080@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-65', '3520284419957', 'Muhammad Azaan', 'Mehmood Ahemd', 'Male', '2002-12-02', '0318-4141099', 'azaanmahmood007@gmail,.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-89', '3520284499314', 'MEERAM IMRAN', 'KASHIF IMRAN', 'Female', '2004-01-01', '0325-4580667', 'meeram.i1124@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-2822', '3520285188679', 'Shaharmeer Basharat', 'Basharat Ali', 'Male', '2002-08-09', '0309-8283847', 'shaharmeer01@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-93', '3520294397255', 'Muhammad Ayan butt', 'Abdul Rauf Butt', 'Male', '2003-05-02', '0311-0427224', 'ayanb7140@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-75', '3520503374036', 'Muntaha Asif', 'Asif', 'Female', '2003-08-28', '0315-8007098', 'muntahaa752@gmail.com', 'Morning');
INSERT INTO students (roll_no,cnic,student_name,father_name,gender,date_of_birth,mobile_no,email,shift) VALUES ('CS-136', '3540416685447', 'Muhammad Abdullah', 'Mustafa Jamal Khan', 'Male', '2001-05-15', '0334-9951229', 'jamalabdullah1229@gmail.com', 'Evening');
INSERT INTO students (roll_no, cnic, student_name, father_name, gender, date_of_birth, mobile_no, email, shift, ACTIVE) VALUES
('CS-104', '35404-8469793-9', 'Usama Khalil', 'Muhammad Khalil', 'Male', '2001-10-23', '0315-2401961', 'usamakhalil1961@gmail.com', 'Morning', 1),
('CS-97', '35405-0520811-9', 'M Tayyab Sarfraz', 'Sarfraz Ali', 'Male', '2002-07-15', '0325-8098617', 'tayyabrehan131@gmail.com', 'Morning', 1),
('CS-145', '36601-5563116-3', 'Muhammad Usman', 'Haji Irfan Ahmad', 'Male', '2002-05-27', '0335-6817060', 'usmanxh666@gmail.com', 'Evening', 1),
('CS-67', '37104-5741809-3', 'Muhammad Hamza', 'Muhammad Azam', 'Male', '2002-03-19', '0304-5966003', 'shahg125409@gmail.com', 'Morning', 1),
('CS-68', '38201-2247241-9', 'Muhammad Huzaifa Awan', 'Arshad Mahmood Awan', 'Male', '2002-01-19', '0307-8222203', 'mhuzaifaawan7@gmail.com', 'Morning', 1),
('CS-77', '38201-4977837-1', 'Shaharyar Shah', 'Ahmad Din urf Muhammad Ameen', 'Male', '2004-04-24', '0330-2015757', 'shah20sherry@gmail.com', 'Morning', 1),
('CS-147', '42000000000000', 'Saad Naseem', 'Muhammad Naseem', 'Male', '2002-03-10', '0323-5885007', 'saaddraw137788@gmail.com', 'Evening', 1);