-- to create a new database
CREATE DATABASE maquilaSistemaMysql;

-- to use database
USE maquilaSistemaMysql;

-- creating a new table
CREATE TABLE customer (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  idProduct VARCHAR(50) NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100),
  category VARCHAR(100) NOT NULL,
  unitof VARCHAR(50) NOT NULL,
  supplier VARCHAR(100) NOT NULL,
  barcode VARCHAR(50)
);

-- to show all tables
SHOW TABLES;

-- to describe table
DESCRIBE customer;
