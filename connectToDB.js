const mysql = require("mysql2");
const express = require("express");

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

module.exports = connectToDB;