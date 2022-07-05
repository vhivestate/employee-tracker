const { Console } = require("console");
const inquirer = require("inquirer");
const db = require("./db/connection");
const mysql = require('mysql2');
const cTable = require('console.table');
const express = require('express');

// SQL role query
const wholeTable =`SELECT * FROM department`;
const departmentName = `SELECT name FROM department`;
const PORT = process.env.PORT || 3001;

const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

let departments = [];
let roles = [];
let employees = [];

//  view all departments
// app.get('/api/departments', (req, res) => {
//     const sql = `SELECT * FROM departments`;
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });
const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      }
      console.table(rows);
      initialize();
    });
  };
  

//  view all roles
// app.get('/api/role', (req, res) => {
//     const sql = `SELECT * FROM role`;
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });
const viewRoles = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      }
      console.table(rows);
      initialize();
    });
  };

// view all employees
// app.get('/api/employee', (req, res) => {
//     const sql = `SELECT * FROM employee`;
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });
const viewEmployees = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
      if (err) {
        console.error(err);
      }
      console.table(rows);
      initialize();
    });
  };


  //Add department
const addDepartments = () => {
 inquirer
      .prompt({
        type: 'text',
        name: 'name',
        message: 'Enter the name of new department: '
      })
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [departments, name];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Department added!");
          initialize();
      });
  };

  //Add role

  //Add employee

  //Update employee

// quit
  const quit = () => {
    console.log("Goodbye!");
    process.exit();
  };

  initialize = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Quit",
            ]
        }).then((data) => {
            switch (data.choices) {
                case 'View Departments':
                    viewDepartments();
                    break;
                case 'View Roles':
                    viewRoles();
                    break;
                case 'View Employees':
                    viewEmployees();
                    break;
                case 'Add Department':
                    addDepartments();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'Quit':
                    quit();
                    break;
            }
            console.log(data.choices + ' chosen');
        })
};
initialize();