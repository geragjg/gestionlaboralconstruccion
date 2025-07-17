/*
	Create CaveMen database

	Modification History:
		2014/12/09 GJG - Created

*/

-- Drop existing database if it already exists

SELECT CONCAT( NOW(), ' - Dropping existing database...') AS '';

DROP DATABASE IF EXISTS `mijornalera_base`;

SELECT CONCAT( NOW(), ' - Finished dropping existing database.') AS '';

-- Create Database

SELECT CONCAT( NOW(), ' - Creating Database...') AS '';

CREATE DATABASE `mijornalera_base` DEFAULT CHARACTER SET utf8 ;


SELECT CONCAT( NOW(), ' - Finished creating database.') AS '';

SET SQL_SAFE_UPDATES = 0;