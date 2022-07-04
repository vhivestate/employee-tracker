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

// GET all employees
app.get('/api/employee', (req, res) => {
    const sql = `SELECT * FROM employee`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  // Get a single employee
app.get('/api/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  

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

//   const getDepartmentsTable = () => {

//     return db.promise().query(wholeTable)
//         .then(([rows]) => {
//             return rows;
//         });
    
// };

// const displayDepartmentsTable = () => {
//     getDepartmentsTable().then(data => {
//         console.log('\n');
//         console.table(data);
//         console.log('\n');
//     });
// };

// const viewDepartment = async () => {
//     const departmentName = `SELECT name FROM departments
//                             ORDER BY name`;
//     try {
//         const departments = await db.promise().query(departmentName)
//         return departments[0].map(item => item.name);
//     } catch (err) {
//         console.log(err);
//     }
// };

// const getRole = (data) => { 
//     let role = [];
//     // Show only title of role
//     data.forEach(element => {
//         role.push(element.title);
        
//     });
//     console.log(role);
    // console.log("The data is",data);
// };

//view roles
// const viewRole = () => {
//     console.log(viewRole);
//     const sql = `SELECT role.id ID, role.title Title, departments.name departments, role.salary Salary
//                  FROM role
//                  LEFT JOIN departments ON role.departments_id = departments.id`;

//     db.promise().query(sql)
//         .then(([rows]) => {
//             getRole(rows);
//             console.table(rows);
//         });
// };

