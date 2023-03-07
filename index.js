const inquirer = require("inquirer");
const mysql = require("mysql2");

//SELECT * FROM departmenet

const menuQuestion = {
  type: "list",
  name: "todo",
  choices: [
    "add Employee",
    "add Department ",
    "add Role",
    "view Employees",
    "view Departments",
    "view Roles",
  ],
  message: "What would you like to do next ?",
};

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "company_db",
  },
  console.log(`Connected to the company database.`)
);

// db.query("SELECT * FROM department;", (err, data) => console.table(data));

function promptMenu() {
  inquirer.prompt(menuQuestion).then((answer) => {
    if (answer.todo === "view Departments") {
      showDepartments();
    }
    if (answer.todo === "view Employees") {
      showEmployees();
    }
    if (answer.todo === "view Roles") {
      showRoles();
    }
  });
}

function showDepartments() {
  db.query("SELECT * FROM departments;", (err, data) => {
    console.table(data);
    promptMenu();
  });
}

function showEmployees() {
  db.query("SELECT * FROM employees;", (err, data) => {
    console.table(data);
    promptMenu();
  });
}

function showRoles() {
  db.query("SELECT * FROM roles;", (err, data) => {
    console.table(data);
    promptMenu();
  });
}
promptMenu();
