const express = require("express");
const app = express();
const PORT = process.env.PORT || 3050;
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
// const connectToDB = require("./connectToDB.js");
var figlet = require('figlet');
let cont = true;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

const getEmployees = () => {
    connection.query("SELECT * FROM employee_db.employees", function (err, res) {
      let employees = []
      if (err) throw err;
      for (let employee of res) { 
          employees.push(employee);
          // console.log(employee.first_name, employee.last_name);
      }
      return employees;
    })
}

const getEmployeesString = () => {
    connection.query("SELECT * FROM employee_db.employees", function (err, res) {
      let employees = []
      if (err) throw err;
      for (let employee of res) {
          let employeeName = `${employee.first_name} ${employee.last_name}`; 
          employees.push(employeeName);
          // console.log(employee.first_name, employee.last_name);
      }
      return employees;
    })
}

let databaseEmployees = getEmployees(); 
let employeesStringArray = getEmployeesString();

let initialQuestions = {
    type: "list",
    message: "What would you like to do?",
    name: "questions",
    choices: [
        "View all employees",
        "View all employees by department",
        "View all employess by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        "Quit"
    ]
}

let addEmployeeQuestions = [
    {
        type: "input",
        message: "What's this employee's first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What's this employee's last name?",
        name: "lastName"
    },
    {
        type: "list",
        message: "What's this employee's role?",
        name: "role",
        choices: [
            "Accountant",
            "Account Manager",
            "Lawyer",
            "Legal Team Lead",
            "Lead Engineer",
            "Software Engineer",
            "Sales Lead",
            "Sales Person"
        ]
    },
    {
        type: "input",
        message: "Who is this employee's manager?",
        name: "manager"
    },

]

let removeEmployeeQuestions = [
    {
        type: "list",
        message:"Who would you like to remove?",
        name: "removeEmployee",
        choices: getEmployeesString()
    }
]

const viewAllEmployess = () => {
    connection.query("SELECT * FROM employee_db.employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const viewEmployeesByDepartment = () => {
    connection.query("SELECT * FROM employee_db.department", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const viewEmployeesByManager = () => {
    connection.query("SELECT * FROM employee_db.employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const addEmployee = (data) => {
    connection.query(`INSERT INTO employees SET ? ${data.firstName}, ${data.lastName}, ${data.role}, ${data.manager}`
    , function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const removeEmployee = (data) => {
    const sqlQuery = "DELETE FROM employees WHERE ?";
    const params = [{ first_name: data.firstName}, { last_name: data.lastName }];
    connection.query(sqlQuery, params, function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const updateEmployeeRole = () => {
    connection.query("SELECT * FROM employee_db.employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const updateEmployeeManager = () => {
    connection.query("SELECT * FROM employee_db.employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}

const viewAllRoles = () => {
    connection.query("SELECT role.title FROM role;", function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end();
})}


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

const main = async () => {
    figlet('Employee Manager', async function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
        // inquirer.prompt(questions).then((data) => {
        //     console.log(data.questions);
        // })

        connection.connect(function (err) {
            if (err) throw err;
            console.log("connected as id " + connection.threadId);
        });

        const inquirerData = await inquirer.prompt(initialQuestions);
        while(cont) {
            switch (inquirerData.questions) {
                case "View all employees":
                    viewAllEmployess();
                    break;
                case "View all employees by department":
                    viewEmployeesByDepartment();
                    break;
                case "View all employess by manager":
                    viewEmployeesByManager();
                    break;
                case "Add employee":
                    const addEmployeeData = await inquirer.prompt(addEmployeeQuestions);
                    addEmployee(addEmployeeData);
                    break;
                case "Remove employee":
                    const removeEmployeeData = await inquirer.prompt(removeEmployeeQuestions);
                    removeEmployee(removeEmployeeData);
                    break;
                case "Update employee role":
                    updateEmployeeRole();
                    break;
                case "Update employee manager":
                    updateEmployeeManager();
                    break;
                case "View all roles":
                    viewAllRoles();
                    break;
                default:
                    cont = false;
                    connection.end();
                    process.exit(0);
                    break;     
            }
        }
        
    });
}
main();

//1. Finish inquirer questions and question types
//2. Create a Schema file
//3. Create a seed file
//4. Create a switch case 
//5. add employee
//6. update employee
//7. Why is that figlet stuff not working correctly?
// 1 left join and 2 inner joins


//How do I get it to stop asking questions?
//How do I get all queries correct?
//How do I get the roles to match up with the IDs, title, managers and salaries because they pull from different tables, when adding a new employee?