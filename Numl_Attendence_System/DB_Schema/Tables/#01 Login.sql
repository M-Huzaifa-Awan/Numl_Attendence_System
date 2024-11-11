CREATE DATABASE `Attendence_System`;

USE `Attendence_System`;

CREATE TABLE Teachers_Login (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CNIC VARCHAR(13) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL
);

CREATE TABLE Students_Login  (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    CNIC VARCHAR(13) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL
);