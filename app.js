const express = require("express");
const app = express();
const PORT = process.env.PORT || 3050;
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require('console.table');
var figlet = require('figlet');

let questions = {
    type: "list",
    message: "What would you like to do?",
    name: "questions",
    choices: [
        "View all employees.",
        "View all employees by department",
        "View all employess by manager",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles"
    ]
}

const connectToDB = async () => {
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "employee_db"
      });
    
      connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        afterConnection();
      });
    
      function afterConnection() {
        connection.query("SELECT * FROM employee_db.employees", function(err, res) {
          if (err) throw err;
          console.table(res);
          connection.end();
        });
      }
}


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});



const main = async () => {
    connectToDB();
    figlet('Employee Manager', async function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
        // inquirer.prompt(questions).then((data) => {
        //     console.log(data.questions);
        // })
        const inquirerData = await inquirer.prompt(questions);
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
 