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

//  view all departments
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
        type: 'input',
        name: 'name',
        message: 'Enter the name of new department: '
      }).then(function(data){
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [data.name];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Department added!");
          initialize();
      });
      }).catch(function(err){
        console.log(err);
      })

  };

  //Add role
  const addRole = () => {
    //selecting dep ids for list choices
    db.query('select id from departments', (err, 
        department_ids) => {
            console.log(department_ids);
            //map creates new array so dep id choices
            let ids = department_ids.map(element => element.id); 
            console.log(ids);
        inquirer
        .prompt([{
          type: 'input',
          name: 'title',
          message: 'Enter employee title '
        },
        {
           type: 'number',
           name: 'salary',
           message: 'Enter the salary: '
        },
        {
           type: 'list',
           name: 'id',
           choices: ids,
           
        }
       ]).then(function(data){
          const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
          const params = [data.title, data.salary, data.id];
          db.query(sql, params, (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Department added!");
            initialize();
        });
        }).catch(function(err){
          console.log(err);
        })
    })

   
     };
  //Add employee

  //Update employee

// quit
  const quit = () => {
    console.log("Goodbye!");
    process.exit();
  };

  //Main menu
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
                case 'Add a department':
                    addDepartments();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
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