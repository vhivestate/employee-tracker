const { Console } = require("console");
const inquirer = require("inquirer");
const db = require("./db/connection");
const mysql = require('mysql2');
const cTable = require('console.table');


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
// const viewDepartment = () => {
//     const sql = `SELECT * FROM departments`;
//     db.query(sql, (err, rows) => {
//       if (err) {
//         console.error(err);
//       }
//       console.table(rows);
//       initialize();
//     });
//   };

//view roles
const viewRole = () => {
    console.log(viewRole);
    const sql = `SELECT r.id ID, r.title Title, departments.name departments, r.salary Salary
                 FROM role r
                 LEFT JOIN departments ON r.departments_id = departments.id`;

    db.promise().query(sql)
        .then(([rows]) => {
            getRole(rows);
            console.table(rows);
        });
};

const getRole = (data) => { 
    let role = [];
    // Show only title of role
    data.forEach(element => {
        role.push(element.Title);
        
    });
    console.log(role);
    // console.log("The data is",data);
};