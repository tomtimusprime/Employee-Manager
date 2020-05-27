const express = require("express");
const app = express();
const PORT = process.env.PORT || 3050;
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
const controller = require("./utils/controller");
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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});


figlet('Employee Manager', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
    mainMenu()
    // .then(processSelection)
    // .then((data) => {
    //     console.log(data);
    //     mainMenu();
    // })

})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


function mainMenu() {
    return inquirer.prompt(
        {
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
                "View total utilized salary budget",
                "Quit"
            ]
        }
    )
    .then(processSelection);
}

async function processSelection(data) {
    switch (data.questions) {
        case "View all employees":
            await controller.viewAllEmployees();
            break;
        case "View all employees by department":
            await controller.viewEmployeesByDepartment();
            break;
        case "View all employess by manager":
            await controller.viewEmployeesByManager();
            break;
        case "Add employee":
            await controller.addEmployee();
            break;
        case "Remove employee":
            await controller.removeEmployee();
            break;
        case "Update employee role":
            await controller.updateEmployeeRole();
            break;
        case "Update employee manager":
            await controller.updateEmployeeManager();
            break;
        case "View all roles":
            await controller.viewRoles();
            break;
        case "View total utilized salary budget":
            await controller.sumSalaries();
            break;
        case "Quit":
            cont = false;
            controller.quit();
            break;

    };
    mainMenu();
}
// .then((employeeData) => {
//     // addEmployee(employeeData);
// })

// "Accountant",
//                 "Account Manager",
//                 "Lawyer",
//                 "Legal Team Lead",
//                 "Lead Engineer",
//                 "Software Engineer",
//                 "Sales Lead",
//                 "Sales Person"  