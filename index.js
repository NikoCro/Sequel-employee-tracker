const inquirer = require("inquirer");
const mysql = require("mysql2");

//SELECT * FROM departmenet

const menuQuestion = {
  type: "list",
  name: "todo",
  choices: [
    "add Employee",
    "add Department",
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

    if (answer.todo === "add Department") {
      addDepartment();
    }
    if (answer.todo === "add Employee") {
      addEmployee();
    }
    if (answer.todo === "add Role") {
      addRole();
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

function addDepartment() {
  const questions = {
    type: "input",
    name: "department",
    message: "What department do you want to add ?",
  };
  inquirer.prompt(questions).then((answer) => {
    db.query(
      `INSERT INTO departments (department_name)
  VALUES (?)`,
      answer.department,
      (err, data) => {
        console.log("Successfully added a deparment!");
        if (err) {
          console.error(err);
        }
        promptMenu();
      }
    );
  });
}

function addEmployee() {
  const questions = inquirer.prompt(questions).then((answer) => {});
}

function addRole() {
  const questions = [
    {
      type: "input",
      name: "title",
      message: "What role do you want to add ?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the annual salary for this position ?",
    },
    {
      type: "input",
      name: "department",
      message: "What department does the role belong to?",
    },
  ];

  inquirer.prompt(questions).then((answer) => {
    db.query(
      `INSERT INTO roles
VALUES (?)`,
      [answer.title, answer.salary, answer.department],
      (err, data) => {
        console.log("Successfully added a role!");
        if (err) {
          console.error(err);
        }
        promptMenu();
      }
    );
  });
}

promptMenu();
