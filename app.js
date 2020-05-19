const express = require("express");
const app = express();
const PORT = process.env.PORT || 3050;
const mysql = require("mysql2");
const inquirer = require("inquirer");
var figlet = require('figlet');

// let questions = {
//     type: "input",
//     message: "",
//     name: ""
// }

const main = async () => {
    figlet('Employee Manager', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

    // const data = await inquirer.prompt(questions);
}
main();


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 