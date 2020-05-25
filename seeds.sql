USE employee_db;

INSERT INTO departments (name)
VALUE ("Engineering");

INSERT INTO departments (name)
VALUE ("Sales");

INSERT INTO departments (name)
VALUE ("Finance");

INSERT INTO departments (name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE("Sales Lead", 100000, 2);

INSERT INTO role (title, salary, department_id)
VALUE("Salesperson", 80000, 2);

INSERT INTO role (title, salary, department_id)
VALUE("Lead Engineer", 150000, 1);

INSERT INTO role (title, salary, department_id)
VALUE("Software Engineer", 120000, 1);

INSERT INTO role (title, salary, department_id)
VALUE("Account Manager", 65000, 2);

INSERT INTO role (title, salary, department_id)
VALUE("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUE("Legal Team Lead", 250000, 4);

INSERT INTO role (title, salary, department_id)
VALUE("Lawyer", 190000, 4);

INSERT INTO employees(first_name, last_name, role_id)
VALUE ("Tom", "Black", 3);

INSERT INTO employees(first_name, last_name, role_id)
VALUE ("Ashley", "Rodriguez", 3);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Mike", "Chan", 2, 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Kevin", "Tupik", 4, 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Malia", "Brown", 6, null);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Sarah", "Lourd", 7, null);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Tom", "Allen", 8, 7);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Christian", "Eckenrode", 3, 2);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUE ("Alli", "White", 5, 4);













