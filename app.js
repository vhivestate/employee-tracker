const { Console } = require("console");
const inquirer = require("inquirer");
const db = require("./db/connection");
const mysql = require('mysql2');


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
                    viewDepartment();
                    break;
                case 'View Roles':
                    viewRole();
                    break;
                case 'View Employees':
                    viewEmp();
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
                    updateEmp();
                    break;
                case 'Quit':
                    break;
            }
            console.log(data.choices + ' chosen');
        })
};
initialize();

// View department
const viewDepartment = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      }
      console.table(rows);
      initialize();
    });
  };

//view roles
const viewRole = () => {
    db.query(
        `SELECT role.id, role.title, role.salary, departments.name
            FROM role
            LEFT JOIN departments
            ON role.departments_id = departments.id `,
        function (err, results, fields) {
            if (err) {
                console.log(err.message);
                return;
            }

            console.table(results);
            initialize();
        }
    );
};
