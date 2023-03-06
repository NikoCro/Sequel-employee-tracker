const inquirer = require("inquirer");
const mysql = require("mysql2");

//SELECT * FROM departmenet

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
  inquirer.prompt({
    type: "list",
    name: "todo",
    choices: [
      "add Employee",
      "add Department ",
      "add Role",
      "view Employee",
      "view Department",
      "view Role",
    ],
    message: "What would you like to do next ?",
  });
}

function showDepatments() {}

promptMenu();
