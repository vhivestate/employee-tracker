const { Console } = require("console");
const inquirer = require("inquirer");
const db = require("./db/connection");
const mysql = require('mysql2');
const cTable = require('console.table');
const express = require('express');



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
            // console.log(department_ids);
            //map creates new array so dep id choices
            let ids = department_ids.map(element => element.id); 
            // console.log(ids);
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
  const addEmployee = () => {
        inquirer
        .prompt([{
          type: 'input',
          name: 'first',
          message: 'Enter employee first name: '
        },
        {
           type: 'input',
           name: 'last',
           message: 'Enter employee last name: '
        },
        {
           type: 'list',
           name: 'id',
           message: 'Choose employee role id:',
           choices: [
            '1',
            '2',
            '3'
           ]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Choose employee manager id:',
            choices: [
                '1',
                '4',
                '7'
            ]
        }

       ]).then(function(data){
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
          const params = [data.first, data.last, data.id, data.manager];
          db.query(sql, params, (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Employee added!");
            initialize();
        });
        }).catch(function(err){
          console.log(err);
        })
      
     };

  //Update employee
  const updateEmployee = () => {
    //selecting names for list choices
    db.query('select first_name from employee', (err, 
        emp) => {
            // console.log(department_ids);
            //map creates new array so dep id choices
            let employee = emp.map(element => element.first_name); 
            // console.log(ids);
        inquirer
        .prompt([
        {
          type: "list",
          name: "employee",
          message: "Please select the employee whose role you'd like to update:",
          choices: employee,
        },
        {
          type: "list",
          name: "role",
          message: "Please select the employee's new role:",
          choices: [
            '1',
            '2',
            '3'
           ]
        },
       ]).then(function(data){
    const sql = `UPDATE employee SET role_id WHERE id = ? VALUES (?, ?)`;
          const params = [data.employee, data.role];
          db.query(sql, params, (err, result) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("Employee role updated!");
            initialize();
        });
        }).catch(function(err){
          console.log(err);
        })
      })
     };

//   const updateEmployeeRole = (employeeObject) => {
//     const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
//     const params = [employeeObject.role, employeeObject.employee];
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("Employee role has been updated.");
//       initialize();
//     });
//   };

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