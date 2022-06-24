const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'P8RX77z7',
        database: 'employee_db'
    });


function userInput() {
    inquirer.prompt([{
        type: "list",
        name: "role",
        message: "What would you like to do?",
        choices: [
            "View All Roles",
            "Add Role",
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Departments",
            "Add Department"
        ],
    }])
    console.log(userInput);
}

userInput();