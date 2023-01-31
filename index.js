const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

console.log("hello world");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

/* const e = new Manager("Foo", 1, "test@test.com", 100);

const array = [];

array.push(e);

const result = render(array);
fs.mkdirSync(OUTPUT_DIR);
fs.writeFileSync(outputPath, result); */

const next_step_question = [
  {
    type: "list",
    name: "next_step",
    message: "Would you like to add more team members?",
    choices: ["Add an engineer", "Add an intern", "Finish building the team"],
  },
];

const questions_manager = [
  {
    type: "input",
    name: "manager_name",
    message: "What is the team manager's name?",
  },
  {
    type: "input",
    name: "manager_id",
    message: "What is the team manager's id?",
  },
  {
    type: "input",
    name: "manager_email",
    message: "What is the team manager's email?",
  },
  {
    type: "input",
    name: "manager_office_number",
    message: "What is the team manager's office number?",
  },
];

const questions_engineer = [
  {
    type: "input",
    name: "engineer_name",
    message: "What is the engineer's name?",
  },
  {
    type: "input",
    name: "engineer_id",
    message: "What is the engineer's id?",
  },
  {
    type: "input",
    name: "engineer_email",
    message: "What is the engineer's email?",
  },
  {
    type: "input",
    name: "engineer_github_username",
    message: "What is the engineer's GitHub username?",
  },
];

const questions_intern = [
  {
    type: "input",
    name: "inter_name",
    message: "What is the intern's name?",
  },
  {
    type: "input",
    name: "intern_id",
    message: "What is the intern's id?",
  },
  {
    type: "input",
    name: "intern_email",
    message: "What is the intern's email?",
  },
  {
    type: "input",
    name: "intern_school",
    message: "What is the intern's school?",
  },
];

const team = [];
function writeTeam() {
  const result = render(team);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(outputPath, result);
}

// TODO write a function like init, that asks next step questions -
// TODO write a function that asks engineer questions
// TODO write a function that asks intern questions - each question should ask the next step question finally

function init() {
  inquirer
    .prompt(questions_manager)
    .then((answers) => {
      console.log(answers);
      const manager = new Manager(
        answers.manager_name,
        answers.manager_id,
        answers.manager_email,
        manager_office_number
      );
      team.push(manager);
      writeTeam();
      // call next step questions here instead of write team
    })
    .catch((error) => {
      console.error(error);
    });
}

init();
