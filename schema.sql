CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (100),
    last_name VARCHAR (100),
    role_id INT,
    department VARCHAR (100),
    salary INT,
    manager_id INT,
    primary key (id)
);

CREATE TABLE department (
    name VARCHAR(30)
);

CREATE TABLE role (
    title VARCHAR(30),
    salary DECIMAL (7, 4),
    department_id INT
)

