const inquirer = require("inquirer");
const mysql = require("mysql2");

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
    "update Employee",
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
      //   addRole();
      addRole();
    }
    if (answer.todo === "update Employee") {
      updateEmployee();
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

function showAll() {
  db.query(
    "SELECT employees.*, roles.title, roles.salary, departments.department_name FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;",
    (err, data) => {
      if (err) console.log(err);
      console.table(data);
      promptMenu();
    }
  );
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
      `INSERT INTO departments(department_name) VALUES (?)`,
      answer.department,
      (err, data) => {
        console.log("Successfully added a department!");
        if (err) {
          console.error(err);
        }
        promptMenu();
      }
    );
  });
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
      `INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)`,
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

function addEmployee() {
  const questions = [
    {
      type: "input",
      name: "first name",
      message: "What's the first name of new employee ?",
    },
    {
      type: "input",
      name: "last name",
      message: "What is the last name of new employee ?",
    },
    {
      type: "input",
      name: "role",
      message: "What role is new employee assigned to?",
    },
    {
      type: "input",
      name: "manager",
      message: "What manager is new employee assigned to?",
    },
  ];
  inquirer.prompt(questions).then((answer) => {
    db.query(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES (?, ?, ?, ?, ?)`,
      [
        answer["first name"],
        answer["last name"],
        answer.role,
        answer.manager,
        answer.department,
      ],
      (err, data) => {
        console.log("Successfully added a new employee!");
        if (err) {
          console.error(err);
        }
        promptMenu();
      }
    );
  });
}

function updateEmployee() {
  const questions = [
    {
      type: "input",
      name: "whichemployee",
      message: "Which employee would you like to select?",
    },
    {
      type: "input",
      name: "newrole",
      message: "What new role would you like to assign to this employee  ?",
    },
  ];
  inquirer.prompt(questions).then((answer) => {
    db.query(
      `UPDATE employees SET role_id = ? WHERE id = ?`,
      [answer.newrole, answer.whichemployee],
      (err, data) => {
        console.log("Successfully updated Employee!");
        if (err) {
          console.error(err);
        }
        promptMenu();
      }
    );
  });
}
