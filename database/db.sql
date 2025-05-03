-- to create a new database
CREATE DATABASE maquilaSistemaMysql;

-- to use database
USE maquilaSistemaMysql;

-- creating a new table
------------------------------
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
-------------------------------
CREATE TABLE factura (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(100),
  amount INT(6) NOT NULL,
  tax VARCHAR(50) NOT NULL,
  payment method varchar(50) NOT NULL
);
-- to show all tables

CREATE TABLE empleados (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    numero_telefono VARCHAR(15),  
    cuenta_banco BIGINT,          
    correo VARCHAR(225) NOT NULL,
    direccion VARCHAR(225) NOT NULL,
    salario DECIMAL(10,2),
    fecha_contratacion DATE
);

-----------------------

CREATE TABLE usuarios (
  id  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(100) NOT NULL,
  pasword varchar(100) NOT NULL
);
--------
SHOW TABLES;

-- to describe table
DESCRIBE customer;
