const { Console } = require("console");
const inquirer = require("inquirer");
const db = require("./db/connection");
const express = require('express');


initialize = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                "View All Roles",
                "Add Role",
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Departments",
                "Add Department",
                "Quit"
            ]
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