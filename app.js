require("dotenv").config();
const { Console } = require("console");
const inquirer = require("inquirer");
const db = require("./db/connection");

initialize = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Employee', 'Add Role', 'Update Employee Role', 'Quit']
        }).then((data) => {
            switch (data.choices) {
                case 'View Departments':
                    viewDep();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewAllEmp();
                    break;
                case 'Add Department':
                    addDep();
                    break;
                case 'Add Employee':
                    addEmp();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Update Employee Role':
                    upEmp();
                    break;
                case 'Quit':
                    break;
            }
            console.log(data.choices + ' chosen!!!');
        })
};
initialize();